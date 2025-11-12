from pydantic import BaseModel, Field
from typing import Dict, List, Optional, Any
from datetime import datetime

class AudioCaptureRequest(BaseModel):
    user_id: str
    audio_data: Optional[str] = None  # Base64 encoded audio

class UserPreference(BaseModel):
    user_id: str
    working_hours: Dict[str, Any] = Field(default_factory=dict)
    preferred_meeting_times: List[str] = Field(default_factory=list)
    energy_patterns: Dict[str, Any] = Field(default_factory=dict)
    scheduling_rules: Dict[str, Any] = Field(default_factory=dict)

class CardActionRequest(BaseModel):
    action: str  # accept, reject, modify, snooze
    modifications: Optional[Dict[str, Any]] = None
    user_id: str

class EventTimeSlot(BaseModel):
    start_time: str  # ISO format
    end_time: str    # ISO format
    reason: Optional[str] = None

class SuggestionCard(BaseModel):
    card_id: str
    type: str  # schedule, reschedule, cancel, reminder
    title: str
    description: str
    primary_action: Dict[str, Any]
    alternatives: List[EventTimeSlot] = Field(default_factory=list)
    confidence: float = Field(ge=0.0, le=1.0)
    metadata: Dict[str, Any] = Field(default_factory=dict)
    created_at: str
    status: str = "pending"  # pending, accepted, rejected, modified

class CardResponse(BaseModel):
    session_id: str
    cards: List[SuggestionCard]
    status: str

class GeminiParseResponse(BaseModel):
    intent: str
    entities: Dict[str, Any]
    confidence: float
    suggested_cards: List[SuggestionCard]