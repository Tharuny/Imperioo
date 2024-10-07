"use client";

import Container from "@mui/material/Container"; // GLOBAL CUSTOM COMPONENTS

import { Carousel } from "components/carousel";
import { H1, Paragraph } from "components/Typography";
import { ProductCard7 } from "components/product-cards/product-card-7"; // CUSTOM DATA MODEL
import { useState,useEffect } from "react";
import { capital } from "app/store/capitalize/capitalizeText";
// ====================================================
 export default function Section6(
{
  heading,
  description
}
) {
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
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await fetch('/api/data?key=discountProducts', {
          method: 'GET'
        });

        const productData = await response.json();
        
        setData(productData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

//  const filteredDiscountProducts = products.filter(item => item.discount > 0)

  return <Container className="mt-3">
      <H1>{heading}</H1>
      {/* <Paragraph color="grey.600" mb={4}>
        {description}
      </Paragraph> */}

      {/* <Carousel responsive={responsive} slidesToShow={1} arrowStyles={{
      width: 40,
      height: 40,
      boxShadow: 2,
      borderRadius: 0,
      color: "primary.main",
      backgroundColor: "primary.50",
      "&:hover": {
        backgroundColor: "primary.100"
      }
    }}> */}
        {/* {filteredDiscountProducts.map(item => <div className="pt-1 pb-1" key={item.id}> */}
         
        <Carousel
        responsive={responsive}
        slidesToShow={4}
        arrowStyles={{
          width: 40,
          height: 40,
          boxShadow: 2,
          borderRadius: 0,
          color: "primary.main",
          backgroundColor: "primary.50",
          "&:hover": {
            backgroundColor: "primary.100",
          },
        }}
      >
          {data.map(item => (
          
          <div key={item.id} className="pt-1 pb-1">
            <ProductCard7
              id={item.productid}
              ptitle={dispatch(capital(item.productname))}
              price={item.currentprice}
              discount={item.originalprice}
             />
          </div>
        ))}
      </Carousel>
          {/* </div>)} */}
      {/* </Carousel> */}
    </Container>;
}