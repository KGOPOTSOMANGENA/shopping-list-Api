
import type { User } from "./authSlice";

export const updateUser = async (user: User) => {
  const res = await fetch(`http://localhost:5000/users/${user.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Failed to update user");
  const data = await res.json();
  return data;
};
