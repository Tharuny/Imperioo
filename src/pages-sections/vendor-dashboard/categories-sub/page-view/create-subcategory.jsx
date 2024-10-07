"use client";

import Box from "@mui/material/Box"; // GLOBAL CUSTOM COMPONENT

import { H3 } from "components/Typography"; // Local CUSTOM COMPONENT


import SubCategoryForm from "../subCategory-form";
// import SubCategoriesPageView from "./subcategories";

const CreateSubCategoryPageView = () => {
  const INITIAL_VALUES = {
    subCategoryName: "",
    status: [],
    
  };

  const handleFormSubmit = () => {};

  return <Box py={4}>
      <H3 mb={2}>Create Sub Category</H3>
      <SubCategoryForm initialValues={INITIAL_VALUES} handleFormSubmit={handleFormSubmit} />
    </Box>;
};

export default CreateSubCategoryPageView;