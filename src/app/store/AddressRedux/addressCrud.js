import axios from 'axios';

export const postAddressDetails = async (data) => {
  try {
    const response = await axios.post('/api/Address', data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAddressDetails = async (id) => {
  try {
    const response = await axios.get(`/api/Address?key=${id.id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAddressDetails = async (id) => {
  try {
    const response = await axios.delete('/api/Address', { data: { id } });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const updateAddressDetails = async (data) => {
  try {
    const response = await axios.put('/api/Address', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

