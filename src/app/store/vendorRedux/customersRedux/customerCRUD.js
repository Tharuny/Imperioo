import axios from "axios"


export const getCustomersData=async()=>{
        return await axios.get(`/api/VendorAPIRoutes/Customers`);
}
