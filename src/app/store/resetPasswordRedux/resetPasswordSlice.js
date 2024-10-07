import { createSlice } from "@reduxjs/toolkit";

const initialResetPassword={
    resetPasswordDetails:null
}

const resetPasswordSlice= createSlice({
    name: 'resetPassword',
    initialState: initialResetPassword,
    reducers: {
    getResetPasswordData : (state,action) => {
        state.resetPasswordDetails = action.payload;
    } ,
    updatePasswordData : (state,action) => {
        
    }
}
})

export const {getResetPasswordData,updatePasswordData} = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;