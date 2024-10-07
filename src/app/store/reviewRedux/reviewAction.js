import { getReviewData, postReviewData } from './reviewSlice';
import { getRatingData } from '../ratingRedux/ratingSlice';
import * as requestFromServer from './reviewCRUD';
import * as requestFromRatingServer from '../ratingRedux/ratingCRUD'
 
 
export const postReview = (data) => async (dispatch) => {
    try {
        let sum=0;
        const response = await requestFromServer.postReviewDetails(data);
        // Dispatch the action with the response data
        if(response.success)
        {
            // after posting review calculating overal rating for particualr product
            const response1 = await requestFromServer.getReviewDetails(data.proid);
            for(let i=0;i<response1.length;i++)
            {
                sum=sum+response1[i].rating;
            }
            dispatch(getReviewData(response1));
            const overallrating = await requestFromRatingServer.postRatingDetails({proid:data.proid,overallRating:Math.ceil(sum/response1.length)});
            if(overallrating.success===true)
            {
                const response = await requestFromRatingServer.getRatingDetails(data.proid);
                dispatch(getRatingData(response));
            }
 
 
 
        }
        
    } catch (error) {
        console.error("Error in action:", error);
    }
};
 
export const getReview = (productid) => async (dispatch) => {
    try {
        const response = await requestFromServer.getReviewDetails(productid);
        // Dispatch the action with the response data
        dispatch(getReviewData(response));
    } catch (error) {
        console.error("Error in action:", error);
    }
};
 
export const deleteReviewByID = (data) => async (dispatch) => {
    console.log(data, "swahaaaa");
    try {
      const deleteResponse = await requestFromServer.deleteReviewDetails(data);
      console.log(deleteResponse, "idhe vahindhi");
  
      if (deleteResponse === 'Deleted successfully') {
 
        console.log("jayaram")
        const getResponse = await requestFromServer.getReviewDetails(data.productid);
        console.log(getResponse,"object response")
        dispatch(getReviewData(getResponse));
        
        return { status: 'success', message: 'Review deleted successfully' };
      } else {
        console.log("Delete failed with status:", deleteResponse.status);
      }
    } catch (error) {
      return { status: 'error', message: 'An error occurred while deleting the review' };
    }
  };