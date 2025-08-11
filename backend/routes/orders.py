from fastapi import APIRouter, HTTPException, status, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from models.order import OrderService, OrderCreate, OrderResponse, OrdersListResponse
from auth import get_current_user_id

router = APIRouter(prefix="/orders", tags=["orders"])

async def get_order_service(db: AsyncIOMotorDatabase = Depends(lambda: None)) -> OrderService:
    # This will be injected in the main server file
    return OrderService(db)

@router.post("", response_model=OrderResponse)
async def create_order(
    order_data: OrderCreate,
    current_user_id: str = Depends(get_current_user_id),
    order_service: OrderService = Depends(get_order_service)
):
    try:
        order = await order_service.create_order(current_user_id, order_data)
        return order
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.get("", response_model=OrdersListResponse)
async def get_user_orders(
    current_user_id: str = Depends(get_current_user_id),
    order_service: OrderService = Depends(get_order_service)
):
    return await order_service.get_user_orders(current_user_id)

@router.get("/{order_id}", response_model=OrderResponse)
async def get_order(
    order_id: str,
    current_user_id: str = Depends(get_current_user_id),
    order_service: OrderService = Depends(get_order_service)
):
    order = await order_service.get_order_by_id(current_user_id, order_id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    return order