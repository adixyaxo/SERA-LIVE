# test_setup.py
import sys
import asyncio

def check_imports():
    """Check if all packages can be imported"""
    packages = [
        "fastapi", "uvicorn", "google.genai", "pydantic",
        "sqlalchemy", "psycopg2", "websockets"
    ]
    
    print("🔍 Checking imports...")
    for package in packages:
        try:
            __import__(package)
            print(f"✅ {package}")
        except ImportError as e:
            print(f"❌ {package}: {e}")
            return False
    return True

async def test_gemini():
    """Test Gemini API connection"""
    try:
        from app.gemini_client import GeminiClient
        gemini = GeminiClient()
        health = await gemini.health_check()
        print(f"✅ Gemini API: {health}")
        return health == "healthy"
    except Exception as e:
        print(f"❌ Gemini API test failed: {e}")
        return False

async def test_database():
    """Test database connection"""
    try:
        from app.database import DatabaseManager
        db = DatabaseManager()
        
        # Test card storage
        test_card = {
            "card_id": "test_card_123",
            "type": "schedule", 
            "title": "Test Meeting",
            "description": "Test description",
            "primary_action": {"start_time": "2024-01-01T10:00:00"},
            "alternatives": [],
            "user_id": "test_user"
        }
        
        success = db.store_card(test_card)
        print(f"✅ Database test: {'Passed' if success else 'Failed'}")
        return success
    except Exception as e:
        print(f"❌ Database test failed: {e}")
        return False

async def main():
    print("🧪 Testing SERA Backend Setup...")
    print(f"Python version: {sys.version}")
    
    if not check_imports():
        print("❌ Import check failed")
        return
    
    # Test Gemini
    gemini_ok = await test_gemini()
    
    # Test Database  
    db_ok = await test_database()
    
    if gemini_ok and db_ok:
        print("\n🎉 All tests passed! SERA backend is ready.")
        print("\nTo start the server:")
        print("  uvicorn app.main:app --reload --host 0.0.0.0 --port 8000")
    else:
        print("\n❌ Some tests failed. Please check the errors above.")

if __name__ == "__main__":
    asyncio.run(main())