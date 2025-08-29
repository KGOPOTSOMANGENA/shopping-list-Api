import { useDispatch } from "react-redux";
import { setSortOption } from "./shoppingSlice";
import { useNavigate } from "react-router-dom";

export default function SortDropdown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value as "name" | "category" | "date";
    dispatch(setSortOption(sort));
    navigate(`?sort=${sort}`);
  };

  return (
    <select onChange={handleSort}>
      <option value="name">Name</option>
      <option value="category">Category</option>
      <option value="date">Date Added</option>
    </select>
  );
}

