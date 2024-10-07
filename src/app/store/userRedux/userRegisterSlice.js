import { createSlice } from '@reduxjs/toolkit';

export const initialUserValidationState={
  UserAuth: false,
  validMobileNumber:false,
  otp:null,
  otpVerified:false,
  loginVerified:false,
  userid:null,
  username:null,
  usermail:null,
  userPhoneNumber:null
}

const userRegisterSlice = createSlice({
  name: 'user',
  initialState: initialUserValidationState,
  reducers: { 
    saveUserDetails: (state, action) => {
      if (action.payload == "true" ) {
        state.UserAuth = true;
    }
    else{

        state.UserAuth=false;
    }

    },
  
  userMobileNumberValidation:(state,action)=>{
    if(action.payload.success){
      state.validMobileNumber=true;
      state.otp=action.payload.otp;
    }
    else
    state.validMobileNumber=false;
 
  },

  userOtpValidation:(state,action)=>{
    if(action.payload=="true")
      state.otpVerified=true;
    else
    state.otpVerified=false;
  },
  userLoginValidation:(state,action)=>{
   
    if(action.payload.auth=="true"){
      state.loginVerified=action.payload.auth;
      state.userid=action.payload.id;
      state.username=action.payload.name+action.payload.lname;
      state.usermail=action.payload.mail;
      state.userPhoneNumber=action.payload.phnnumber;
    }
    else{
    state.loginVerified=false;
    state.UserAuth=false;
    state.validMobileNumber=false;
    state.otpVerified=false;
    }
  }
 
},
});

export const { saveUserDetails,userMobileNumberValidation,userOtpValidation,userLoginValidation } = userRegisterSlice.actions;
export default userRegisterSlice.reducer;
