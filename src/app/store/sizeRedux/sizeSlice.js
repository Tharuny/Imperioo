import { createSlice } from "@reduxjs/toolkit";

const inintialSizes={
    sizeDetails:[],
}

const sizeSlice= createSlice({
    name: 'size',
    initialState: inintialSizes,
    reducers: {
    postSizeData : (state,action) => {
    },
    getSizeData : (state,action) => {
        state.sizeDetails = action.payload;
    },
    deleteSizeData : (state,action) => {
    }   
}
})

export const {postSizeData,getSizeData,deleteSizeData} = sizeSlice.actions;
export default sizeSlice.reducer;