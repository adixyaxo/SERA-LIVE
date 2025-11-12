# app/gemini_client.py
import os
import json
import uuid
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv("C:/Users/adity/Desktop/SERA-main/SERA-main/.env")

class GeminiClient:
    def __init__(self):
        # Configure the Gemini API
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY environment variable is required")
        
        print(f"🔑 Initializing Gemini client with API key: {api_key[:10]}...")
        
        # Configure the API - THIS IS THE CORRECT WAY
        genai.configure(api_key=api_key)
        
        # Model configuration
        self.model_name = "gemini-1.5-flash"
        self.generation_config = {
            "temperature": 0.7,
            "top_p": 0.8,
            "top_k": 40,
            "max_output_tokens": 1024,
        }
        
        self.safety_settings = [
            {
                "category": "HARM_CATEGORY_HARASSMENT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_HATE_SPEECH", 
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
        ]
        
        # Initialize the model - CORRECT WAY
        self.model = genai.GenerativeModel(
            model_name=self.model_name,
            generation_config=self.generation_config,
            safety_settings=self.safety_settings
        )
        
        # User context storage
        self.user_profiles: Dict[str, Dict] = {}
        print("✅ Gemini client initialized successfully")
    
    async def process_user_query(self, user_text: str, user_id: str) -> List[Dict]:
        """Process user query and generate suggestion cards using Gemini"""
        try:
            print(f"🤖 Processing user query: {user_text}")
            
            prompt = f"""
            Create scheduling cards for this request: "{user_text}"
            
            Return JSON format:
            {{
                "cards": [
                    {{
                        "card_id": "unique_id",
                        "type": "schedule",
                        "title": "Meeting Title", 
                        "description": "Description here",
                        "primary_action": {{
                            "event_title": "Meeting Name",
                            "start_time": "2024-01-15T14:00:00",
                            "end_time": "2024-01-15T15:00:00",
                            "duration_minutes": 60
                        }},
                        "confidence": 0.9
                    }}
                ]
            }}
            """
            
            # CORRECT API CALL
            response = self.model.generate_content(prompt)
            response_text = response.text.strip()
            
            # Clean the response
            if response_text.startswith("```json"):
                response_text = response_text[7:]
            if response_text.endswith("```"):
                response_text = response_text[:-3]
            response_text = response_text.strip()
            
            # Parse the JSON response
            result = json.loads(response_text)
            cards = result.get("cards", [])
            
            # Add metadata to each card
            for card in cards:
                card["card_id"] = str(uuid.uuid4())
                card["created_at"] = datetime.utcnow().isoformat()
                card["status"] = "pending"
                card["user_id"] = user_id
            
            print(f"✅ Generated {len(cards)} cards")
            return cards
            
        except json.JSONDecodeError as e:
            print(f"❌ JSON parsing error: {e}")
            return self._generate_fallback_cards(user_text, user_id)
        except Exception as e:
            print(f"❌ Gemini API error: {e}")
            return self._generate_fallback_cards(user_text, user_id)
    
    async def process_card_action(self, card_id: str, action: str, modifications: Optional[Dict] = None) -> Dict:
        """Process user actions on cards"""
        try:
            prompt = f"User action: {action} on card {card_id}. Return JSON with confirmation message."
            
            response = self.model.generate_content(prompt)
            response_text = response.text.strip()
            
            # Clean response
            if response_text.startswith("```json"):
                response_text = response_text[7:]
            if response_text.endswith("```"):
                response_text = response_text[:-3]
            
            return json.loads(response_text)
            
        except Exception as e:
            print(f"❌ Card action processing error: {e}")
            return {
                "message": f"Action '{action}' completed",
                "next_steps": [],
                "calendar_update": {"status": action},
                "notifications": []
            }
    
    async def health_check(self) -> str:
        """Health check"""
        try:
            response = self.model.generate_content("Say 'OK'")
            return "healthy" if response.text else "unhealthy"
        except Exception as e:
            print(f"❌ Health check failed: {e}")
            return "unhealthy"
    
    def _generate_fallback_cards(self, user_text: str, user_id: str) -> List[Dict]:
        """Generate fallback cards when Gemini fails"""
        return [
            {
                "card_id": str(uuid.uuid4()),
                "type": "schedule",
                "title": "Schedule Item",
                "description": f"Schedule: {user_text}",
                "primary_action": {
                    "event_title": "Scheduled Item",
                    "start_time": (datetime.utcnow() + timedelta(hours=1)).isoformat(),
                    "end_time": (datetime.utcnow() + timedelta(hours=2)).isoformat(),
                    "duration_minutes": 60,
                    "notes": user_text
                },
                "alternatives": [],
                "confidence": 0.7,
                "metadata": {
                    "urgency": "medium",
                    "flexibility": "flexible"
                },
                "created_at": datetime.utcnow().isoformat(),
                "status": "pending",
                "user_id": user_id
            }
        ]