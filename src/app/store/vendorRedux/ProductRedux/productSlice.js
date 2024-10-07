import { createSlice } from "@reduxjs/toolkit";

const initialProductState={
    productPostMessage:"",
    productList:[],
    productUpdateMessage:"",
    productDeleteMessage:""
}

const vendorProductSlice = createSlice({
    name:'vendorProduct',
    initialState:initialProductState,
    reducers:{
        postVendorProduct : (state,action)=>{
            state.productPostMessage=action.payload;
        },
        getVendorProduct: (state,action)=>{
            state.productList=action.payload;
        },
        updateVendorProduct:(state,action)=>{
            state.productUpdateMessage=action.payload;
        },
        deleteVendorProduct:(state,action)=>{
            state.productDeleteMessage=action.payload;
        }
    }
})

export const {postVendorProduct,getVendorProduct,updateVendorProduct,deleteVendorProduct} = vendorProductSlice.actions;
export default vendorProductSlice.reducer;