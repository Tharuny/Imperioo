import { createSlice } from "@reduxjs/toolkit";

const inintialRatings={
    ratingDetails:0,
}

const ratingSlice= createSlice({
    name: 'rating',
    initialState: inintialRatings,
    reducers: {
    postRatingData : (state,action) => {
    },
    getRatingData : (state,action) => {
        state.ratingDetails = action.payload;
    } 
}
})

export const {postRatingData,getRatingData} = ratingSlice.actions;
export default ratingSlice.reducer;