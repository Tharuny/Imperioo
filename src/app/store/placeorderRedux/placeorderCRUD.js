import axios from 'axios';

export const postPlaceorder = async (data) => {
    return await axios.post('/api/inventory', data );
};

export const deletePlaceorder = async (userIdProductId) => {
    return await axios.delete(`/api/inventory?${userIdProductId.user}&${userIdProductId.product}`);
};