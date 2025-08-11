from fastapi import APIRouter, HTTPException, status, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from models.cart import CartService, CartResponse, AddToCartRequest, UpdateCartRequest
from auth import get_current_user_id

router = APIRouter(prefix="/cart", tags=["cart"])

async def get_cart_service(db: AsyncIOMotorDatabase = Depends(lambda: None)) -> CartService:
    # This will be injected in the main server file
    return CartService(db)

@router.get("", response_model=CartResponse)
async def get_cart(
    current_user_id: str = Depends(get_current_user_id),
    cart_service: CartService = Depends(get_cart_service)
):
    return await cart_service.get_cart_with_products(current_user_id)

@router.post("/add", response_model=dict)
async def add_to_cart(
    request: AddToCartRequest,
    current_user_id: str = Depends(get_current_user_id),
    cart_service: CartService = Depends(get_cart_service)
):
    try:
        success = await cart_service.add_to_cart(
            current_user_id, 
            request.productId, 
            request.quantity
        )
        if success:
            return {"message": "Item added to cart successfully"}
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to add item to cart"
            )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )

@router.put("/update/{product_id}", response_model=dict)
async def update_cart_item(
    product_id: str,
    request: UpdateCartRequest,
    current_user_id: str = Depends(get_current_user_id),
    cart_service: CartService = Depends(get_cart_service)
):
    success = await cart_service.update_cart_item(
        current_user_id, 
        product_id, 
        request.quantity
    )
    if success:
        return {"message": "Cart item updated successfully"}
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cart item not found"
        )

@router.delete("/remove/{product_id}", response_model=dict)
async def remove_from_cart(
    product_id: str,
    current_user_id: str = Depends(get_current_user_id),
    cart_service: CartService = Depends(get_cart_service)
):
    success = await cart_service.remove_from_cart(current_user_id, product_id)
    if success:
        return {"message": "Item removed from cart successfully"}
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cart item not found"
        )

@router.delete("/clear", response_model=dict)
async def clear_cart(
    current_user_id: str = Depends(get_current_user_id),
    cart_service: CartService = Depends(get_cart_service)
):
    success = await cart_service.clear_cart(current_user_id)
    if success:
        return {"message": "Cart cleared successfully"}
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to clear cart"
        )