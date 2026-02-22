from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/api", tags=["api"])

# In-memory store for demo
items_db: dict[int, dict] = {}
next_id = 1


class ItemCreate(BaseModel):
    name: str
    value: int | None = None


class ItemUpdate(BaseModel):
    name: str | None = None
    value: int | None = None


@router.get("/health")
def health():
    return {"status": "ok"}


@router.get("/items")
def list_items():
    """GET all items in the database."""
    return {"items": list(items_db.values())}


@router.get("/items/{item_id}")
def get_item(item_id: int):
    """GET one item by ID."""
    if item_id not in items_db:
        raise HTTPException(status_code=404, detail="Item not found")
    return items_db[item_id]


@router.post("/items")
def create_item(item: ItemCreate):
    """POST a new item."""
    global next_id
    new = {"id": next_id, "name": item.name, "value": item.value}
    items_db[next_id] = new
    next_id += 1
    return new


@router.put("/items/{item_id}")
def update_item(item_id: int, item: ItemUpdate):
    """PUT to replace/update an item."""
    if item_id not in items_db:
        raise HTTPException(status_code=404, detail="Item not found")
    existing = items_db[item_id]
    if item.name is not None:
        existing["name"] = item.name
    if item.value is not None:
        existing["value"] = item.value
    return existing


@router.delete("/items/{item_id}")
def delete_item(item_id: int):
    """DELETE an item."""
    if item_id not in items_db:
        raise HTTPException(status_code=404, detail="Item not found")
    deleted = items_db.pop(item_id)
    return {"deleted": deleted}
