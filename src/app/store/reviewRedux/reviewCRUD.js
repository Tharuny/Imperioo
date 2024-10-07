import axios from 'axios';
 
export const postReviewDetails = async (data) => {
  try {
    const response = await axios.post('/api/reviews', data);
    return response.data;
  } catch (error) {
    console.error('Error posting reviews details:', error.response ? error.response.data : error.message);
    throw error;
  }
};
 
export const getReviewDetails = async (productidKey) => {
  try {
    const response = await axios.get(`/api/reviews?${productidKey}`);
    return response.data;
  } catch (error) {
    console.error('Error getting reviews details:', error.response ? error.response.data : error.message);
    throw error;
  }
};
 
 
export const deleteReviewDetails = async (data) => {
  console.log(data, "crud data ")
  try{
    const response = await axios.delete(`/api/reviews?id=${data.reviewid}`);
    return response.data;
  }catch (error){
    throw error;
 
  }
}