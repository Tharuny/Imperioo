import axios from 'axios';

export const adminLoginValidate = async (data) => {
    return await axios.post('/api/Admin', data );
};
