import axios from 'axios';

export const getProductsBySubCategories = async (subCategoryId) => {
    try {
      const response = await axios.get(`/api/Products?subCategoryId=${subCategoryId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting ratingss details:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  export const getAllProducts = async (keyValue) => {
    try {
      const response = await axios.get(`/api/data?key=${keyValue}`);
      return response.data;
    } catch (error) {
      console.error('Error getting ratingss details:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

