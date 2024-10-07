"use client";
// import "../../../components/product-cards/product-card-7/styles/card.css";
import Container from "@mui/material/Container"; // GLOBAL CUSTOM COMPONENTS
import Grid from "@mui/material/Grid"; // Import Grid component
import { H1, Paragraph } from "components/Typography";
import { Carousel } from "components/carousel";
import { ProductCard7 } from "components/product-cards/product-card-7"; // CUSTOM DATA MODEL
import { useState, useEffect } from "react";
import '../../../components/product-cards/product-card-7/styles/card.css'
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "app/store/categoryRedux/categoryAction";
import ProductCard14 from "components/product-cards/product-card-14/product-card";
import '../../../components/product-cards/product-card-14/styles/card.css'
import { capital } from "app/store/capitalize/capitalizeText";


// ====================================================
export default function Section9({ heading, description }) {
 
  const dispatch= useDispatch();
  useEffect(() => {
    dispatch(getCategory())
  }, []);

  const val = useSelector(state=> state.category.categoryData);

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

  useEffect(()=>{
    setData(val);
  },[val])

  return (
    <Container >
      <H1 className="H1">{heading}</H1>

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

      {/* {data.map(item => (
          
          <div key={item.id} className="pt-1 pb-1">
            <ProductCard7
              id={item.productid}
              ptitle={item.productname}
              price={item.currentprice}
              discount={item.originalprice}
             />
          </div>
        ))}  */}

    {data.map(item => (
          
          <div key={item.id} className="pt-1 pb-1">
            <ProductCard7
             id={item.categoryid}
             ptitle={dispatch(capital(item.categoryname))}
             price={item.currentprice}
             discount={item.originalprice}
             />
          </div>
        ))} 
        </Carousel>
      <Link href={"/products?key=products"}>
        <button className="btn-products">View all Collections</button>
      </Link>
    </Container>
  );
}