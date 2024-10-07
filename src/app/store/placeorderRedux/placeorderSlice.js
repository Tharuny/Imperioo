import { createSlice } from '@reduxjs/toolkit';

const initialPlaceorderstate = {
  PlaceorderData:[],
};

const placeorderSlice = createSlice({
  name: 'placeorder',
  initialState: initialPlaceorderstate,
  reducers: { 
    postPlaceorderDetails: (state, action) => {
    },

    // getColorDetails: (state, action) => {
    //   state.colorData=action.payload;
    // },
  },
});

export const { postPlaceorderDetails } =placeorderSlice.actions;
export default placeorderSlice.reducer;
