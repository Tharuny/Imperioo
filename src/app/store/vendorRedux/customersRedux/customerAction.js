import * as requestFromCustomersCRUD from './customerCRUD';
import { getVendorCustomers} from './customerSlice';


export const getCustomersForVendor=()=>async(dispatch)=>{
    try{
        const response = await requestFromCustomersCRUD.getCustomersData();
        console.log(response,"ored");
        dispatch(getVendorCustomers(response.data));
    }catch(error)
    {
    }
}

