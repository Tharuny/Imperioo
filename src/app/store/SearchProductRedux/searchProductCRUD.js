import axios from "axios";
export const getSearchProductCRUD = async(value)=>{
    const result = await axios.get(`/api/SearchProducts?key=${value}`);
    return result.data;
}