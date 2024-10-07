"use client";

import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton"; // MUI ICON COMPONENTS

import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward"; // LOCAL CUSTOM HOOK

import useCarousel from "./useCarousel"; // GLOBAL CUSTOM COMPONENTS

import { Carousel } from "components/carousel";
import { FlexBetween } from "components/flex-box";
import { H3, Paragraph } from "components/Typography";
import ProductCard12 from "components/product-cards/product-card-12"; // CUSTOM DATA MODEL

// ==============================================================
export default function Content({
  products
}) {
  const {
    carouselRef,
    responsive,
    handleNext,
    handlePrev
  } = useCarousel();
  return <Container>
      <FlexBetween mt={10} mb={5}>
        <div>
          <H3 fontSize={{
          sm: 30,
          xs: 27
        }}>Trending Items</H3>
          <Paragraph color="grey.600" fontSize={{
          sm: 16,
          xs: 14
        }}>
            There are many variations passages
          </Paragraph>
        </div>

        <div>
          <IconButton onClick={handlePrev}>
            <ArrowBack fontSize="small" />
          </IconButton>

          <IconButton onClick={handleNext} sx={{
          backgroundColor: "white",
          boxShadow: 2,
          ml: 0.5
        }}>
            <ArrowForward fontSize="small" />
          </IconButton>
        </div>
      </FlexBetween>

      <Carousel ref={carouselRef} slidesToShow={4} responsive={responsive} arrows={false}>
        {products.map(product => <ProductCard12 product={product} key={product.id} />)}
      </Carousel>
    </Container>;
}