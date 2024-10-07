import * as requestFromServer from "./cartCRUD";
import { postCartDetails, getCartDetails } from "./cartSlice";

export const addProductToCart = (data) => async (dispatch) => {
  try {
    const response = await requestFromServer.addProduct(data);
    if(response.data==1){
    }
    dispatch(postCartDetails(response.data));
  } catch (error) {
  }
};
// New action to check if a product is in the wishlist
export const getProductInCart = (userId) => async (dispatch) => {
  try {
    const response = await requestFromServer.getProduct(userId);
    dispatch(getCartDetails(response.data));
  } catch (error) {
    return false;
  }
};

export const removeProductFromCart = (productData) => async (dispatch) => {
  try {
    const response = await requestFromServer.removeProduct(productData);
    dispatch(removeFromCart(response.data));
  } catch (error) {
  }
};
