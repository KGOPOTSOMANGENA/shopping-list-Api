import { BrowserRouter as Router, Routes, Route, useSearchParams } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { store } from "./app/store";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./features/shopping/Dashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import { useEffect } from "react";
import { setSearchKeyword } from "./features/shopping/shoppingSlice";


function SearchSync() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const search = searchParams.get("search") || "";
    dispatch(setSearchKeyword(search));
  }, [searchParams, dispatch]);

  return null; 
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <SearchSync />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/shopping" element={<Dashboard />} />

          <Route
            path="/profile"
            element={
              //<ProtectedRoute>
              <ProfilePage />
              //</ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
