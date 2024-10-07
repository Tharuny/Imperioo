"use client";

import Container from "@mui/material/Container"; // GLOBAL CUSTOM COMPONENTS

import { Carousel } from "components/carousel";
import { H1, Paragraph } from "components/Typography";
import { ProductCard7 } from "components/product-cards/product-card-7"; // CUSTOM DATA MODEL
import { useState,useEffect } from "react";
import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Link from "next/link";
import "../../../components/product-cards/product-card-7/styles/card.css"

// ====================================================
export default function Section7({
  
  heading,
  description
}) 
{
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

  // useEffect(() => {
  //   const fetchData = async () => {

  //     try {
  //       const response = await fetch('/api/data?key=newProducts', {
  //         method: 'GET'
  //       });

  //       const productData = await response.json();
  //       setData(productData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
 
  // const filteredNewProducts = products.filter(item => item.status === "New")

  return <Container className="mt-5 mb-5">
      <Box sx={{alignItems:'center', display:'flex', flexDirection:'column'}}> 
          <p className="H1">{heading}</p>
          {/* <Paragraph color="grey.600" mb={4}>
            {description}
          </Paragraph> */}
      </Box>
      
      

      {/* <Carousel responsive={responsive} slidesToShow={4} arrowStyles={{
      width: 40,
      height: 40,
      boxShadow: 2,
      borderRadius: 0,
      color: "primary.main",
      backgroundColor: "primary.50",
      "&:hover": {
        backgroundColor: "primary.100"
      }
    }}>
        {filteredNewProducts.map(item => <div className="pt-1 pb-1" key={item.id}>
            <ProductCard7 hideRating id={item.id} slug={item.slug} title={item.title} price={item.price} off={item.discount} rating={item.rating} status={item.status} imgUrl={item.thumbnail} productColors={item.colors} />
          </div>)}
      </Carousel> */}
       {/* <Carousel
        responsive={responsive}
        slidesToShow={2}
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
      > */}
        {/* {console.log(data[0])}
        {data.map(item => (
          
          <div key={item.id} className="pt-1 pb-1">
            <ProductCard7
              id={item.productid}
              ptitle={item.productname}
              price={item.currentprice}
              discount={item.originalprice}
             />
          </div>
        ))} */}
      {/* </Carousel> */}

      <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={3} columnSpacing={{ xs:1 , sm: 2, md: 3 }}>
        <Grid item md={6} xs={12}>
          <Card sx={{ 
                maxWidth: 600, 
                height: 300, 
                position: 'relative',
                      overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(255, 255, 100, 0)', // Transparent initially
                  zIndex: 1, // Ensure it covers the image
                  transition: 'background-color 0.3s ease', // Smooth transition for color change
                },
                '&:hover::before': {
                  backgroundColor: 'rgba(222,145,25,0.8)', // Transparent yellow color on hover
                },
                '&:hover img': {
                  transform: 'scale(1.1)', // Zoom effect on image on hover
                },
              }}>
         
              <CardMedia
                component="img"
                height="194"
                image="https://media.istockphoto.com/id/492073842/photo/sketch-design-of-coffee-shop-3dwire-frame-render.jpg?s=612x612&w=0&k=20&c=Klg6xqMRhWaQCgBfjiC2iBLwOS9Tz1FVN-4hXjoTUfk="
                alt="Paella dish"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0, // Ensure the image is behind the overlay
                  transition: 'transform 0.3s ease-in-out', // Smooth transition for zoom effect
                }}
              />
                
          
              <CardContent sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: 2,
                zIndex:2
              }}>
                <Typography variant="h3" color="white" textAlign="center">
                DESIGN
                </Typography>
              </CardContent>
          </Card>
        </Grid>
        <Grid item md={6} xs={12}>
          <Card sx={{ 
                maxWidth: 600, 
                height: 300, 
                position: 'relative',
                      overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(255, 255, 100, 0)', // Transparent initially
                  zIndex: 1, // Ensure it covers the image
                  transition: 'background-color 0.3s ease', // Smooth transition for color change
                },
                '&:hover::before': {
                  backgroundColor: 'rgba(222,145,25,0.8)', // Transparent yellow color on hover
                },
                '&:hover img': {
                  transform: 'scale(1.1)', // Zoom effect on image on hover
                },
              }}>
         
              <CardMedia
                component="img"
                height="194"
                image="https://media.istockphoto.com/id/995428636/photo/elegant-tapas-by-the-sea-in-the-sunset.jpg?s=612x612&w=0&k=20&c=b_52qmyYReDICfgf8ea0veEkAw4VeYQkAiWNCgldnlk="
                alt="Paella dish"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0, // Ensure the image is behind the overlay
                  transition: 'transform 0.3s ease-in-out', // Smooth transition for zoom effect
                }}
              />
                
          
              <CardContent sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: 2,
                zIndex:2
              }}>
                <Typography variant="h3" color="white" textAlign="center">
                HOSPITALITY
                </Typography>
              </CardContent>
          </Card>
        </Grid>
        <Grid item md={6} xs={12}>
          <Card sx={{ 
                maxWidth: 600, 
                height: 300, 
                position: 'relative',
                      overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(255, 255, 100, 0)', // Transparent initially
                  zIndex: 1, // Ensure it covers the image
                  transition: 'background-color 0.3s ease', // Smooth transition for color change
                },
                '&:hover::before': {
                  backgroundColor: 'rgba(222,145,25,0.8)', // Transparent yellow color on hover
                },
                '&:hover img': {
                  transform: 'scale(1.1)', // Zoom effect on image on hover
                },
              }}>
         
              <CardMedia
                component="img"
                height="194"
                image="https://media.istockphoto.com/id/1163766069/photo/handsome-bearded-man-is-playing-poker-sitting-at-the-table-in-casino.jpg?s=612x612&w=0&k=20&c=yQY6k8dAICf0s0xGMHiqoQJFx9M6-9fFFSDRt5wLKcI="
                alt="Paella dish"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0, // Ensure the image is behind the overlay
                  transition: 'transform 0.3s ease-in-out', // Smooth transition for zoom effect
                }}
              />
                
          
              <CardContent sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: 2,
                zIndex:2
              }}>
                <Typography variant="h3" color="white" textAlign="center">
                DEALERS
                </Typography>
              </CardContent>
          </Card>
        </Grid>
        <Grid item md={6} xs={12}>
          <Card sx={{ 
                maxWidth: 600, 
                height: 300, 
                position: 'relative',
                      overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(255, 255, 100, 0)', // Transparent initially
                  zIndex: 1, // Ensure it covers the image
                  transition: 'background-color 0.3s ease', // Smooth transition for color change
                },
                '&:hover::before': {
                  backgroundColor: 'rgba(222,145,25,0.8)', // Transparent yellow color on hover
                },
                '&:hover img': {
                  transform: 'scale(1.1)', // Zoom effect on image on hover
                },
              }}>
         
              <CardMedia
                component="img"
                height="194"
                image="https://media.istockphoto.com/id/168626919/photo/sunset-on-a-cruise-ship.jpg?s=612x612&w=0&k=20&c=SYQOOSEiOPo84018EEnnfNhRG7i3E6sU_GVneJq47PA="
                alt="Paella dish"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0, // Ensure the image is behind the overlay
                  transition: 'transform 0.3s ease-in-out', // Smooth transition for zoom effect
                }}
              />
                
          
              <CardContent sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: 2,
                zIndex:2
              }}>
                <Typography variant="h3" color="white" textAlign="center">
                CRUISE
                </Typography>
              </CardContent>
          </Card>
        </Grid>
        <Grid item md={6} xs={12}>
          <Card sx={{ 
                maxWidth: 600, 
                height: 300, 
                position: 'relative',
                      overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(255, 255, 100, 0)', // Transparent initially
                  zIndex: 1, // Ensure it covers the image
                  transition: 'background-color 0.3s ease', // Smooth transition for color change
                },
                '&:hover::before': {
                  backgroundColor: 'rgba(222,145,25,0.8)', // Transparent yellow color on hover
                },
                '&:hover img': {
                  transform: 'scale(1.1)', // Zoom effect on image on hover
                },
              }}>
         
              <CardMedia
                component="img"
                height="194"
                image="https://media.istockphoto.com/id/1449490038/photo/online-shopping-and-e-commerce-technology-concept-shopper-using-computer-laptop-to-input.jpg?s=612x612&w=0&k=20&c=t_0z_Vm6_5vmzuwZl6HydbwsYesuHcbF-uRU23KtOvk="
                alt="Paella dish"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0, // Ensure the image is behind the overlay
                  transition: 'transform 0.3s ease-in-out', // Smooth transition for zoom effect
                }}
              />
                
          
              <CardContent sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: 2,
                zIndex:2
              }}>
                <Typography variant="h3" color="white" textAlign="center">
                PROCUREMENT
                </Typography>
              </CardContent>
          </Card>
        </Grid>
        <Grid item md={6} xs={12}>
          <Card sx={{ 
                maxWidth: 600, 
                height: 300, 
                position: 'relative',
                      overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(255, 255, 100, 0)', // Transparent initially
                  zIndex: 1, // Ensure it covers the image
                  transition: 'background-color 0.3s ease', // Smooth transition for color change
                },
                '&:hover::before': {
                  backgroundColor: 'rgba(222,145,25,0.8)', // Transparent yellow color on hover
                },
                '&:hover img': {
                  transform: 'scale(1.1)', // Zoom effect on image on hover
                },
              }}>
         
              <CardMedia
                component="img"
                height="194"
                image="https://images.unsplash.com/photo-1683914791874-2dcb78e58e09?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvc3BpdGFsaXR5fGVufDB8fDB8fHww"
                alt="Paella dish"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0, // Ensure the image is behind the overlay
                  transition: 'transform 0.3s ease-in-out', // Smooth transition for zoom effect
                }}
              />
                
          
              <CardContent sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: 2,
                zIndex:2
              }}>
                <Typography variant="h3" color="white" textAlign="center">
                DEVELOPERS
                </Typography>
              </CardContent>
          </Card>
        </Grid>
       
      </Grid>
    </Box>
      <Link href={`/products`}>
        <button className="btn-products">View Industries</button>
      </Link>
    </Container>;
}