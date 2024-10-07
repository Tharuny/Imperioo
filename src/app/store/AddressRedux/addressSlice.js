import { createSlice } from "@reduxjs/toolkit";

const inintialUserAddress={
    addressDetails:[],
}

const addressSlice= createSlice({
    name: 'address',
    initialState: inintialUserAddress,
    reducers: {
    postAddressData : (state,action) => {
       
    },
    getAddressData : (state,action) => {
        state.addressDetails = action.payload;
    },   
    deleteAddressData: (state, action) => {
    }, 
    updateAddressData: (state, action) => {
      }
}
});

export const {postAddressData, getAddressData, deleteAddressData, updateAddressData} = addressSlice.actions;
export default addressSlice.reducer;