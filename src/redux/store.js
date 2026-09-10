import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./slices/cartSlice";

const cartStorageKey = "brew-and-bite-cart";

function loadCart() {
  try {
    const savedCart = localStorage.getItem(cartStorageKey);
    return savedCart ? JSON.parse(savedCart) : undefined;
  } catch {
    return undefined;
  }
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: {
    cart: loadCart(),
  },
});

store.subscribe(() => {
  try {
    localStorage.setItem(
      cartStorageKey,
      JSON.stringify(store.getState().cart)
    );
  } catch {
    // The cart continues to work if browser storage is unavailable.
  }
});
