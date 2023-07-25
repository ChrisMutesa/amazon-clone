import { createSlice } from '@reduxjs/toolkit';
import { IoMdThermometer } from 'react-icons/io';
import { StoreProduct } from '../../type';

interface NextState {
  productData: StoreProduct[];
  favoriteData: StoreProduct[];
  allProducts: StoreProduct[];
  userInfo: null | string;
}

const initialState: NextState = {
  productData: [],
  favoriteData: [],
  allProducts: [],
  userInfo: null,
};

export const nextSlice = createSlice({
  name: 'next',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.productData.find(
        (item: StoreProduct) => item._id === action.payload._id
      );
      // state.productData = action.payload;

      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.productData.push(action.payload);
      }
    },

    addToFavorite: (state, action) => {
      const existingProduct = state.favoriteData.find(
        (item: StoreProduct) => item._id === action.payload._id
      );
      // state.productData = action.payload;

      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.favoriteData.push(action.payload);
      }
    },

    increaseQuantity: (state, action) => {
      const existingProduct = state.productData.find(
        (item: StoreProduct) => item._id === action.payload._id
      );

      existingProduct && existingProduct.quantity++;
    },

    decreaseQuantity: (state, action) => {
      const existingProduct = state.productData.find(
        (item: StoreProduct) => item._id === action.payload._id
      );

      if (existingProduct?.quantity === 1) {
        existingProduct.quantity = 1;
      } else {
        existingProduct!.quantity--;
        // existingProduct && existingProduct.quantity--;
      }
    },

    deleteProduct: (state, action) => {
      state.productData = state.productData.filter(
        (item) => item._id !== action.payload._id
      );
    },

    deleteFavorite: (state, action) => {
      state.favoriteData = state.favoriteData.filter(
        (item) => item._id !== action.payload._id
      );
    },

    resetCart: (state) => {
      state.productData = [];
    },

    resetFavoriteData: (state) => {
      state.favoriteData = [];
    },

    addUser: (state, action) => {
      state.userInfo = action.payload;
    },

    removeUser: (state) => {
      state.userInfo = null;
    },

    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
  },
});

export const {
  addToCart,
  addToFavorite,
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
  addUser,
  removeUser,
  setAllProducts,
  resetCart,
  resetFavoriteData,
  deleteFavorite,
} = nextSlice.actions;
export default nextSlice.reducer;

// allProducts? chosen products may be?
// ++ vs += in js
// why do we need allProducts?
