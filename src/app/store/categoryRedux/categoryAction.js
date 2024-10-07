import * as requestFromServer from './categoryCRUD';
import { postCategoryDetails,getCategoryDetails,deleteCategoryDetails,editCategoryDetails } from './categorySlice'; // Ensure correct import

export const postCategory = (data) => async (dispatch) => {
    try {
        const response = await requestFromServer.postCategoryData(data);
        // Dispatch the action with the response data
        dispatch(postCategoryDetails(response));
    } catch (error) {
        console.error("Error in action:", error);
    }
};

export const getCategory = () => async (dispatch) => {
    try {
        const response = await requestFromServer.getCategoryData();
        // Dispatch the action with the response data
        dispatch(getCategoryDetails(response.data));
    } catch (error){
        console.error("Error in action:", error);
    }
};

export const deleteCategory = (data) => async (dispatch) => {

    try {
        const response = await requestFromServer.deleteCategoryData(data);
        // Dispatch the action with the response data
        dispatch(deleteCategoryDetails(response.data));
    } catch (error){
        console.error("Error in action:", error);
    }
};

export const editCategory = (editData,id) => async (dispatch) => {
    try {
        const response = await requestFromServer.editCategoryData(editData,id);
        // Dispatch the action with the response data
        dispatch(editCategoryDetails(response.data));
    } catch (error){
        console.error("Error in action:", error);
    }
};