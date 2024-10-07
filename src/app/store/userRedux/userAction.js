
import * as requestFromServer from './userCRUD';
import { saveUserDetails,userMobileNumberValidation,userOtpValidation,userLoginValidation} from './userRegisterSlice';

export const userRegister = (userData) => async (dispatch) => {
  try {
    const response = await requestFromServer.saveUser(userData);
    const { data } = response;
    dispatch(saveUserDetails(data));
  } catch (error) {
    
  }
};

export const mobileValidation=(mobileNumber)=>async (dispatch)=>{
  try{
    const response=await requestFromServer.verifyMobileNumber(mobileNumber);
    dispatch(userMobileNumberValidation(response.data));
  }
  catch(error){
  }
}
  export const otpVerification=(numberwithotp)=>async (dispatch)=>{
    try{
      const response=await requestFromServer.verifyOtp(numberwithotp);
      dispatch(userOtpValidation(response.data))
      return response.data;
    }
    catch{
    }
  }

  export const loginValidation=(data)=>async (dispatch)=>{
    try{
      const response=await requestFromServer.loginValidation(data);
      dispatch(userLoginValidation(response.data));
    }
    catch(error){
    }
  }

  export const userLogout=()=>async (dispatch)=>{
    dispatch(userLoginValidation("false"))
  }

