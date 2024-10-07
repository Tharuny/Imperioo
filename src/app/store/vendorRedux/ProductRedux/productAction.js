
import * as requestFromProductCRUD from './productCRUD' 
import { getVendorProduct } from './productSlice';

// category data object consists of category name and status; -$SAM
export const postProductFromVendor=(productData)=>async(dispatch)=>{
    // sending ProductData object to ProductCrud 
    try{
        const response = await requestFromProductCRUD.postProductData(productData);
        // sending category data from vendor side
        // dispatch(postVendorSubCategory(response.data));
    }
    catch(error)
    {
    }
}

// //HITTING GET CALL FOR CATEGORIES FOR VENDOR VIEW -$SAM
export const getProductFromVendor=()=>async(dispatch)=>{
    try{
        // fetching data from crud -> route.js
        const response = await requestFromProductCRUD.getProductsData();
        dispatch(getVendorProduct(response.data));
     
    }catch(error)
    {
        // if failed to fetch 
    }
}

// Updating Category by id  for changing name and status
export const updateProductById=(updateObject)=>async(dispatch)=>{
    try{
        const response=await requestFromProductCRUD.updateProductsDataById(updateObject);
        if(response.status==200)
        {
            const response = await requestFromProductCRUD.getProductsData();
            dispatch(getVendorProduct(response.data));
        }
    }catch(error)
    {
    }
}

// delete category by id 
export const deleteProductById=(id)=>async(dispatch)=>{
    try{
        const response=await requestFromProductCRUD.deleteProductData(id);
        if(response.status==200)
            {
                const response = await requestFromProductCRUD.getProductsData();
                dispatch(getVendorProduct(response.data));
            }
    }catch(error)
    {
    }
}