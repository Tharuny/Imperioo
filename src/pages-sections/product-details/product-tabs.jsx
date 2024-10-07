"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import styled from "@mui/material/styles/styled"; // LOCAL CUSTOM COMPONENTS

import ProductReview from "./product-review";
import ProductDescription from "./product-description"; // STYLED COMPONENT
import { useDispatch, useSelector } from "react-redux";
import { getReview } from "app/store/reviewRedux/reviewAction";
import ProductSpecifications from "./product-specification";

const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 0,
  marginTop: 80,
  marginBottom: 24,
  borderBottom: `1px solid ${theme.palette.text.disabled}`,
  "& .inner-tab": {
    minHeight: 40,
    fontWeight: 600,
    textTransform: "capitalize",
  },
}));

export default function ProductTabs(props) {
 
  const [selectedOption, setSelectedOption] = useState(0);
  const dispatch = useDispatch();
  const detail = useSelector((state) => state?.review?.reviewDetails);
  const [reviewDetails,setReviewDetails] = useState(detail);
  const handleOptionClick = (_, value) => setSelectedOption(value);
  useEffect(() => {
   
    dispatch(getReview(props.specs.productid));
  }, [reviewDetails]); // Add dispatch to the dependency array

  const cou = detail?.length || 0; // Ensure `detail` is defined

  //splitting the specification names and specification values
  const specnames=props.specs.specifications.split(",");
  // const specvalues=props.specs.specificationsvalues.split(",");

  return (
    <>
      <StyledTabs
        textColor="primary"
        value={selectedOption}
        indicatorColor="primary"
        onChange={handleOptionClick}
      >
        <Tab className="inner-tab" label="Specifications" />
        <Tab className="inner-tab" label="Description" />
        <Tab className="inner-tab" label={`Review (${cou})`} />
      </StyledTabs>

      <Box mb={6}>
        {selectedOption === 0 && <ProductSpecifications names={specnames} />}
        {selectedOption === 1 && <ProductDescription data={props.specs.description}/>}
        {selectedOption === 2 && <ProductReview data={props} review={detail} />}
      </Box>
    </>
  );
}
