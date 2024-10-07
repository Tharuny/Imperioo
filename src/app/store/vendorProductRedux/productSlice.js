import { createSlice } from '@reduxjs/toolkit';

const initialProductState = {
  productData:[],
};

const productSlice = createSlice({
  name: 'product',
  initialState: initialProductState,
  reducers: { 
    postProductDetails: (state, action) => {
      

    },

    getProductDetails: (state, action) => {
      state.productData=action.payload;
    },
  },
});

export const { postProductDetails,getProductDetails } = productSlice.actions;
export default productSlice.reducer;
