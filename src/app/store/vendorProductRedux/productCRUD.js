import axios from 'axios';

export const postProductData = async (data) => {
    return await axios.post('/api/Product-form', data );
};

export const getProductData = async () => {
    const data = await axios.get('/api/vendorproductlist');
    return data;
};

export const getProductDataById=async (id)=>{
    const data = await axios.get(`/api/product?key=${id}`);
    return data;
}

