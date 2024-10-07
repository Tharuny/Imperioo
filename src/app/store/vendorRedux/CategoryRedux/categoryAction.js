import * as requestFromCategoryCRUD from './categoryCRUD';
import { postVendorCategory,getVendorCategory,updateVendorCategory,deleteVendorCategory } from './categorySlice';

// category data object consists of category name and status; -$SAM
export const postCategoryFromVendor=(CategoryData)=>async(dispatch)=>{
    // sending CategoryData object to categoryCrud 
    try{
        const response = await requestFromCategoryCRUD.postCategoryData(CategoryData);
        // sending category data from vendor side
        dispatch(postVendorCategory(response.data));
    }
    catch(error)
    {
    }
}

//HITTING GET CALL FOR CATEGORIES FOR VENDOR VIEW -$SAM
export const getCategoriesFromVendor=()=>async(dispatch)=>{
    try{
        // fetching data from crud -> route.js
        const response = await requestFromCategoryCRUD.getCategoriesData();
        dispatch(getVendorCategory(response.data));
    }catch(error)
    {
        // if failed to fetch 
    }
}

// Updating Category by id  for changing name and status
export const updateCategoryById=(updateObject)=>async(dispatch)=>{
    try{
        const response=await requestFromCategoryCRUD.updateCategoriesData(updateObject);
        dispatch(updateVendorCategory(response.data));
        if(response.status==200)
        {
            const response = await requestFromCategoryCRUD.getCategoriesData();
            dispatch(getVendorCategory(response.data));
        }
    }catch(error)
    {
    }
}

// delete category by id 
export const deleteCategoryById = (deleteObject) => async (dispatch) => {
    try {
      const response = await requestFromCategoryCRUD.deleteCategoriesData(deleteObject);
      dispatch(deleteVendorCategory(response.data));
      console.log(response.data);
      
      if (response.status === 200) {
        const categoryResponse = await requestFromCategoryCRUD.getCategoriesData();
        dispatch(getVendorCategory(categoryResponse.data));
      }
      return { status: 'success', data: response.data };
    } catch (error) {
      console.error('Error deleting category:', error);
      return { status: 'error', message: error.message };
    }
  };
  
