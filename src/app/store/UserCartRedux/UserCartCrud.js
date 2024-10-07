import axios from "axios";

export const addProductToCart=async(productData)=>{
    return await axios.post('/api/userCart',productData);
}

export const getCartProducts=async(userid)=>{
    return await axios.get(`/api/userCart?${userid}`);
}
