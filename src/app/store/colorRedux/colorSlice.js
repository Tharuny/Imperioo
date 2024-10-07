import { createSlice } from '@reduxjs/toolkit';

const initialColorState = {
  colorData:[],
};

const colorSlice = createSlice({
  name: 'color',
  initialState: initialColorState,
  reducers: { 
    postColorDetails: (state, action) => {
    },

    getColorDetails: (state, action) => {
      state.colorData=action.payload;
    },
  },
});

export const { postColorDetails,getColorDetails } = colorSlice.actions;
export default colorSlice.reducer;
