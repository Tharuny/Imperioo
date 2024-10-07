import { createSlice } from "@reduxjs/toolkit";
 
const inintialReviews={
    reviewDetails:[],
}
 
const reviewSlice= createSlice({
    name: 'review',
    initialState: inintialReviews,
    reducers: {
    postReviewData : (state,action) => {
    },
    getReviewData : (state,action) => {
        state.reviewDetails = action.payload;
        console.log(action.payload,"reviewgetSTate");
    },
    deleteReviewData : (state, action) =>{
    }
}
})
 
export const {postReviewData,getReviewData,deleteReviewData} = reviewSlice.actions;
export default reviewSlice.reducer;