import { createSlice } from "@reduxjs/toolkit";

let nextItemId = 1;

const initialState = {
  items: [
    {
      id: 1,
      title: "Blue Denim Shirt",
      type: "shirt",
      color: "blue",
      price: "17",
      size: "M",
      amount: 1,
      note: "1 piece",
    },
    {
      id: 2,
      title: "Red hoodie",
      type: "hoodie",
      color: "red",
      price: "35",
      size: "M",
      amount: 1,
      note: "",
    },
  ],
};

const chartSlice = createSlice({
  name: "chart",
  initialState: {
    items: [
      {
        id: 1,
        title: "Blue Denim Shirt",
        type: "shirt",
        color: "blue",
        price: "17",
        size: "M",
        amount: 1,
        note: "1 piece",
      },
      {
        id: 2,
        title: "Red hoodie",
        type: "hoodie",
        color: "red",
        price: "35",
        size: "M",
        amount: 1,
        note: "",
      },
    ],
  },
  reducers: {
    addItem(state, action) {
      const newItem = { id: nextItemId++, ...action.payload };
      state.items.push(newItem);
    },
    incrementAmount(state, action) {
      const { id } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.amount += 1;
      }
    },
    decrementAmount(state, action) {
      const { id } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item && item.amount > 1) {
        item.amount -= 1;
      }
    },
    deleteItem(state, action) {
      const { id } = action.payload;
      const index = state.items.findIndex((item) => item.id == id);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    resetChart(state) {
      state.items = initialState.items;
    },
    clearChart(state) {
      state.items = [];
    },
  },
});

export const {
  addItem,
  incrementAmount,
  decrementAmount,
  deleteItem,
  resetChart,
  clearChart,
} = chartSlice.actions;

export default chartSlice.reducer;
