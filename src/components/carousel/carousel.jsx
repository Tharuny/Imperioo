"use client";

import { forwardRef, useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import SlickCarousel from "react-slick";
// LOCAL CUSTOM COMPONENTS
import CarouselDots from "./components/carousel-dots";
import CarouselArrows from "./components/carousel-arrows"; // SLICK CAROUSEL CSS

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; // STYLED COMPONENT
import './styles/styles.css'

import { RootStyle } from "./styles";

const Carousel = forwardRef((props, ref) => {
  const {
    dotColor,
    children,
    arrowStyles,
    dots = false,
    arrows = true,
    slidesToShow = 4,
    spaceBetween = 10,
    dotStyles = {
      mt: 4
    },
    autoplay = true,
    autoplaySpeed = 5000, // 5 seconds
    ...others
  } = props;
  const theme = useTheme();
  const carouselRef = useRef(null);

  useEffect(() => {
    if (autoplay && carouselRef.current) {
      const intervalId = setInterval(() => {
        carouselRef.current.slickNext();
      }, autoplaySpeed);
      return () => clearInterval(intervalId);
    }
  }, [autoplay, autoplaySpeed]);

  const settings = {
    dots,
    arrows,
    slidesToShow,
    rtl: theme.direction === "rtl",
    ...CarouselArrows(arrowStyles),
    ...CarouselDots({
      dotColor,
      sx: dotStyles
    }),
    ...others
  };
  return (
    <RootStyle space={spaceBetween}>
      <SlickCarousel className="carousel" ref={(c) => (carouselRef.current = c)} {...settings}>
        {children}
      </SlickCarousel>
    </RootStyle>
  );
});

export default Carousel;
