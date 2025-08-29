import { useDispatch } from "react-redux";
import { deleteItem, clearAllItems } from "./shoppingSlice";
import { removeItem } from "./shoppingAPI";
import "../../styles/ShoppingForm.css";

interface Props {
  items: any[];
  onEdit: (item: any) => void;
}

const ShoppingList = ({ items, onEdit }: Props) => {
  const dispatch = useDispatch();

  const handleDelete = async (id: number) => {
    await removeItem(id);
    dispatch(deleteItem(id));
  };

  const handleClearAll = async () => {

    for (const item of items) {
      await removeItem(item.id);
    }
    dispatch(clearAllItems());
  };

  return (
    <div>
      <div className="item-list">
        {items.map(item => (
          <div key={item.id} className="item-card">
            <h4>{item.name}</h4>
            <p>Qty: {item.quantity}</p>
            <p>Category: {item.category}</p>
            {item.notes && <p>Notes: {item.notes}</p>}
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "5px", marginBottom: "8px" }}
              />
            )}
            <div className="card-actions">
              <button className="edit-btn" onClick={() => onEdit(item)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <button
          className="clear-all-btn"
          onClick={handleClearAll}
          style={{
            marginTop: "16px",
            padding: "10px 20px",
            borderRadius: "6px",
            background: "#ff4d4d",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default ShoppingList;


