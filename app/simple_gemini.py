# app/simple_gemini.py
import json
import uuid
from datetime import datetime, timedelta
from typing import List, Dict, Optional

class SimpleGeminiClient:
    """Simple client that simulates Gemini without API calls"""
    
    def __init__(self):
        print("✅ Using Simple Gemini Client (No API calls needed)")
    
    async def process_user_query(self, user_text: str, user_id: str) -> List[Dict]:
        print(f"🤖 Processing: {user_text}")
        
        # Simple rule-based card generation
        cards = []
        
        if any(word in user_text.lower() for word in ['meeting', 'schedule', 'appointment']):
            cards.append({
                "card_id": str(uuid.uuid4()),
                "type": "schedule",
                "title": "Schedule Meeting",
                "description": f"Schedule a meeting: {user_text}",
                "primary_action": {
                    "event_title": "Team Meeting",
                    "start_time": (datetime.utcnow() + timedelta(hours=1)).isoformat(),
                    "end_time": (datetime.utcnow() + timedelta(hours=2)).isoformat(),
                    "duration_minutes": 60,
                    "location": "Office",
                    "participants": ["team"],
                    "notes": user_text
                },
                "alternatives": [
                    {
                        "start_time": (datetime.utcnow() + timedelta(hours=3)).isoformat(),
                        "end_time": (datetime.utcnow() + timedelta(hours=4)).isoformat(),
                        "reason": "Later time available"
                    }
                ],
                "confidence": 0.9,
                "metadata": {
                    "urgency": "medium",
                    "flexibility": "flexible",
                    "priority": "medium"
                },
                "created_at": datetime.utcnow().isoformat(),
                "status": "pending",
                "user_id": user_id
            })
        
        if any(word in user_text.lower() for word in ['remind', 'reminder']):
            cards.append({
                "card_id": str(uuid.uuid4()),
                "type": "reminder",
                "title": "Set Reminder",
                "description": f"Set reminder: {user_text}",
                "primary_action": {
                    "event_title": "Reminder",
                    "start_time": (datetime.utcnow() + timedelta(hours=1)).isoformat(),
                    "end_time": (datetime.utcnow() + timedelta(hours=1)).isoformat(),
                    "duration_minutes": 0,
                    "notes": user_text
                },
                "alternatives": [],
                "confidence": 0.8,
                "metadata": {
                    "urgency": "low",
                    "flexibility": "flexible",
                    "priority": "low"
                },
                "created_at": datetime.utcnow().isoformat(),
                "status": "pending",
                "user_id": user_id
            })
        
        if not cards:
            # Default card
            cards.append({
                "card_id": str(uuid.uuid4()),
                "type": "task",
                "title": "Create Task",
                "description": f"Create task: {user_text}",
                "primary_action": {
                    "event_title": "New Task",
                    "start_time": (datetime.utcnow() + timedelta(hours=1)).isoformat(),
                    "end_time": (datetime.utcnow() + timedelta(hours=1)).isoformat(),
                    "duration_minutes": 30,
                    "notes": user_text
                },
                "alternatives": [],
                "confidence": 0.7,
                "metadata": {
                    "urgency": "medium",
                    "flexibility": "flexible",
                    "priority": "medium"
                },
                "created_at": datetime.utcnow().isoformat(),
                "status": "pending",
                "user_id": user_id
            })
        
        print(f"✅ Generated {len(cards)} test cards")
        return cards
    
    async def process_card_action(self, card_id: str, action: str, modifications: Optional[Dict] = None) -> Dict:
        return {
            "message": f"Action '{action}' completed successfully",
            "next_steps": ["Calendar updated", "Notifications sent"],
            "calendar_update": {"status": action, "action": action},
            "notifications": ["Schedule updated"],
            "follow_up_required": False
        }
    
    async def health_check(self) -> str:
        return "healthy (test mode)"