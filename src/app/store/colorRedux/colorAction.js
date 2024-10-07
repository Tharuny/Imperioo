import * as requestFromServer from './colorCRUD';
import { postColorDetails,getColorDetails } from './colorSlice'; // Ensure correct import

export const postColor = (data) => async (dispatch) => {
    try {
        const response = await requestFromServer.postColorData(data);
        // Dispatch the action with the response data
        dispatch(postColorDetails(response));
    } catch (error) {
        console.error("Error in action:", error);
    }
};

export const getColor = () => async (dispatch) => {
    try {
        const response = await requestFromServer.getColorData();
        // Dispatch the action with the response data
        dispatch(getColorDetails(response.data.data));
    } catch (error){
        console.error("Error in action:", error);
    }
};