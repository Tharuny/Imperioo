import axios from "axios"

// posting Subcategory data 
export const postSubCategoryData = async(SubCategoryData) =>{
        return await axios.post(`/api/VendorAPIRoutes/SubCategory`,SubCategoryData);
}

// getting Subcategories data based on category key
export const getSubCategoriesData=async(categoryKey)=>{
    return await axios.get(`/api/VendorAPIRoutes/SubCategory?key=${categoryKey}`);
}

// getting all Subcategories data 
export const getAllSubCategoriesData=async()=>{
    return await axios.get(`/api/VendorAPIRoutes/SubCategory?key=subcategories`);
}

// updating categories data 
export const updateSubCategoriesData=async(updateObject)=>{
    return await axios.patch(`/api/VendorAPIRoutes/SubCategory`,updateObject);
}

// delete categories By id
export const deleteCategoriesData=async(deleteObject)=>{
    return await axios.delete(`/api/VendorAPIRoutes/SubCategory?id=${deleteObject.id}`);
}