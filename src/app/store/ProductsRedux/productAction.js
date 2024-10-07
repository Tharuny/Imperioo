import * as requestFromServer from '../ProductsRedux/productcrud';
import { clearSearchProducts } from '../SearchProductRedux/searchProductAction';
import { getProductsBySubCategory,getAllCategoriesProducts} from './productslice';

export const getProducts = (subCategoryId) => async (dispatch) => {
    dispatch(clearSearchProducts());
   
    try {
        const response = await requestFromServer.getProductsBySubCategories(subCategoryId);
        // Dispatch the action with the response data
        dispatch(getProductsBySubCategory(response));
    } catch (error) {
        console.error("Error in action:", error);
    }
};

export const getAllProducts = (key) => async (dispatch) => {
    dispatch(clearSearchProducts());
    try {
        const response = await requestFromServer.getAllProducts(key);
        // Dispatch the action with the response data
        dispatch(getAllCategoriesProducts(response));
    } catch (error) {
        console.error("Error in action:", error);
    }
};
