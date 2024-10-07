import { createSlice } from "@reduxjs/toolkit";

const initialCartState={
    cartData : []
}


const cartSlice = createSlice({
    name:'cartModified',
    initialState:initialCartState,
    reducers:{
        getCartProductsData : (state,action)=>{
            state.cartData=action.payload;
        }
    }
})

export const {getCartProductsData} = cartSlice.actions;
export default cartSlice.reducer;