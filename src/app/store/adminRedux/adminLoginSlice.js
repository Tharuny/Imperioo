import { createSlice } from "@reduxjs/toolkit";

export const initialAdminLoginState = {
    AdminAuth: false,
    msg:""
};

const adminLoginAuthSlice = createSlice({
    name: 'admin',
    initialState: initialAdminLoginState,
    reducers: {
        adminLoginAuthentication: (state, action) => {
            // const {value} =action.payload;
            if (action.payload.bool == "true" ) {
                state.AdminAuth = true;
                state.msg=action.payload.msg;
            }
            else{

                state.AdminAuth=false;
            }
        },
    },
});

export const { adminLoginAuthentication } = adminLoginAuthSlice.actions;
export default adminLoginAuthSlice.reducer;
