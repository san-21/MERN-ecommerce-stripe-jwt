import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk("product/getProducts", async () => {
  const response = await axios.get(
    "https://sanshop-api.onrender.com/product/products"
  );
  const data = await response.data;
  return data;
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    searchTerm: "",
    products: [],
    filteredProducts: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload.qs;
    },

    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload.data;
    },
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.filteredProducts = action.payload;
      state.products = action.payload;
    },
    [getProducts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setSearchTerm, setFilteredProducts } = productSlice.actions;

const productReducer = productSlice.reducer;

export default productReducer;
