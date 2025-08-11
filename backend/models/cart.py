from motor.motor_asyncio import AsyncIOMotorDatabase
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

class CartItem(BaseModel):
    product_id: str
    quantity: int
    price: float
    name: str
    image: str

class CartItemResponse(BaseModel):
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
    quantity: int

class Cart(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    items: List[CartItem] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class CartResponse(BaseModel):
    cartItems: List[CartItemResponse]
    total: float

class AddToCartRequest(BaseModel):
    productId: str
    quantity: int = 1

class UpdateCartRequest(BaseModel):
    quantity: int

class CartService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.collection = db.carts
        self.products_collection = db.products

    async def get_or_create_cart(self, user_id: str) -> Cart:
        cart_doc = await self.collection.find_one({"user_id": user_id})
        if cart_doc:
            return Cart(**cart_doc)
        
        # Create new cart
        cart = Cart(user_id=user_id)
        await self.collection.insert_one(cart.dict())
        return cart

    async def get_cart_with_products(self, user_id: str) -> CartResponse:
        cart = await self.get_or_create_cart(user_id)
        cart_items = []
        total = 0.0

        for item in cart.items:
            # Get full product details
            product_doc = await self.products_collection.find_one({"id": item.product_id})
            if product_doc:
                cart_item = CartItemResponse(
                    id=product_doc["id"],
                    name=product_doc["name"],
                    category=product_doc["category"],
                    price=product_doc["price"],
                    originalPrice=product_doc.get("original_price"),
                    description=product_doc["description"],
                    features=product_doc.get("features", []),
                    image=product_doc["image"],
                    inStock=product_doc.get("in_stock", True),
                    rating=product_doc.get("rating", 0.0),
                    reviews=product_doc.get("reviews", 0),
                    isMonthly=product_doc.get("is_monthly", False),
                    quantity=item.quantity
                )
                cart_items.append(cart_item)
                total += product_doc["price"] * item.quantity

        return CartResponse(cartItems=cart_items, total=total)

    async def add_to_cart(self, user_id: str, product_id: str, quantity: int = 1) -> bool:
        # Get product details
        product_doc = await self.products_collection.find_one({"id": product_id})
        if not product_doc:
            raise ValueError("Product not found")

        cart = await self.get_or_create_cart(user_id)
        
        # Check if item already exists in cart
        existing_item_index = None
        for i, item in enumerate(cart.items):
            if item.product_id == product_id:
                existing_item_index = i
                break

        if existing_item_index is not None:
            # Update quantity
            cart.items[existing_item_index].quantity += quantity
        else:
            # Add new item
            cart_item = CartItem(
                product_id=product_id,
                quantity=quantity,
                price=product_doc["price"],
                name=product_doc["name"],
                image=product_doc["image"]
            )
            cart.items.append(cart_item)

        cart.updated_at = datetime.utcnow()
        
        # Update in database
        await self.collection.update_one(
            {"user_id": user_id},
            {"$set": cart.dict()}
        )
        
        return True

    async def update_cart_item(self, user_id: str, product_id: str, quantity: int) -> bool:
        cart = await self.get_or_create_cart(user_id)
        
        if quantity <= 0:
            # Remove item
            cart.items = [item for item in cart.items if item.product_id != product_id]
        else:
            # Update quantity
            for item in cart.items:
                if item.product_id == product_id:
                    item.quantity = quantity
                    break
            else:
                return False  # Item not found

        cart.updated_at = datetime.utcnow()
        
        # Update in database
        await self.collection.update_one(
            {"user_id": user_id},
            {"$set": cart.dict()}
        )
        
        return True

    async def remove_from_cart(self, user_id: str, product_id: str) -> bool:
        cart = await self.get_or_create_cart(user_id)
        
        original_length = len(cart.items)
        cart.items = [item for item in cart.items if item.product_id != product_id]
        
        if len(cart.items) == original_length:
            return False  # Item not found
        
        cart.updated_at = datetime.utcnow()
        
        # Update in database
        await self.collection.update_one(
            {"user_id": user_id},
            {"$set": cart.dict()}
        )
        
        return True

    async def clear_cart(self, user_id: str) -> bool:
        cart = await self.get_or_create_cart(user_id)
        cart.items = []
        cart.updated_at = datetime.utcnow()
        
        # Update in database
        await self.collection.update_one(
            {"user_id": user_id},
            {"$set": cart.dict()}
        )
        
        return True