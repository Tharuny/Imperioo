"use client";

import Box from "@mui/material/Box"; // GLOBAL CUSTOM COMPONENT

import { H3 } from "components/Typography"; // Local CUSTOM COMPONENT

import EditProductForm from "../edit-product-form";

const EditProductPageView = () => {
  return <Box py={4}>
      <H3 mb={2}>Edit Product</H3>

      <EditProductForm/>
    </Box>;
};

export default EditProductPageView;