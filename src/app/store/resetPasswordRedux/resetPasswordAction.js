
import * as requestFromServer from './resetPasswordCRUD';
import { getResetPasswordData, updatePasswordData } from './resetPasswordSlice';


export const getResetPassword = (proid) => async (dispatch) => {
    try {
      
        const response = await requestFromServer.getResetPasswordDetails(proid);
        const result = response[0].phonenumber;
        // Dispatch the action with the response data
          dispatch(getResetPasswordData(result));
          return result;
    } catch (error) {
        console.error("Error in action:", error);
    }
};

export const updatePassword = (proid) => async (dispatch) => {
    try {
        const response = await requestFromServer.updatePasswordDetails(proid);
        console.log("ooo",response)
        // Dispatch the action with the response data
          dispatch(updatePasswordData(response));
    } catch (error) {
        console.error("Error in action:", error);
    }
};

