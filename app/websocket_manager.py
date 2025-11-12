from fastapi import WebSocket
from typing import Dict, List
import json

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}
        self.user_connections: Dict[str, List[str]] = {}

    async def connect(self, websocket: WebSocket, user_id: str):
        await websocket.accept()
        connection_id = id(websocket)
        self.active_connections[connection_id] = websocket
        
        if user_id not in self.user_connections:
            self.user_connections[user_id] = []
        self.user_connections[user_id].append(connection_id)

    def disconnect(self, user_id: str):
        if user_id in self.user_connections:
            for connection_id in self.user_connections[user_id]:
                self.active_connections.pop(connection_id, None)
            del self.user_connections[user_id]

    async def send_personal_message(self, message: dict, user_id: str):
        if user_id in self.user_connections:
            for connection_id in self.user_connections[user_id]:
                websocket = self.active_connections.get(connection_id)
                if websocket:
                    try:
                        await websocket.send_text(json.dumps(message))
                    except Exception:
                        # Remove dead connection
                        self.user_connections[user_id].remove(connection_id)
                        self.active_connections.pop(connection_id, None)

    async def broadcast(self, message: dict):
        disconnected = []
        for connection_id, websocket in self.active_connections.items():
            try:
                await websocket.send_text(json.dumps(message))
            except Exception:
                disconnected.append(connection_id)
        
        # Clean up disconnected
        for connection_id in disconnected:
            self.active_connections.pop(connection_id, None)
            # Remove from user_connections
            for user_id, connections in self.user_connections.items():
                if connection_id in connections:
                    connections.remove(connection_id)