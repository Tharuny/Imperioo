import axios from "axios"


export const getOrdersData=async(dataObj)=>{
        console.log("eny",dataObj);
        if(dataObj.userid=="NA")
        return await axios.get(`/api/VendorAPIRoutes/Orders`);
        else
        return await axios.get(`/api/VendorAPIRoutes/Orders?${dataObj.userid}`);
}
