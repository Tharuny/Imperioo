import * as requestFromUserCartCrud from './UserCartCrud'
import { getCartProductsData } from './UserCartSlice';
export const addProductToCart = (productData) => async (dispatch) => {
    try {
        const response = await requestFromUserCartCrud.addProductToCart(productData);
        if (response.status == 200) {
            console.log("hitted");
            const response = await requestFromUserCartCrud.getCartProducts(productData.userid);
            console.log(response,"check");
            dispatch(getCartProductsData(response.data));
        }
    } catch (error) {
    }
}

export const getCartProducts = (userid) => async (dispatch) => {
    try {
        const response = await requestFromUserCartCrud.getCartProducts(userid);
        dispatch(getCartProductsData(response.data));
    } catch (error) {
    }
}