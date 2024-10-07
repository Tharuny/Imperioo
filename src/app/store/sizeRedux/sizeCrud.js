import axios from 'axios';

export const postSizeDetails = async (data) => {
  try {
    const response = await axios.post('/api/postSize', data);
    return response.data;
  } catch (error) {
    console.error('Error posting size details:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getSizeDetails = async (params) => {
  try {
    const response = await axios.get('/api/postSize', { params });
    return response.data;
  } catch (error) {
    console.error('Error getting size details:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteSizeDetails = async (data) => {
  try {
    const response = await axios.delete(`/api/postSize?id=${data}`, data);
    return response.data;
  } catch (error) {
    console.error('Error deleting size details:', error.response ? error.response.data : error.message);
    throw error;
  }
};
