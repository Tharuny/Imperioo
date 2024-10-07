"use client";

import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import useCart from "hooks/useCart";
import CartItem from "../cart-item";
import CheckoutForm from "../checkout-form";


export default function CartPageView() {
  const { state } = useCart();
  
  return (
    <Grid container spacing={3}>
      {/* CART PRODUCT LIST */}
     
      <Grid item md={8} xs={12}>
        {state.cart.map(({ name, id, currentprice, qty, slug, imgUrl }) => (
          <CartItem
            id={id}
            key={id}
            qty={qty}
            name={name}
            slug={slug}
            price={currentprice}
            imgUrl={imgUrl}
          />
        ))}  
       </Grid>

     
      <Grid item md={4} xs={12}>
        {/* CONDITIONAL RENDERING OF CHECKOUT FORM */}
            <CheckoutForm />
      </Grid>
    </Grid>
  );
}
