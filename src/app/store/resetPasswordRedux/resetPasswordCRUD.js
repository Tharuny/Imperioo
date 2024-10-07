import axios from 'axios';

export const getResetPasswordDetails = async (proid) => {
    try {
      const response = await axios.get(`/api/email-already-exist?phone=${proid}`);
      return response.data;
    } catch (error) {
      console.error('Error getting reset password details:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  export const updatePasswordDetails = async (proid) => {
    try {
        const {newPassword,phoneNumber} = proid;
      const response = await axios.patch(`/api/email-already-exist?key=updatepassword?newpassword=${newPassword}?number=${phoneNumber}`);
      console.log("kk",response.data);
      return response.data;
    } catch (error) {
      console.error('Error getting reset password details:', error.response ? error.response.data : error.message);
      throw error;
    }
  };