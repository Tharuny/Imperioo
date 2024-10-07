import * as requestFromServer from './productCRUD';
import { postProductDetails,getProductDetails } from './productSlice'; // Ensure correct import

export const postProduct = (data) => async (dispatch) => {
    try {
        const response = await requestFromServer.postProductData(data);
        dispatch(postProductDetails(response.config.data));
    } catch (error) {
    }
};

export const getProduct = () => async (dispatch) => {
    try {
        const response = await requestFromServer.getProductData();
        // Dispatch the action with the response data
        dispatch(getProductDetails(response.data));
    } catch (error) {
    }
};

export const getProductById=(id)=>async (dispatch) => {
    try {
        const response = await requestFromServer.getProductDataById(id);
        // Dispatch the action with the response data
        dispatch(getProductDetails(response.data));
    } catch (error) {
    }
}

