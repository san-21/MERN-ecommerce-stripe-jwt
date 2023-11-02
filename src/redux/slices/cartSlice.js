import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    product: [],
    totalQuantity: 0,
    total: 0,
    subTotal: 0,
  },
  reducers: {
    addProducts: (state, action) => {
      state.product = action.payload;
    },
    addToCart: (state, action) => {
      state.totalQuantity += 1;

      const selectedItem = state.cartItems.find(
        (product) =>
          product._id === action.payload.item._id &&
          product.productColor === action.payload.item.productColor &&
          product.productSize === action.payload.item.productSize
      );

      const id = action.payload.item._id;

      if (selectedItem) {
        state.cartItems.map((i, index) => {
          if (
            i._id === id &&
            i.productColor === action.payload.item.productColor &&
            i.productSize === action.payload.item.productSize
          ) {
            state.cartItems[index].quantity += 1;
            state.subTotal = state.cartItems.reduce((total, item) => {
              return total + item.quantity * item.price;
            }, 0);
          }
          return state.cartItems;
        });
      } else {
        state.cartItems = [...state.cartItems, action.payload.item];
        state.subTotal = state.cartItems.reduce((total, item) => {
          return total + item.quantity * item.salePrice;
        }, 0);
      }
    },
    quantityDecrement: (state, action) => {
      state.cartItems.map((item, index) => {
        if (
          item._id === action.payload.id &&
          item.quantity > 1 &&
          item.productColor === action.payload.color &&
          item.productSize === action.payload.size
        ) {
          state.cartItems[index].quantity--;
          state.totalQuantity -= 1;
          state.subTotal = state.cartItems.reduce((total, item) => {
            return total + item.quantity * item.salePrice;
          }, 0);
        }
        return state.cartItems;
      });
    },
    quantityIncrement: (state, action) => {
      state.cartItems.map((item, index) => {
        if (
          item._id === action.payload.id &&
          item.productColor === action.payload.color &&
          item.productSize === action.payload.size
        ) {
          state.cartItems[index].quantity++;
          state.totalQuantity += 1;
          state.subTotal = state.cartItems.reduce((total, item) => {
            return total + item.quantity * item.salePrice;
          }, 0);
        }
        return state.cartItems;
      });
    },
    removeProduct: (state, action) => {
      const removedItem = state.cartItems.find(
        (i) =>
          i._id === action.payload.id &&
          i.productColor === action.payload.color &&
          i.productSize === action.payload.size
      );

      state.cartItems = state.cartItems.filter((item) => item !== removedItem);
      const quantityRemoved = removedItem.quantity;

      state.totalQuantity -= quantityRemoved;
      state.subTotal = state.cartItems.reduce((total, item) => {
        return total + item.quantity * item.salePrice;
      }, 0);
    },
    setSubTotal: (state, action) => {
      state.subTotal = action.payload;
    },
    clearCarts: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
    },
  },
});

export const {
  addProducts,
  addToCart,
  quantityIncrement,
  quantityDecrement,
  removeProduct,
  setSubTotal,
  clearCarts,
} = cartSlice.actions;
export default cartSlice.reducer;
