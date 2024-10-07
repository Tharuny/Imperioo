"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import "./styles/style.css";
import LazyImage from "components/LazyImage";
import { Span } from "components/Typography";
import ProductViewDialog from "components/products-view/product-view-dialog";
import useProduct from "../use-product";
import HoverActions from "./components/hover-actions";
import ProductPrice from "../product-price";
import ProductTitle from "../product-title";
import DiscountChip from "../discount-chip";
import QuantityButtons from "./components/quantity-buttons";
import { ImageWrapper, ContentWrapper, StyledBazaarCard } from "./styles";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { addProductToCart } from "app/store/UserCartRedux/UserCartAction";

// ========================================================
export default function ProductCard({
  id,
  slug,
  title,
  currentprice,
  imgUrl,
  rating = 5,
  hideRating,
  hoverEffect,
  discount,
  showProductSize,
  originalPrice,
  specs,
  fav,
  qty
}) {
  const router = useRouter();
  const userValid = useSelector((state) => state.user.loginVerified);
  const userId = useSelector((state) => state.user.userid);
  const [increment, setIncrement] = useState(Number(qty));
  const dispatch = useDispatch();

  //fix 
  useEffect(()=>{
    console.log("qty increased");
    setIncrement(Number(qty));
  },[qty]); 

  const {
    isFavorite,
    openModal,
    cartItem,
    toggleDialog,
    toggleFavorite,
    handleCartAmountChange
  } = useProduct(slug);

  // Update the cart whenever the increment changes
  // useEffect(() => {
  //   if (userValid) {
  //     const productData = {
  //       id,
  //       userid: userId,
  //       qty: increment,
  //       remainingqty: 0,
  //     };
  //     // dispatch(addProductToCart(productData));
  //   }
  // }, [ userValid, id, userId, dispatch]); //removed reload on increment -- **samuel**


  // Handle incrementing the quantity
const handleIncrementQuantity = () => {
  console.log("clicked")

  setIncrement((increment) => {
    return increment+1; // Return the new increment value
  });

  const productData = {
    id,
    userid: userId,
    qty: increment+1,
    remainingqty: 0,
  };
  console.log(productData, "step1");
  dispatch(addProductToCart(productData));
};


  // Handle decrementing the quantity
  const handleDecrementQuantity = () => {
    setIncrement((increment) => {return increment > 0 ? increment - 1 : 0});
    const productData = {
      id,
      userid: userId,
      qty: increment-1,
      remainingqty: 0,
    };
    console.log(productData, "step1");
    dispatch(addProductToCart(productData));
    console.log(increment-1,"decre");
  };

  return (
    <StyledBazaarCard hoverEffect={hoverEffect}>
      <ImageWrapper>
        {/* DISCOUNT PERCENT CHIP IF AVAILABLE */}
        <DiscountChip discount={discount} />

        {/* HOVER ACTION ICONS */}
        <HoverActions
          productId={id}
          isFavorite={fav}
          toggleView={toggleDialog}
          toggleFavorite={toggleFavorite}
        />

        {/* PRODUCT IMAGE / THUMBNAIL */}
        <Link href={`/products/${slug}`}>
          <LazyImage
            priority
            src="/assets/images/furniture-products/b-3.png"
            width={500}
            height={500}
            alt={title}
          />
        </Link>
      </ImageWrapper>

      {/* PRODUCT VIEW DIALOG BOX */}
      <ProductViewDialog
        openDialog={openModal}
        handleCloseDialog={toggleDialog}
        product={{
          title,
          currentprice,
          id,
          slug,
          imgGroup: [imgUrl, imgUrl],
          specs,
        }}
      />

      <ContentWrapper>
        <Box flex="1 1 0" minWidth="0px" mr={1}>
          {/* PRODUCT NAME / TITLE */}
          <ProductTitle title={title} slug={slug} />

          {/* PRODUCT RATINGS IF AVAILABLE */}
          {!hideRating ? (
            <Rating size="small" value={rating} color="warn" readOnly />
          ) : null}

          {/* PRODUCT SIZE IF AVAILABLE */}
          {showProductSize ? (
            <Span color="grey.600" mb={1} display="block">
              Liter
            </Span>
          ) : null}

          {/* PRODUCT PRICE WITH DISCOUNT */}
          <ProductPrice originalPrice={originalPrice} currentprice={currentprice} />
        </Box>

        {/* PRODUCT QUANTITY HANDLER BUTTONS */}
        <QuantityButtons
          quantity={increment}
          handleIncrement={handleIncrementQuantity}
          handleDecrement={handleDecrementQuantity}
        />
      </ContentWrapper>
    </StyledBazaarCard>
  );
}
