import axios from 'axios';

export const postCategoryData = async (data) => {
    return await axios.post('/api/Category', data );
};

export const getCategoryData = async (data) => {
        return await axios.get('/api/Category?key2=getcategory');
    };

export const deleteCategoryData = async (id1) => {
            return await axios.put(`/api/Category?key=categorystatus?${id1}`);
    };
      
export const editCategoryData = async (editData,id) => {
            return await axios.put(`/api/Category?${editData}=${id}`);
    };