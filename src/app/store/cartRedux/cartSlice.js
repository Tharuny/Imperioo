import { createSlice } from '@reduxjs/toolkit';

const initialCartState = {
  cartData:[],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: { 
    postCartDetails: (state, action) => {
    },

    getCartDetails: (state, action) => {
      state.cartData=action.payload;
    },
  },
});

export const { postCartDetails,getCartDetails } = cartSlice.actions;
export default cartSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import * as requestFromServer from './wishlistCrud';

// export const addToWishlist = createAsyncThunk(
//   'wishlist/addToWishlist',
//   async (product, { rejectWithValue }) => {
//     try {
//       const response = await requestFromServer.saveProductToWishlist(product);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response ? error.response.data : error.message);
//     }
//   }
// );

// export const removeFromWishlist = createAsyncThunk(
//   'wishlist/removeFromWishlist',
//   async (product, { rejectWithValue }) => {
//     try {
//       const response = await requestFromServer.deleteProductFromWishlist(product);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response ? error.response.data : error.message);
//     }
//   }
// );

// const wishlistSlice = createSlice({
//   name: 'wishlist',
//   initialState: {
//     items: [],
//     status: 'idle',
//     error: null
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(addToWishlist.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(addToWishlist.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.items.push(action.payload);
//       })
//       .addCase(addToWishlist.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(removeFromWishlist.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(removeFromWishlist.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.items = state.items.filter(item => item.productId !== action.payload.productId);
//       })
//       .addCase(removeFromWishlist.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   }
// });

// export default wishlistSlice.reducer;
