import axios from "axios"

// posting category data 
export const postCategoryData = async(CategoryData) =>{
        return await axios.post(`/api/VendorAPIRoutes/Category`,CategoryData);
}

// getting categories data
export const getCategoriesData=async()=>{
        return await axios.get(`/api/VendorAPIRoutes/Category`);
}

// updating categories data 
export const updateCategoriesData=async(updateObject)=>{
        return await axios.patch(`/api/VendorAPIRoutes/Category`,updateObject);
}

// delete categories By id
export const deleteCategoriesData=async(deleteObject)=>{
        return await axios.delete(`/api/VendorAPIRoutes/Category?id=${deleteObject.id}`,deleteObject);
}