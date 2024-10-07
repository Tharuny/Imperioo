import axios from "axios"

// posting Subcategory data 
export const postProductData = async(productData) =>{
        return await axios.post(`/api/VendorAPIRoutes/Product`,productData);
}

export const getProductsData=async()=>{
        return await axios.get( `/api/VendorAPIRoutes/Product`);
}

export const updateProductsDataById=async(data)=>{
        return await axios.patch(`/api/VendorAPIRoutes/Product`,data);
}

export const deleteProductData=async(id)=>{
        return await axios.delete(`/api/VendorAPIRoutes/Product?key=${id}`);
}