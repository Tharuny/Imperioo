import React, { useState,useEffect} from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { H1, Paragraph } from "components/Typography";
import { ProductCard7 } from "components/product-cards/product-card-7";
import { capital } from 'app/store/capitalize/capitalizeText';

export default function Section4() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await fetch('/api/data?key=allProducts', {
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
 
  const [visibleProducts, setVisibleProducts] = useState(6); // Initial number of visible products

  const loadMore = () => {
    setVisibleProducts(prev => prev + 6); // Increase the number of visible products by 6
  };
 
  // Assuming data is an array of product objects

  // return (
  //   <>
      
  //     <h1>All Products</h1>
  //     <ul>{productDetails}</ul> {/* Render the list of products */}
      
  //   </>
  // );
  
  return (
    <Container className="mt-4 pb-4">
      <H1>All Product</H1>
      <Paragraph color="grey.600" mb={4}>
        Tall blind but were, been folks not the expand
      </Paragraph>

      <Grid container spacing={3}>

          <Grid key={item.id} item md={4} sm={6} xs={12}>
            <ProductCard7
              id={item.productid}
              ptitle={dispatch(capital(item.productname))}
              price={item.currentprice}
              discount={item.originalprice}
            />
          </Grid>
      </Grid>
      

      <Box mt={6} display="flex" justifyContent="center">
        {visibleProducts < data.length && (
          <Button color="primary" variant="contained" onClick={loadMore}>
            Load More...
          </Button>
        )}
      </Box>
    </Container>
  );
}
