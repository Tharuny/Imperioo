// app/store/userRedux/userCRUD.js (or equivalent file)
// Adjust import path as needed
import axios from "axios";
export const saveUser = async (userData) =>  {
    // Perform async operations here (e.g., fetch API call)
    return await axios.post('/api/userRegister', userData);
};

export const verifyMobileNumber=async (mobileNumber)=>{
    return await axios.post('/api/sendOTP',mobileNumber);
}

export const verifyOtp=async (numberwithotp)=>{
    return await axios.post('/api/verifyOTP',numberwithotp)
}

export const loginValidation=async (data)=>{
    return await axios.post('/api/userLogin',data)
}
