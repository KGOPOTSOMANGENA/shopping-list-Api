import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { updateProfile } from "../features/auth/authSlice";
import { FaUserCircle } from "react-icons/fa"; 
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [form, setForm] = useState({
    name: user?.name || "",
    surname: user?.surname || "",
    email: user?.email || "",
    password: user?.password || "",
    cell: user?.cell || "",
  });

  if (!user) return <p>Please login first.</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(updateProfile(form)).unwrap();
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <FaUserCircle className="profile-icon" />
        <h2>My Profile</h2>
      </div>

      <form onSubmit={handleSubmit} className="profile-form">
        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} required />

        <label>Surname</label>
        <input name="surname" value={form.surname} onChange={handleChange} required />

        <label>Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} required />

        <label>Password</label>
        <input name="password" type="password" value={form.password} onChange={handleChange} required />

        <label>Cell</label>
        <input name="cell" value={form.cell} onChange={handleChange} required />

        <button type="submit" className="update-btn">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;


