import * as requestFromServer from "./searchProductCRUD";
import { searchProduct,clearsearchProduct } from "./searchProductSlice";

export const getSearchProducts = (value)=> async (dispatch) =>{
    try{
        const response = await requestFromServer.getSearchProductCRUD(value);
        dispatch(searchProduct(response));
    }
    catch(error){
        console.error("Error in action:", error);
    }
}

export const clearSearchProducts = ()=> async (dispatch) =>{
    try{
        // const response = await requestFromServer.getSearchProductCRUD(value);
        dispatch(clearsearchProduct());
    }
    catch(error){
        console.error("Error in action:", error);
    }
}