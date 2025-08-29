{/*import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../app/store";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
*/}
const ProtectedRoute = () => {
  return <h1>Home</h1>;
};

export default ProtectedRoute;