import { createSlice } from "@reduxjs/toolkit";

const inintialsubcategories={
    subcatgeoryDetails:[],
    subcategoryUpdatedMessage : ''
}

const subcategorySlice= createSlice({
    name: 'subcategory',
    initialState: inintialsubcategories,
    reducers: {
    postSubcategoryData : (state,action) => {
    },
    getSubcategoryData : (state,action) => {
        state.subcatgeoryDetails = action.payload;
    },
    deleteSubcategoryData : (state,action) => {
    },
    putSubcategoryData : (state,action) => {
        state.subcategoryUpdatedMessage = action.payload;
    }   
}
})

export const {postSubcategoryData,getSubcategoryData,deleteSubcategoryData,putSubcategoryData} = subcategorySlice.actions;
export default subcategorySlice.reducer;