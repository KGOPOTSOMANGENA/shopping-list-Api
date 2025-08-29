import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { AppDispatch } from "../app/store"; 
import { FaShoppingBag } from "react-icons/fa";
import "../styles/Register.css";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const resultAction = await dispatch(loginUser(credentials));
      if (loginUser.rejected.match(resultAction)) {
        setError(resultAction.payload || "Login failed");
      } else {
        navigate("/shopping");
      }
    } catch (err) {
      setError("Login failed. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <div className="register-header">
        <FaShoppingBag className="bag-icon" />
        <h2>Login</h2>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        className="form-input"
        name="email"
        placeholder="Email"
        value={credentials.email}
        onChange={handleChange}
        required
      />
      <input
        className="form-input"
        name="password"
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
        required
      />
      <button type="submit" className="form-button">Login</button>
    </form>
  );
}



