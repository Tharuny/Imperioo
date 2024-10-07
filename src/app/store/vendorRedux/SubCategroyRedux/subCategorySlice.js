import { createSlice } from "@reduxjs/toolkit";

const initialSubCategoryState={
    subcategoryPostMessage:"",
    subcategoryList:[],
    subcategoryUpdateMessage:"",
    subcategoryDeleteMessage:""
}

const vendorSubCategorySlice = createSlice({
    name:'vendorSubCategory',
    initialState:initialSubCategoryState,
    reducers:{
        postVendorSubCategory : (state,action)=>{
            state.subcategoryPostMessage=action.payload;
        },
        getVendorSubCategory: (state,action)=>{
            state.subcategoryList=action.payload;
        },
        updateVendorSubCategory:(state,action)=>{
            state.subcategoryUpdateMessage=action.payload;
        },
        deleteVendorSubCategory:(state,action)=>{
            state.subcategoryUpdateMessage=action.payload;
        }
    }
})

export const {postVendorSubCategory,getVendorSubCategory,updateVendorSubCategory,deleteVendorSubCategory} = vendorSubCategorySlice.actions;
export default vendorSubCategorySlice.reducer;