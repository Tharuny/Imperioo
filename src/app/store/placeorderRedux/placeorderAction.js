import { getCartProducts } from '../UserCartRedux/UserCartAction';
import * as requestFromServer from './placeorderCRUD';
import { postPlaceorderDetails} from './placeorderSlice'; // Ensure correct import

export const postOrder = (data) => async (dispatch) => {
    try {
        const response = await requestFromServer.postPlaceorder(data);
        // Dispatch the action with the response data
        if(response.status==200)
        {
            dispatch(getCartProducts(data.userid));
        }
    } catch (error) {
        console.error("Error in action:", error);
    }
};

export const deleteOrder = (userIdProductId) => async (dispatch) => {
    try {
        const response = await requestFromServer.deletePlaceorder(userIdProductId);
        // Dispatch the action with the response data
        console.log("recieved1");
        if(response.status==200)
        {
            console.log("recieved");
            dispatch(getCartProducts(userIdProductId.user));
        }
    } catch (error) {
        console.error("Error in action:", error);
    }
};