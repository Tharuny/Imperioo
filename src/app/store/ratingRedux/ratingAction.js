import { getRatingData, postRatingData } from './ratingSlice';
import * as requestFromServer from './ratingCRUD';

export const postRating = (data) => async (dispatch) => {
    try {
        const response = await requestFromServer.postRatingDetails(data);
        // Dispatch the action with the response data
        dispatch(postRatingData(response.data));
    } catch (error) {
        console.error("Error in action:", error);
    }
};

export const getRating = (proid) => async (dispatch) => {
    try {
        const response = await requestFromServer.getRatingDetails(proid);
        // Dispatch the action with the response data
        dispatch(getRatingData(response));
    } catch (error) {
        console.error("Error in action:", error);
    }
};

