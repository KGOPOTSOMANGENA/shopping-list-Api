import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import type { RootState } from "../../app/store";
import { addItem, updateItem, setSearchKeyword, setSortOption } from "./shoppingSlice";
import type { ShoppingItem } from "./shoppingSlice";
import { createItem, editItem } from "./shoppingAPI";
import "../../styles/ShoppingForm.css";


interface Props {
  itemToEdit?: ShoppingItem | null;
  onFinish?: () => void;
}

const ShoppingForm = ({ itemToEdit, onFinish }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const authUser = useSelector((state: RootState) => state.auth.user);
  const searchKeyword = useSelector((state: RootState) => state.shopping.searchKeyword);
  const sortOption = useSelector((state: RootState) => state.shopping.sortOption);

  if (!authUser) return null;
  const userId = authUser.id;

  const [form, setForm] = useState({
    name: "",
    quantity: 1,
    notes: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    if (itemToEdit) {
      setForm({
        name: itemToEdit.name,
        quantity: itemToEdit.quantity,
        notes: itemToEdit.notes || "",
        category: itemToEdit.category || "",
        image: itemToEdit.image || "",
      });
    } else {
      setForm({ name: "", quantity: 1, notes: "", category: "", image: "" });
    }
  }, [itemToEdit]);

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.name === "quantity" ? Number(e.target.value) : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (itemToEdit) {
        const updated: ShoppingItem = {
          ...form,
          id: itemToEdit.id,
          userId: itemToEdit.userId,
          dateAdded: itemToEdit.dateAdded,
        };
        const saved = await editItem(updated);
        dispatch(updateItem(saved));
      } else {
        const userId: number = Number(authUser.id);
        const newItemData: Omit<ShoppingItem, "id"> = {
          ...form,
          userId,
          dateAdded: new Date().toISOString(),
        };
        const saved = await createItem(newItemData);
        dispatch(addItem(saved));
      }

      setForm({ name: "", quantity: 1, notes: "", category: "", image: "" });
      onFinish?.();
    } catch (err) {
      console.error("Error saving item:", err);
      alert("Failed to save item. Make sure your backend is running.");
    }
  };

  return (
    <div className="shopping-container">
      <h3 className="My-profile">My Profile</h3>
  <div
    className="profile"
    style={{ cursor: "pointer" }}
    onClick={() => navigate("/profile")}
  >
      👤
  </div>

      <form onSubmit={handleSubmit} className="nav-bar">
        <input
          name="name"
          placeholder="Name of the Product"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="quantity"
          type="number"
          value={form.quantity}
          onChange={handleChange}
          min={1}
          required
        />
        <input
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Electronics">Electronics</option>
          <option value="Household">Household</option>
        </select>
        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
        />
        <button type="submit" className="add-btn">
          {itemToEdit ? "Update Item" : "Add Item"}
        </button>
      </form>
    </div>
  );
};

export default ShoppingForm;
