import axios from 'axios';

export const postColorData = async (data) => {
    return await axios.post('/api/colors', data );
};

export const getColorData = async () => {
        return await axios.get('/api/colors');
    };