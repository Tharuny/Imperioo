"use client";

import Container from "@mui/material/Container"; // GLOBAL CUSTOM COMPONENTS

import { Carousel } from "components/carousel";
import { H1, Paragraph } from "components/Typography";
import { ProductCard7 } from "components/product-cards/product-card-7"; // CUSTOM DATA MODEL
import { useState,useEffect } from "react";
import Link from "next/link";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "app/store/ProductsRedux/productAction";
import '../../../components/product-cards/product-card-7/styles/card.css'

import { capital } from "app/store/capitalize/capitalizeText";

// ====================================================
export default function Section14({
  
  heading,
  description
}) {

  const [data, setData] = useState([]);
  const dispatch=useDispatch();
  const allProducts=useSelector((state)=>state.productBySubCategory.productsBasedOnSubcategories);

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


  useEffect(() => {
    dispatch(getAllProducts("products"))
  }, []);

  useEffect(()=>{
    setData(allProducts)
  },[allProducts])

  // Converting to Encode for slug
  const encode = (name, id) => {
    let slugString = "key=" + name + "&upi="; // Adding Remaining Text and encoded id
    let encodedid = slugString
      + Buffer.from(id).toString("base64")
        .replace(/\+/g, "-") // Replace '+' with '-' for URL safety
        .replace(/\//g, "_") // Replace '/' with '_' for URL safety
        .replace(/=+$/, ""); // Remove trailing '=' characters
    return encodedid;
  };

  return<Container>
  <p className="H1">{heading}</p>

  <Carousel className="outergrid"
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
              slug={encode(item.productname, item.productid)}
              id={item.productid}
              ptitle={dispatch(capital(item.productname))}
              price={item.currentprice}
              discount={item.originalprice}
             />
          </div>
        ))} 

        </Carousel>

  {/* <Grid className="grid" container spacing={0} justifyContent="center">
    {data.map((item) => (
      <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
        <ProductCard7
          id={item.productid}
          ptitle={item.productname}
          price={item.currentprice}
          discount={item.originalprice}
        />
      </Grid>
    ))}
  </Grid> */}
  <Link href={`/products?key=products`} >
    <button className="btn-products">View top new products</button>
  </Link>
</Container>
}