import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ShoppingItem {
  id: number;
  userId: number;
  name: string;
  quantity: number;
  notes?: string;
  category: string;
  image?: string;
  dateAdded: string;
}

interface ShoppingState {
  items: ShoppingItem[];
  searchKeyword: string;  
  sortOption: "name" | "category" | "date"; 
  itemToEdit: ShoppingItem | null;   
}

const initialState: ShoppingState = {
  items: [],
  searchKeyword: "",
  sortOption: "name",
  itemToEdit: null, 
};

const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<ShoppingItem[]>) => {
      state.items = action.payload;
    },
    addItem: (state, action: PayloadAction<ShoppingItem>) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action: PayloadAction<ShoppingItem>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
      state.itemToEdit = null;
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearAllItems: (state) => {
    state.items = [];
    },
    setSearchKeyword: (state, action: PayloadAction<string>) => {
      state.searchKeyword = action.payload;
    },
    setSortOption: (state, action: PayloadAction<"name" | "category" | "date">) => {
      state.sortOption = action.payload;
    },
    setItemToEdit: (state, action: PayloadAction<ShoppingItem | null>) => { 
      state.itemToEdit = action.payload;
    },
  },
});

export const {
  setItems,
  addItem,
  updateItem,
  deleteItem,
  clearAllItems,
  setSearchKeyword,
  setSortOption,
  setItemToEdit, 
} = shoppingSlice.actions;

export default shoppingSlice.reducer;
