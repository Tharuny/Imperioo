import { createSlice } from "@reduxjs/toolkit";

const initialCategoryState={
    categoryPostMessage:"",
    categoryList:[],
    categoryUpdateMessage:"",
    categoryDeleteMessage:""
}

const vendorCategorySlice = createSlice({
    name:'vendorCategory',
    initialState:initialCategoryState,
    reducers:{
        postVendorCategory : (state,action)=>{
            state.categoryPostMessage=action.payload;
        },
        getVendorCategory: (state,action)=>{
            state.categoryList=action.payload;
        },
        updateVendorCategory:(state,action)=>{
            state.categoryUpdateMessage=action.payload;
        },
        deleteVendorCategory:(state,action)=>{
            state.categoryUpdateMessage=action.payload;
        }
    }
})

export const {postVendorCategory,getVendorCategory,updateVendorCategory,deleteVendorCategory} = vendorCategorySlice.actions;
export default vendorCategorySlice.reducer;