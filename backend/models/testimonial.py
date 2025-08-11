from motor.motor_asyncio import AsyncIOMotorDatabase
from pydantic import BaseModel, Field
from typing import List
from datetime import datetime

class Testimonial(BaseModel):
    id: int
    name: str
    role: str
    content: str
    rating: int = Field(..., ge=1, le=5)
    avatar: str
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class TestimonialResponse(BaseModel):
    id: int
    name: str
    role: str
    content: str
    rating: int
    avatar: str

class TestimonialService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.collection = db.testimonials

    async def get_active_testimonials(self) -> List[TestimonialResponse]:
        cursor = self.collection.find({"is_active": True}).sort("created_at", -1)
        testimonials_docs = await cursor.to_list(length=None)
        
        testimonials = []
        for doc in testimonials_docs:
            testimonial = TestimonialResponse(
                id=doc["id"],
                name=doc["name"],
                role=doc["role"],
                content=doc["content"],
                rating=doc["rating"],
                avatar=doc["avatar"]
            )
            testimonials.append(testimonial)
        
        return testimonials

    async def seed_testimonials(self, testimonials_data: List[dict]):
        """Seed testimonials from mock data"""
        for testimonial_data in testimonials_data:
            # Check if testimonial already exists
            existing = await self.collection.find_one({"id": testimonial_data["id"]})
            if not existing:
                testimonial = Testimonial(
                    id=testimonial_data["id"],
                    name=testimonial_data["name"],
                    role=testimonial_data["role"],
                    content=testimonial_data["content"],
                    rating=testimonial_data["rating"],
                    avatar=testimonial_data["avatar"]
                )
                await self.collection.insert_one(testimonial.dict())