"use client";

import Container from "@mui/material/Container"; // GLOBAL CUSTOM COMPONENTS

import { H1, Paragraph } from "components/Typography";
import { useState,useEffect } from "react";
import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Link from "next/link";
import "../../../components/product-cards/product-card-7/styles/card.css"


// ====================================================
export default function Section10({
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
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {

  //     try {
  //       const response = await fetch('/api/data?key=newProducts', {
  //         method: 'GET'
  //       });

  //     
  //       const productData = await response.json();
  //    
  //       setData(productData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
 
  // const filteredNewProducts = products.filter(item => item.status === "New")

  return<Container className="">
      <Box sx={{alignItems:'center', display:'flex', flexDirection:'column'}}> 
          <p className="H1">{heading}</p>
          {/* <Paragraph color="grey.600" mb={4}>
            {description}
          </Paragraph> */}
      </Box>

      <Box sx={{ width: '100%', marginBottom:10 }}>
      <Grid container rowSpacing={3} columnSpacing={{ xs:1 , sm: 2, md: 3 }}>
        <Grid item md={4} xs={12}>
        <Card
              sx={{
                maxWidth: 600,
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  '& img': {
                    transform: 'scale(1.02)', // Zoom effect on hover
                  },
                },
              }}
            >
              <CardMedia
                component="img"
                height="300"
                image="assets/Screenshot 2024-07-02 at 12.05.19.png"
                alt="Paella dish"
                sx={{
                  width: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.2s ease-in-out', // Smooth transition for zoom effect
                }}
              />
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 0,
                  boxShadow: 'none',
                  border: 'none',
                }}
              >
                <Typography gutterBottom variant="h5" component="div" sx={{ letterSpacing: '0.2em' }}>
                  WEBSOC.AI
                </Typography>
                <Typography gutterBottom variant="subtitle2" component="div" letterSpacing="0.1em" sx={{ opacity: 0.5 }}>
                  Hyderabad, INDIA
                </Typography>
              </CardContent>
            </Card>
        </Grid>
        <Grid item md={4} xs={12}>
            <Card sx={{
                maxWidth: 600,
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  '& img': {
                    transform: 'scale(1.02)', // Zoom effect on hover
                  },
                },
              }}>
                <CardMedia
                    component="img"
                    height="300"
                    image="https://shapoorji.in/wp-content/uploads/2017/03/TCS-Noida-1.jpg"
                    alt="Paella dish"
                    sx={{
                        width: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.2s ease-in-out', // Smooth transition for zoom effect
                      }}
                       
                   
                />
                
                <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 0 , boxShadow:'none', border:'none'}}>
                <Typography  gutterBottom  variant="h5"  component="div" sx={{ letterSpacing: '0.2em' }} >
                    TCS
                </Typography>
                <Typography gutterBottom  variant="subtitle2"  component="div" letterSpacing= '0.1em' sx={{opacity:0.5}}
                >
                    Hyderabad, INDIA
                </Typography>
                </CardContent>

                
            </Card>
        </Grid>
        <Grid item md={4} xs={12}>
            <Card sx={{
                maxWidth: 600,
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  '& img': {
                    transform: 'scale(1.02)', // Zoom effect on hover
                  },
                },
              }}>
                <CardMedia
                    component="img"
                    height="300"
                    image="https://media.glassdoor.com/lst2x/24/73/4d/4b/be-the-new.jpg"
                    alt="Paella dish"
                    sx={{
                        width: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.2s ease-in-out', // Smooth transition for zoom effect
                      }}
                />
                
                <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 0 , boxShadow:'none', border:'none'}}>
                <Typography  gutterBottom  variant="h5"  component="div" sx={{ letterSpacing: '0.2em' }} >
                  WIPRO
                </Typography>
                <Typography gutterBottom  variant="subtitle2"  component="div" letterSpacing= '0.1em' sx={{opacity:0.5}}
                >
                    Hyderabad, INDIA
                </Typography>
                </CardContent>

                
            </Card>
        </Grid>

       
      </Grid>
      <Box>
      <Link href={`/products`}>
        <button className="btn-products">View all Projects</button>
      </Link>
      </Box>
    </Box>

    </Container>;
}