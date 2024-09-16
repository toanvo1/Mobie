// redux/cartSlice.js
import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    removeFromCart: (state, action) => {
      return state.filter(product => product.id !== action.payload);
    },
  },
});

export const {addProduct, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;
