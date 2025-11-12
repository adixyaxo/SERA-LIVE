# app/database.py
import aiosqlite
import json
import os
from typing import List, Dict, Any
from datetime import datetime

class DatabaseManager:
    def __init__(self):
        self.db_path = "sera.db"
    
    async def init_db(self):
        """Initialize SQLite database with tables"""
        async with aiosqlite.connect(self.db_path) as db:
            # Enable foreign keys and WAL mode for better performance
            await db.execute("PRAGMA foreign_keys = ON")
            await db.execute("PRAGMA journal_mode = WAL")
            
            # Create cards table
            await db.execute('''
                CREATE TABLE IF NOT EXISTS cards (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    card_id TEXT UNIQUE NOT NULL,
                    type TEXT NOT NULL,
                    title TEXT NOT NULL,
                    description TEXT,
                    primary_action TEXT,
                    alternatives TEXT,
                    status TEXT DEFAULT 'pending',
                    user_id TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            # Create user_sessions table
            await db.execute('''
                CREATE TABLE IF NOT EXISTS user_sessions (
                    session_id TEXT PRIMARY KEY,
                    user_id TEXT NOT NULL,
                    cards TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            # Create user_preferences table
            await db.execute('''
                CREATE TABLE IF NOT EXISTS user_preferences (
                    user_id TEXT PRIMARY KEY,
                    preferences TEXT,
                    gemini_context TEXT,
                    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            await db.commit()
            print("✅ SQLite database initialized")
    
    async def store_card(self, card_data: Dict[str, Any]) -> bool:
        """Store card in SQLite database"""
        try:
            async with aiosqlite.connect(self.db_path) as db:
                await db.execute('''
                    INSERT OR REPLACE INTO cards 
                    (card_id, type, title, description, primary_action, alternatives, status, user_id)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    card_data['card_id'],
                    card_data['type'],
                    card_data['title'],
                    card_data.get('description', ''),
                    json.dumps(card_data.get('primary_action', {})),
                    json.dumps(card_data.get('alternatives', [])),
                    card_data.get('status', 'pending'),
                    card_data.get('user_id', 'default_user')
                ))
                await db.commit()
                return True
        except Exception as e:
            print(f"❌ Error storing card: {e}")
            return False
    
    async def get_user_cards(self, user_id: str) -> List[Dict]:
        """Get all cards for a user"""
        try:
            async with aiosqlite.connect(self.db_path) as db:
                db.row_factory = aiosqlite.Row
                async with db.execute('''
                    SELECT card_id, type, title, description, primary_action, alternatives, status, created_at
                    FROM cards 
                    WHERE user_id = ? 
                    ORDER BY created_at DESC
                ''', (user_id,)) as cursor:
                    
                    rows = await cursor.fetchall()
                    cards = []
                    for row in rows:
                        card = dict(row)
                        # Parse JSON fields
                        card['primary_action'] = json.loads(card['primary_action']) if card['primary_action'] else {}
                        card['alternatives'] = json.loads(card['alternatives']) if card['alternatives'] else []
                        cards.append(card)
                    
                    return cards
        except Exception as e:
            print(f"❌ Error getting user cards: {e}")
            return []
    
    async def store_session(self, session_id: str, user_id: str, cards: List[Dict]):
        """Store user session"""
        try:
            async with aiosqlite.connect(self.db_path) as db:
                await db.execute('''
                    INSERT OR REPLACE INTO user_sessions 
                    (session_id, user_id, cards)
                    VALUES (?, ?, ?)
                ''', (
                    session_id,
                    user_id,
                    json.dumps(cards)
                ))
                await db.commit()
        except Exception as e:
            print(f"❌ Error storing session: {e}")
    
    async def update_card_status(self, card_id: str, status: str):
        """Update card status"""
        try:
            async with aiosqlite.connect(self.db_path) as db:
                await db.execute('''
                    UPDATE cards SET status = ? WHERE card_id = ?
                ''', (status, card_id))
                await db.commit()
                return True
        except Exception as e:
            print(f"❌ Error updating card status: {e}")
            return False