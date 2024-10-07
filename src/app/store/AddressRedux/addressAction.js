import * as requestFromServer from './addressCrud';
import {postAddressData , getAddressData, deleteAddressData, updateAddressData} from './addressSlice';

export const postAddress = (data) => async (dispatch) => {
    try {
        const response = await requestFromServer.postAddressDetails(data);
        // Dispatch the action with the response data
        if(response.status==200)
        {
            const id={id:data.id}
            const response = await requestFromServer.getAddressDetails(id);
            dispatch(getAddressData(response)); 
        }
    } catch (error) {
    }
};

export const getAddress = (id) => async (dispatch) => {
  
    try {
        const response = await requestFromServer.getAddressDetails(id);
        // Dispatch the action with the response data
        dispatch(getAddressData(response));
    } catch (error) {
    }
};

export const deleteAddress = (data) => async (dispatch) => {
    try {
        const response=await requestFromServer.deleteAddressDetails(data.addressid);
        if(response.success==true)
        {
            const uid={id:data.uid}
            const response = await requestFromServer.getAddressDetails(uid);
            dispatch(getAddressData(response));
        }
    } catch (error) {
    }
};


export const updateAddress = (data) => async (dispatch) => {
    try {
      const response = await requestFromServer.updateAddressDetails(data);
      if(response.success==true)
        {
            const uid={id:data.user_id}
            const response = await requestFromServer.getAddressDetails(uid);
            dispatch(getAddressData(response));
        }
    } catch (error) {
    }
  };