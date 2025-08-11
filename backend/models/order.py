from motor.motor_asyncio import AsyncIOMotorDatabase
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid

class OrderItem(BaseModel):
    product_id: str
    name: str
    price: float
    quantity: int
    image: str

class ShippingAddress(BaseModel):
    first_name: str = Field(..., alias="firstName")
    last_name: str = Field(..., alias="lastName")
    email: str
    phone: str
    address: str
    city: str
    state: str
    pincode: str

class OrderCreate(BaseModel):
    items: List[Dict[str, Any]]  # Cart items
    shipping_address: ShippingAddress = Field(..., alias="shippingAddress")
    payment_method: str = Field(..., alias="paymentMethod")
    payment_details: Dict[str, Any] = Field(..., alias="paymentDetails")

class Order(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    order_id: str = Field(default_factory=lambda: f"ORD-{uuid.uuid4().hex[:8].upper()}")
    user_id: str
    items: List[OrderItem]
    total: float
    status: str = "pending"  # pending, completed, failed
    shipping_address: ShippingAddress
    payment_method: str
    payment_status: str = "pending"  # pending, completed, failed
    payment_details: Dict[str, Any] = {}
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class OrderResponse(BaseModel):
    id: str
    orderId: str
    items: List[OrderItem]
    total: float
    status: str
    shippingAddress: ShippingAddress
    paymentMethod: str
    paymentStatus: str
    createdAt: datetime

class OrdersListResponse(BaseModel):
    orders: List[OrderResponse]
    total: int

class OrderService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.collection = db.orders
        self.carts_collection = db.carts

    async def create_order(self, user_id: str, order_data: OrderCreate) -> OrderResponse:
        # Calculate total from items
        total = 0.0
        order_items = []
        
        for item_data in order_data.items:
            order_item = OrderItem(
                product_id=item_data["id"],
                name=item_data["name"],
                price=item_data["price"],
                quantity=item_data["quantity"],
                image=item_data["image"]
            )
            order_items.append(order_item)
            total += item_data["price"] * item_data["quantity"]

        # Create order
        order = Order(
            user_id=user_id,
            items=order_items,
            total=total,
            shipping_address=order_data.shipping_address,
            payment_method=order_data.payment_method,
            payment_details=order_data.payment_details
        )

        # Save to database
        await self.collection.insert_one(order.dict())

        # Simulate payment processing
        # In real implementation, this would integrate with Stripe/UPI
        await self._process_payment(order)

        # If payment successful, clear cart
        if order.payment_status == "completed":
            await self.carts_collection.update_one(
                {"user_id": user_id},
                {"$set": {"items": [], "updated_at": datetime.utcnow()}}
            )

        return OrderResponse(
            id=order.id,
            orderId=order.order_id,
            items=order.items,
            total=order.total,
            status=order.status,
            shippingAddress=order.shipping_address,
            paymentMethod=order.payment_method,
            paymentStatus=order.payment_status,
            createdAt=order.created_at
        )

    async def get_user_orders(self, user_id: str) -> OrdersListResponse:
        cursor = self.collection.find({"user_id": user_id}).sort("created_at", -1)
        orders_docs = await cursor.to_list(length=None)
        
        orders = []
        for doc in orders_docs:
            order_response = OrderResponse(
                id=doc["id"],
                orderId=doc["order_id"],
                items=doc["items"],
                total=doc["total"],
                status=doc["status"],
                shippingAddress=ShippingAddress(**doc["shipping_address"]),
                paymentMethod=doc["payment_method"],
                paymentStatus=doc["payment_status"],
                createdAt=doc["created_at"]
            )
            orders.append(order_response)

        return OrdersListResponse(orders=orders, total=len(orders))

    async def get_order_by_id(self, user_id: str, order_id: str) -> Optional[OrderResponse]:
        doc = await self.collection.find_one({"id": order_id, "user_id": user_id})
        if not doc:
            return None

        return OrderResponse(
            id=doc["id"],
            orderId=doc["order_id"],
            items=doc["items"],
            total=doc["total"],
            status=doc["status"],
            shippingAddress=ShippingAddress(**doc["shipping_address"]),
            paymentMethod=doc["payment_method"],
            paymentStatus=doc["payment_status"],
            createdAt=doc["created_at"]
        )

    async def _process_payment(self, order: Order):
        """Simulate payment processing"""
        # In a real implementation, this would integrate with:
        # - Stripe for card payments
        # - UPI payment gateways for UPI payments
        
        # For demo purposes, we'll simulate successful payment
        order.payment_status = "completed"
        order.status = "completed"
        order.updated_at = datetime.utcnow()
        
        # Update in database
        await self.collection.update_one(
            {"id": order.id},
            {"$set": {
                "payment_status": order.payment_status,
                "status": order.status,
                "updated_at": order.updated_at
            }}
        )