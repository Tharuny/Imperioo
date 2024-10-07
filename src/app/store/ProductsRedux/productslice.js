import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "./productcrud";

const inintialProducts={
    productsBasedOnSubcategories:[]
}

const productBySubCategorySlice= createSlice({
    name: 'productBySubCategory',
    initialState: inintialProducts,
    reducers: {
    getProductsBySubCategory : (state,action) => {
        state.productsBasedOnSubcategories = action.payload;
    } ,
    getAllCategoriesProducts:(state,action)=>{
        state.productsBasedOnSubcategories=action.payload;
    }
}
})

export const {getProductsBySubCategory,getAllCategoriesProducts} = productBySubCategorySlice.actions;
export default productBySubCategorySlice.reducer;