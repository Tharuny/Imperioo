"use client";

import Box from "@mui/material/Box"; // GLOBAL CUSTOM COMPONENT

import { H3 } from "components/Typography"; // Local CUSTOM COMPONENT

import { useEffect,useState } from "react";
import ProductImage from "../productImage-form";

const ProductImagePageView = () => {
  const [reload, setReload] = useState(false);
  const INITIAL_VALUES = {
    name: "",
    tags: "",
    stock: "",
    price: "",
    category: [],
    sale_price: "",
    description: ""
  };

  // const handleFormSubmit = values => {
    
  //   };
  
   const reloadPage =()=>{
    setReload(!reload);
    
   }




    

  return <Box py={4}>
      <H3 mb={2}>Add Images</H3>

      <ProductImage initialValues={INITIAL_VALUES}  />
    
    </Box>;
};

export default ProductImagePageView;