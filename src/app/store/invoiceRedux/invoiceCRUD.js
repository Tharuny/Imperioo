import axios from 'axios';

export const postInvoiceData = async (data) => {
    return await axios.post('/api/invoiceData', data );
};

export const getInvoiceData = async (data) => {
        return await axios.get('/api/invoiceData');
    };