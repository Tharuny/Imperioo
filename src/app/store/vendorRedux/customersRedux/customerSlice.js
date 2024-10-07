import { createSlice } from "@reduxjs/toolkit";

const initialCustomersState={
    customersList:[]
}

const vendorCustomerSlice = createSlice({
    name:'vendorSideCustomers',
    initialState:initialCustomersState,
    reducers:{
        getVendorCustomers: (state,action)=>{
            state.customersList=action.payload;
        }
    }
})

export const {getVendorCustomers} = vendorCustomerSlice.actions;
export default vendorCustomerSlice.reducer;