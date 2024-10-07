import * as requestFromOrderCRUD from './orderCRUD';
import { getVendorOrders } from './orderSlice';


export const getOrdersFromVendor=(dataObj)=>async(dispatch)=>{
    try{
        const response = await requestFromOrderCRUD.getOrdersData(dataObj);
        console.log(response,"ored");
        dispatch(getVendorOrders(response.data));
    }catch(error)
    {
    }
}

