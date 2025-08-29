import { useDispatch } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { AppDispatch } from "../app/store"; 
import type { User } from "../features/auth/authSlice";
import { FaShoppingBag } from "react-icons/fa"; 
import "../styles/Register.css";

export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    cell: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const newUser: User = { id: Date.now(), ...formData };
      const resultAction = await dispatch(registerUser(newUser));

      if (registerUser.rejected.match(resultAction)) {
        setError(resultAction.payload || "Registration failed");
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <div className="register-header">
        <FaShoppingBag className="bag-icon" />
        <h2>Register</h2>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="surname" placeholder="Surname" onChange={handleChange} required />
      <input name="cell" placeholder="Cell Number" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
}



