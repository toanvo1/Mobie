// src/slices/productSlice.js
import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = [];

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      return action.payload;
    },
    addProduct(state, action) {
      state.push(action.payload);
    },
    updateProduct(state, action) {
      const index = state.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    removeProduct(state, action) {
      return state.filter(p => p.id !== action.payload);
    },
  },
});

export const {setProducts, addProduct, updateProduct, removeProduct} =
  productSlice.actions;
export default productSlice.reducer;

// Thực hiện các cuộc gọi API để lấy, thêm, xóa, sửa sản phẩm
export const fetchProducts = () => async dispatch => {
  try {
    const response = await axios.get(
      'https://65465bfefe036a2fa9558ece.mockapi.io/Donut/redux',
    );
    dispatch(setProducts(response.data));
  } catch (error) {
    console.error('Failed to fetch products', error);
  }
};

export const createProduct = product => async dispatch => {
  try {
    const response = await axios.post(
      'https://65465bfefe036a2fa9558ece.mockapi.io/Donut/redux',
      product,
    );
    dispatch(addProduct(response.data));
  } catch (error) {
    console.error('Failed to create product', error);
  }
};

export const editProduct = product => async dispatch => {
  try {
    const response = await axios.put(
      `https://65465bfefe036a2fa9558ece.mockapi.io/Donut/redux/${product.id}`,
      product,
    );
    dispatch(updateProduct(response.data));
  } catch (error) {
    console.error('Failed to update product', error);
  }
};

export const deleteProduct = id => async dispatch => {
  try {
    await axios.delete(
      `https://65465bfefe036a2fa9558ece.mockapi.io/Donut/redux/${id}`,
    );
    dispatch(removeProduct(id));
  } catch (error) {
    console.error('Failed to delete product', error);
  }
};

