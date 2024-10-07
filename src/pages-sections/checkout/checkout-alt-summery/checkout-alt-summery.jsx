"use client";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider"; // GLOBAL CUSTOM COMPONENTS

import { Paragraph } from "components/Typography"; // GLOBAL CUSTOM HOOK

import useCart from "hooks/useCart"; // LOCAL CUSTOM COMPONENTS
import { currency } from "lib" ;
import CartItem from "./cart-item";
import ListItem from "../list-item";
export default function CheckoutAltSummary() {
  const {
    state
  } = useCart();
  const getTotalPrice = () => state.cart.reduce((acc, item) => acc + item.currentprice * item.qty, 0);
  return <div>
      <Paragraph color="secondary.900" fontWeight={700} mb={2}>
        Your order
      </Paragraph>

      {state.cart.map(({
      name,
      qty,
      currentprice,
      id
    }) => <CartItem name={name} price={currentprice} qty={qty} key={id} />)}

      <Box component={Divider} borderColor="grey.300" my={3} />

      <ListItem title="Subtotal" value={currency(getTotalPrice())} />
      <ListItem title="Shipping" />
      <ListItem title="Tax" value={40} />
      <ListItem title="Discount" mb={3} />

      <Box component={Divider} borderColor="grey.300" mb={1} />

      <ListItem title="Total" value={currency(getTotalPrice()+40)} color="inherit" />
    </div>;
}