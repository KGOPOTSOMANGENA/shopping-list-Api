import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import type { RootState } from "../../app/store";
import {
  setItems,
  setItemToEdit,
  setSearchKeyword,
  setSortOption,
} from "../../features/shopping/shoppingSlice";
import { fetchAllItems } from "../../features/shopping/shoppingAPI";
import ShoppingForm from "../../features/shopping/ShoppingForm";
import ShoppingList from "../../features/shopping/ShoppingList";
import { FiShoppingBag } from "react-icons/fi";
import "../../styles/ShoppingForm.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const items = useSelector((state: RootState) => state.shopping.items);
  const itemToEdit = useSelector((state: RootState) => state.shopping.itemToEdit);
  const searchKeyword = useSelector((state: RootState) => state.shopping.searchKeyword);
  const sortOption = useSelector((state: RootState) => state.shopping.sortOption);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await fetchAllItems();
        dispatch(setItems(data));
      } catch (err) {
        console.error("Failed to fetch items:", err);
      }
    };
    loadItems();
  }, [dispatch]);

  useEffect(() => {
    const search = searchParams.get("search") || "";
    const sort = (searchParams.get("sort") as "name" | "category" | "date") || "name";
    dispatch(setSearchKeyword(search));
    dispatch(setSortOption(sort));
  }, [searchParams, dispatch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    dispatch(setSearchKeyword(keyword));

    const newParams = new URLSearchParams(searchParams);
    if (keyword) newParams.set("search", keyword);
    else newParams.delete("search");
    setSearchParams(newParams);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value as "name" | "category" | "date";
    dispatch(setSortOption(sort));

    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", sort);
    setSearchParams(newParams);
  };

  const filteredItems = items
    .filter((item) => item.name.toLowerCase().includes(searchKeyword.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === "name") return a.name.localeCompare(b.name);
      if (sortOption === "category") return a.category.localeCompare(b.category);
      if (sortOption === "date")
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      return 0;
    });

  return (
    <div className="dashboard-container">
      <h2 className="My-Heading">
        <FiShoppingBag className="shopping-icon" /> My Shopping List
      </h2>

      <div className="top-bar">
        <input
          type="text"
          placeholder="Search items..."
          value={searchKeyword}
          onChange={handleSearch}
          className="search-input"
        />
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="sort-select"
        >
          <option value="name">Sort by Name</option>
          <option value="category">Sort by Category</option>
          <option value="date">Sort by Date</option>
        </select>
      </div>

      <ShoppingForm itemToEdit={itemToEdit} onFinish={() => dispatch(setItemToEdit(null))} />

      <ShoppingList
        items={filteredItems}
        onEdit={(item) => dispatch(setItemToEdit(item))}
      />
    </div>
  );
};

export default Dashboard;

