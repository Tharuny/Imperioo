import { createSlice } from '@reduxjs/toolkit';

const initialInvoiceState = {
  invoiceData:[],
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState: initialInvoiceState,
  reducers: { 
    postInvoiceDetails: (state, action) => {
    },

    getInvoiceDetails: (state, action) => {
      state.invoiceData=action.payload;
    },
  },
});

export const { postInvoiceDetails,getInvoiceDetails } = invoiceSlice.actions;
export default invoiceSlice.reducer;
