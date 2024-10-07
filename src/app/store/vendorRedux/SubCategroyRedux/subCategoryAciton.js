import { update } from 'lodash';
import * as requestFromSubCategoryCRUD from './subCategoryCRUD';
import {postVendorSubCategory,getVendorSubCategory,updateVendorSubCategory,deleteVendorSubCategory} from './subCategorySlice'
// category data object consists of category name and status; -$SAM
export const postSubCategoryFromVendor=(SubCategoryData)=>async(dispatch)=>{
    // sending CategoryData object to categoryCrud 
    try{
        const response = await requestFromSubCategoryCRUD.postSubCategoryData(SubCategoryData);
        // sending category data from vendor side
        dispatch(postVendorSubCategory(response.data));
    }
    catch(error)
    {
    }
}

//HITTING GET CALL FOR subCATEGORIES based on caytegory FOR VENDOR VIEW  -$SAM
export const getSubCategoriesFromVendor=(categoryKey)=>async(dispatch)=>{
    try{
        // fetching data from crud -> route.js
        const response = await requestFromSubCategoryCRUD.getSubCategoriesData(categoryKey);
        dispatch(getVendorSubCategory(response.data));
     
    }catch(error)
    {
        // if failed to fetch 
    }
}

//HITTING GET CALL FOR all subCATEGORIES FOR VENDOR VIEW  -$SAM
export const getAllSubCategoriesFromVendor=()=>async(dispatch)=>{
    try{
        // fetching data from crud -> route.js
        const response = await requestFromSubCategoryCRUD.getAllSubCategoriesData();
        dispatch(getVendorSubCategory(response.data));
     
    }catch(error)
    {
        // if failed to fetch 
    }
}

// Updating Category by id  for changing name and status
export const updateSubCategoryById=(updateObject)=>async(dispatch)=>{
    try{
        const response=await requestFromSubCategoryCRUD.updateSubCategoriesData(updateObject);
        dispatch(updateVendorSubCategory(response.data));
        const responseData = await requestFromSubCategoryCRUD.getAllSubCategoriesData();
        dispatch(getVendorSubCategory(responseData.data));
    }catch(error)
    {
    }
}

// delete category by id 
export const deleteSubCategoryById=(deleteObject)=>async(dispatch)=>{
    try{
        const response=await requestFromSubCategoryCRUD.deleteCategoriesData(deleteObject);
        dispatch(deleteVendorSubCategory(response.data));
        const responseData = await requestFromSubCategoryCRUD.getAllSubCategoriesData();
        dispatch(getVendorSubCategory(responseData.data));
    }catch(error)
    {
    }
}