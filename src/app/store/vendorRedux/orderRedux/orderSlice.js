import { createSlice } from "@reduxjs/toolkit";

const initialOrderState={
    ordersList:[],
}

const vendorOrdersSlice = createSlice({
    name:'vendorOrders',
    initialState:initialOrderState,
    reducers:{
        getVendorOrders: (state,action)=>{
            state.ordersList=action.payload;
        }
    }
})

export const {getVendorOrders} = vendorOrdersSlice.actions;
export default vendorOrdersSlice.reducer;