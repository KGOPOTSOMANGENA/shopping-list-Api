import type { ShoppingItem } from "./shoppingSlice";

// Create a new item
export const createItem = async (item: Omit<ShoppingItem, "id" | "purchased" | "dateAdded">) => {
  const res = await fetch("http://localhost:5000/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  const data = await res.json();
  return data;
};

export const editItem = async (item: ShoppingItem) => {
  const res = await fetch(`http://localhost:5000/items/${item.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  const data = await res.json();
  return data;
};

// Delete an item
export const removeItem = async (id: number) => {
  await fetch(`http://localhost:5000/items/${id}`, {
    method: "DELETE",
  });
};

// Fetch all items
export const fetchAllItems = async (): Promise<ShoppingItem[]> => {
  const res = await fetch("http://localhost:5000/items");
  if (!res.ok) throw new Error("Failed to fetch items");
  const data: ShoppingItem[] = await res.json();
  return data;
};

// Fetch a single item by ID (optional, if needed)
export const fetchItemById = async (id: number): Promise<ShoppingItem> => {
  const res = await fetch(`http://localhost:5000/items/${id}`);
  if (!res.ok) throw new Error("Item not found");
  const data: ShoppingItem = await res.json();
  return data;
};

