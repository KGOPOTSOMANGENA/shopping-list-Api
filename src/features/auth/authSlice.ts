import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
export interface User {
  id: number | string;
  email: string;
  password: string;
  name: string;
  surname: string;
  cell: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
}

export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const res = await fetch(`http://localhost:5000/users/email/${credentials.email}`);
    if (!res.ok) return rejectWithValue("User not found");
    const user: User = await res.json();

    if (user.password !== credentials.password) return rejectWithValue("Invalid password");
    return user;
  } catch (err) {
    return rejectWithValue("Login failed. Try again.");
  }
});

export const registerUser = createAsyncThunk<User, User, { rejectValue: string }>(
  "auth/registerUser",
  async (newUser, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!res.ok) return rejectWithValue("Registration failed");
      const savedUser: User = await res.json();
      return savedUser;
    } catch (err) {
      return rejectWithValue("Registration failed. Try again.");
    }
  }
);

export const updateProfile = createAsyncThunk<
  User,
  Partial<User>,
  { rejectValue: string; state: { auth: AuthState } }
>("auth/updateProfile", async (updatedData, { rejectWithValue, getState }) => {
  const currentUser = getState().auth.user;
  if (!currentUser) return rejectWithValue("User not logged in");

  try {
    const res = await fetch(`http://localhost:5000/users/${currentUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...currentUser, ...updatedData }),
    });
    if (!res.ok) throw new Error();
    const updatedUser = await res.json();
    return updatedUser;
  } catch (err) {
    return rejectWithValue("Failed to update profile");
  }
});

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  isAuthenticated: !!localStorage.getItem("user"),
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem("user", JSON.stringify(action.payload));
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.payload || "Login failed";
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem("user", JSON.stringify(action.payload));
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.payload || "Registration failed";
    });

    builder.addCase(updateProfile.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.error = null;
      localStorage.setItem("user", JSON.stringify(action.payload));
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.error = action.payload || "Failed to update profile";
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
