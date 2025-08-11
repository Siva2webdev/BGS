from motor.motor_asyncio import AsyncIOMotorDatabase
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

class Product(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    category: str
    price: float
    original_price: Optional[float] = None
    description: str
    features: List[str] = []
    image: str
    in_stock: bool = True
    rating: float = 0.0
    reviews: int = 0
    is_monthly: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ProductResponse(BaseModel):
    id: str
    name: str
    category: str
    price: float
    originalPrice: Optional[float] = None
    description: str
    features: List[str]
    image: str
    inStock: bool
    rating: float
    reviews: int
    isMonthly: bool

class ProductsListResponse(BaseModel):
    products: List[ProductResponse]
    total: int
    page: int
    total_pages: int

class Category(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    icon: str
    count: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class CategoryResponse(BaseModel):
    id: str
    name: str
    description: str
    icon: str
    count: int

class ProductService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.collection = db.products
        self.categories_collection = db.categories

    async def get_products(self, 
                          category: Optional[str] = None,
                          search: Optional[str] = None,
                          sort: str = "name",
                          page: int = 1,
                          limit: int = 20) -> ProductsListResponse:
        
        # Build query
        query = {}
        if category:
            query["category"] = category
        if search:
            query["$or"] = [
                {"name": {"$regex": search, "$options": "i"}},
                {"description": {"$regex": search, "$options": "i"}}
            ]

        # Count total documents
        total = await self.collection.count_documents(query)
        
        # Build sort
        sort_field = "name"
        sort_direction = 1
        if sort == "price-low":
            sort_field = "price"
            sort_direction = 1
        elif sort == "price-high":
            sort_field = "price"
            sort_direction = -1
        elif sort == "rating":
            sort_field = "rating"
            sort_direction = -1

        # Get products with pagination
        skip = (page - 1) * limit
        cursor = self.collection.find(query).sort(sort_field, sort_direction).skip(skip).limit(limit)
        products_docs = await cursor.to_list(length=limit)
        
        # Convert to response format
        products = []
        for doc in products_docs:
            product_response = ProductResponse(
                id=doc["id"],
                name=doc["name"],
                category=doc["category"],
                price=doc["price"],
                originalPrice=doc.get("original_price"),
                description=doc["description"],
                features=doc.get("features", []),
                image=doc["image"],
                inStock=doc.get("in_stock", True),
                rating=doc.get("rating", 0.0),
                reviews=doc.get("reviews", 0),
                isMonthly=doc.get("is_monthly", False)
            )
            products.append(product_response)

        total_pages = (total + limit - 1) // limit
        
        return ProductsListResponse(
            products=products,
            total=total,
            page=page,
            total_pages=total_pages
        )

    async def get_product_by_id(self, product_id: str) -> Optional[ProductResponse]:
        doc = await self.collection.find_one({"id": product_id})
        if not doc:
            return None
        
        return ProductResponse(
            id=doc["id"],
            name=doc["name"],
            category=doc["category"],
            price=doc["price"],
            originalPrice=doc.get("original_price"),
            description=doc["description"],
            features=doc.get("features", []),
            image=doc["image"],
            inStock=doc.get("in_stock", True),
            rating=doc.get("rating", 0.0),
            reviews=doc.get("reviews", 0),
            isMonthly=doc.get("is_monthly", False)
        )

    async def get_categories(self) -> List[CategoryResponse]:
        cursor = self.categories_collection.find({})
        categories_docs = await cursor.to_list(length=None)
        
        categories = []
        for doc in categories_docs:
            # Count products in this category
            count = await self.collection.count_documents({"category": doc["name"]})
            
            category_response = CategoryResponse(
                id=doc["id"],
                name=doc["name"],
                description=doc["description"],
                icon=doc["icon"],
                count=count
            )
            categories.append(category_response)
        
        return categories

    async def seed_products(self, products_data: List[dict]):
        """Seed products from mock data"""
        for product_data in products_data:
            # Check if product already exists
            existing = await self.collection.find_one({"id": product_data["id"]})
            if not existing:
                product = Product(
                    id=product_data["id"],
                    name=product_data["name"],
                    category=product_data["category"],
                    price=product_data["price"],
                    original_price=product_data.get("originalPrice"),
                    description=product_data["description"],
                    features=product_data.get("features", []),
                    image=product_data["image"],
                    in_stock=product_data.get("inStock", True),
                    rating=product_data.get("rating", 0.0),
                    reviews=product_data.get("reviews", 0),
                    is_monthly=product_data.get("isMonthly", False)
                )
                await self.collection.insert_one(product.dict())

    async def seed_categories(self, categories_data: List[dict]):
        """Seed categories from mock data"""
        for category_data in categories_data:
            # Check if category already exists
            existing = await self.categories_collection.find_one({"id": category_data["id"]})
            if not existing:
                category = Category(
                    id=category_data["id"],
                    name=category_data["name"],
                    description=category_data["description"],
                    icon=category_data["icon"]
                )
                await self.categories_collection.insert_one(category.dict())