import * as requestFromServer from './subcategoryCRUD';
import {postSubcategoryData , getSubcategoryData, deleteSubcategoryData, putSubcategoryData} from './subcategorySlice';

export const postSubcategory = (data) => async (dispatch) => {
    try {
        const response = await requestFromServer.postSubcategoryDetails(data);
        // Dispatch the action with the response data
        dispatch(postSubcategoryData(response.data));
    } catch (error) {
        console.error("Error in action:", error);
    }
};

export const getSubcategory = () => async (dispatch) => {
    try {
        const response = await requestFromServer.getSubcategoryDetails();
        // Dispatch the action with the response data
        dispatch(getSubcategoryData(response));
    } catch (error) {
    }
};

export const putSubcategory = (data) => async (dispatch) => {
    try {
        const response = await requestFromServer.putSubcategoryDetails(data);
        // Dispatch the action with the response data
        dispatch(putSubcategoryData(response));
    } catch (error) {
    }
};

export const deleteSubcategory = (data) => async (dispatch) => {
    try {
        const response = await requestFromServer.deleteSubcategoryDetails(data);
        // Dispatch the action with the response data
        dispatch(deleteSizeData(response.id));
    } catch (error) {
    }
};