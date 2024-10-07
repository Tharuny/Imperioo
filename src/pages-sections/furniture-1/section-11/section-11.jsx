

import Container from "@mui/material/Container"; // GLOBAL CUSTOM COMPONENTS
import  "./section-11.css";
import "../../../components/product-cards/product-card-7/styles/card.css"
import { Carousel } from "components/carousel";
import { H1, Paragraph } from "components/Typography";
import { ProductCard7 } from "components/product-cards/product-card-7"; // CUSTOM DATA MODEL
import { useState,useEffect } from "react";
import { Box, Grid } from "@mui/material";

import { Padding } from "@mui/icons-material";
import { SxProps } from "@mui/material";
// ====================================================
export default function Section11({
  heading,
  description
}) {
  const responsive = [{
    breakpoint: 1440,
    settings: {
      slidesToShow: 3
    }
  }, {
    breakpoint: 650,
    settings: {
      slidesToShow: 2
    }
  }, {
    breakpoint: 500,
    settings: {
      slidesToShow: 1
    }
  }];

  return <Box className=" mt-5 mb-5">
      <h1 className="H1">{heading}</h1>
      <p className="sub-heading "  mb={4}>
        {description}
      </p>
    
      
      <Grid xs={10} sm={10} md={4} lg={2}  className="scroll  ">
      
        <img src="\assets\images\clients\accor.svg" height="100px" width="100px"></img>
        <img src="\assets\images\clients\Carroll-adams.svg" height="100px" width="100px" ></img>
        <img src="\assets\images\clients\fourseasons.svg" height="100px" width="100px" ></img>
        <img src="\assets\images\clients\hilton.svg" height="100px" width="100px" ></img>
       

      </Grid>
      <Grid xs={10} sm={10} md={4} lg={2}  className="scroll  pb-2 mb-3">
      
      <img src="\assets\images\clients\holland-america-line.svg" height="100px" width="100px" ></img>
      <img src="\assets\images\clients\hyatt.svg" height="100px" width="100px" ></img>
      <img src="\assets\images\clients\ihg.svg" height="100px" width="100px" ></img>
      <img src="\assets\images\clients\marriott.svg" height="100px" width="100px" ></img>
     

    </Grid>
    </Box>;
}



