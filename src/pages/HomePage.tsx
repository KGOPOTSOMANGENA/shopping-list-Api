import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { setItems } from "../features/shopping/shoppingSlice";
import { fetchAllItems } from "../features/shopping/shoppingAPI";
import ShoppingForm from "../features/shopping/ShoppingForm";
import ShoppingList from "../features/shopping/ShoppingList";

const HomePage = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.shopping.items);
  const searchKeyword = useSelector((state: RootState) => state.shopping.searchKeyword);
  const sortOption = useSelector((state: RootState) => state.shopping.sortOption);
  const [editItem, setEditItem] = useState<any>(null);

  useEffect(() => {
    const loadItems = async () => {
      const data = await fetchAllItems();
      dispatch(setItems(data));
    };
    loadItems();
  }, [dispatch]);

  const filteredItems = items
    .filter((item) => item.name.toLowerCase().includes(searchKeyword.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === "name") return a.name.localeCompare(b.name);
      if (sortOption === "category") return a.category.localeCompare(b.category);
      if (sortOption === "date") return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
      return 0;
    });

  return (
    <div className="p-4">
  
      <ShoppingForm itemToEdit={editItem} onFinish={() => setEditItem(null)} />

      <ShoppingList items={filteredItems} onEdit={setEditItem} />
    </div>
  );
};

export default HomePage;
