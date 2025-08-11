from fastapi import APIRouter, HTTPException, status, Depends, Query
from motor.motor_asyncio import AsyncIOMotorDatabase
from models.product import ProductService, ProductsListResponse, ProductResponse, CategoryResponse
from typing import Optional, List

router = APIRouter(prefix="/products", tags=["products"])

async def get_product_service(db: AsyncIOMotorDatabase = Depends(lambda: None)) -> ProductService:
    # This will be injected in the main server file
    return ProductService(db)

@router.get("", response_model=ProductsListResponse)
async def get_products(
    category: Optional[str] = Query(None, description="Filter by category"),
    search: Optional[str] = Query(None, description="Search in name and description"),
    sort: str = Query("name", description="Sort by: name, price-low, price-high, rating"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(20, ge=1, le=100, description="Items per page"),
    product_service: ProductService = Depends(get_product_service)
):
    return await product_service.get_products(
        category=category,
        search=search,
        sort=sort,
        page=page,
        limit=limit
    )

@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(
    product_id: str,
    product_service: ProductService = Depends(get_product_service)
):
    product = await product_service.get_product_by_id(product_id)
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    return product

@router.get("/categories/all", response_model=List[CategoryResponse])
async def get_categories(product_service: ProductService = Depends(get_product_service)):
    return await product_service.get_categories()