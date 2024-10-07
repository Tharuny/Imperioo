import * as requestFromServer from "./wishlistCrud";
import { postWishlistDetails, getWishlistDetails ,updateWishlistAction} from "./wishlistSlice";

export const addProductToWishlist = (data) => async (dispatch) => {
  try {
    const response = await requestFromServer.addProduct(data);
    if (response.status == 201||response.status==200) {
      const response = await requestFromServer.getProduct(data.userId);
    dispatch(getWishlistDetails(response.data));
    }
    // dispatch(postWishlistDetails(response.data));

  } catch (error) {
  }
};
// New action to check if a product is in the wishlist
export const getProductInWishlist = (userId) => async (dispatch) => {
  try {
    const response = await requestFromServer.getProduct(userId);
    dispatch(getWishlistDetails(response.data));
  } catch (error) {
    return false;
  }
};

export const clearWishlistData=()=>async (dispatch)=>{
  dispatch(getWishlistDetails([]))
}

export const removeProductFromWishlist =
  (productId, userId) => async (dispatch) => {
    try {
      const response = await requestFromServer.removeProduct(productId, userId);
      if(response.status === 200){
        const response = await requestFromServer.getProduct(userId);
        dispatch(getWishlistDetails(response.data));
      }
    } catch (error) {
    }
  };

  
