"use client";

import Box from "@mui/material/Box"; // GLOBAL CUSTOM COMPONENT

import { H3 } from "components/Typography"; // Local CUSTOM COMPONENT

import SubCategoryForm from "../subCategory-form";

const EditSubCategoryPageView = () => {
  const INITIAL_VALUES = {
    subCategoryName: "",
    status: "",
  };

  const handleFormSubmit = () => {};

  return <Box py={4}>
      <H3 mb={2}>Edit Sub Category</H3>

      <SubCategoryForm initialValues={INITIAL_VALUES} handleFormSubmit={handleFormSubmit} />
    </Box>;
};

export default EditSubCategoryPageView;