"use client";

import Box from "@mui/material/Box"; // GLOBAL CUSTOM COMPONENT

import { H3 } from "components/Typography"; // Local CUSTOM COMPONENT

import InvoiceForm from "../invoice-form";

const InvoiceEditPageView = () => {
  const INITIAL_VALUES = {
    name: "",
    parent: [],
    featured: false,
  };

  const handleFormSubmit = () => {};

  return (
    <Box py={4}>
      <H3 mb={2}>Edit Invoice</H3>

      <InvoiceForm
        initialValues={INITIAL_VALUES}
        handleFormSubmit={handleFormSubmit}
      />
    </Box>
  );
};

export default InvoiceEditPageView;
