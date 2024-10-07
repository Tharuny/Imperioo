import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField"; // LOCAL CUSTOM COMPONENT

import useCart from "hooks/useCart"; // GLOBAL CUSTOM COMPONENTS


import ListItem from "../list-item"; // GLOBAL CUSTOM COMPONENTS

import { Paragraph } from "components/Typography"; // CUSTOM UTILS LIBRARY FUNCTION
import { useState } from "react";

import { calculateCartDiscount, currency } from "lib";
export default function CheckoutSummary() {
  const {
    state
  } = useCart();
  const [voucher,setVoucher] = useState(0);
  const [applyVoucher,setApplyVoucher] = useState(false);
  const getTotalPrice = () => state.cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const voucherField = (e) =>{
      setVoucher(e.target.value)    
  }
  const onClickVoucher = () =>{
      setApplyVoucher(true)
  }
 
  return <Card sx={{
    p: 3
  }}>
      <ListItem mb={1} title="Subtotal" value={getTotalPrice()} />
      <ListItem mb={1} title="Shipping" />
      <ListItem mb={1} title="Tax" value={40} />
      <ListItem mb={1} title="Discount"  />

      <Divider sx={{
      my: 2
    }} />

      <Paragraph fontSize={25} fontWeight={600} lineHeight={1}>
      {applyVoucher && calculateCartDiscount(getTotalPrice(),voucher)}
      {!applyVoucher && currency(getTotalPrice())}
      </Paragraph>

      <Stack spacing={2} mt={3} mb={2}>
        <TextField placeholder="Voucher" onBlur={voucherField} variant="outlined" size="small" fullWidth />
        <Button variant="outlined" onClick={onClickVoucher} color="primary" fullWidth >
          Apply Voucher
        </Button>
      </Stack>
      
      
      {/* <Button  fullWidth color="primary" href="/checkout" variant="contained" >
        Checkout Now
      </Button> */}
    </Card>;
}