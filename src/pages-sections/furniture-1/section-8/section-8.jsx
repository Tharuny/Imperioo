"use client";
import "../../../components/product-cards/product-card-7/styles/card.css";
import Container from "@mui/material/Container"; // GLOBAL CUSTOM COMPONENTS
import Grid from "@mui/material/Grid"; // Import Grid component
import { H1, Paragraph } from "components/Typography";
import { ProductCard7 } from "components/product-cards/product-card-7"; // CUSTOM DATA MODEL
import { useState, useEffect } from "react";
import "../../../components/product-cards/product-card-7/styles/card.css"
import Link from "next/link";
import { capital } from "app/store/capitalize/capitalizeText";

// ====================================================
export default function Section8({ heading, description }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data?key=bestSellingProducts', {
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

  return (
    <Container className="container mt-3">
      <H1 className="H1">{heading}</H1>

      <Grid className="grid" container spacing={0} justifyContent="center">
        {data.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard7
              id={item.productid}
              ptitle={dispatch(capital(item.productname))}
              price={item.currentprice}
              discount={item.originalprice}
            />
          </Grid>
        ))}
      </Grid>
      <Link href={`/products`}>
        <button className="btn-products">View all products</button>
      </Link>
    </Container>
  );
}
