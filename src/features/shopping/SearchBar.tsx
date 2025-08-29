import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import ShoppingForm from "./ShoppingForm";
import SearchBar from "./SearchBar";

export default function Dashboard() {
  const items = useSelector((state: RootState) => state.shopping.items);
  const searchKeyword = useSelector((state: RootState) => state.shopping.searchKeyword);
  const sortOption = useSelector((state: RootState) => state.shopping.sortOption);


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
    <div>
      <h2>Shopping Dashboard</h2>

    
      <SearchBar />

     
      <ShoppingForm />

      
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>
            {item.name} ({item.quantity}) - {item.category}
          </li>
        ))}
      </ul>
    </div>
  );
}


