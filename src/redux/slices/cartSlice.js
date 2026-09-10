import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {

    addToCart: (state, action) => {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }

      state.totalItems += 1;
      state.totalPrice += product.price;
    },

    increaseQuantity: (state, action) => {
      const productId = action.payload;

      const item = state.items.find(
        (item) => item.id === productId
      );

      if (item) {
        item.quantity += 1;

        state.totalItems += 1;

        state.totalPrice += item.price;
      }
    },

    decreaseQuantity: (state, action) => {
      const productId = action.payload;

      const item = state.items.find(
        (item) => item.id === productId
      );

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;

        state.totalItems -= 1;

        state.totalPrice -= item.price;
      }
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;

      const item = state.items.find(
        (item) => item.id === productId
      );

      if (!item) return;

      state.totalItems -= item.quantity;

      state.totalPrice -=
        item.price * item.quantity;

      state.items = state.items.filter(
        (item) => item.id !== productId
      );
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },

  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;