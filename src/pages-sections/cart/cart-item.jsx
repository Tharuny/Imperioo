import React from 'react';
import Link from "next/link";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import Remove from "@mui/icons-material/Remove";
import Image from "components/BazaarImage";
import { Span } from "components/Typography";
import { FlexBox } from "components/flex-box";
import useCart from "hooks/useCart";
import { currency } from "lib";
import { Wrapper } from "./styles";

const CartItem = ({
  id,
  name,
  qty,
  price,
  imgUrl,
  slug
}) => {
  const { dispatch } = useCart();

  const handleCartAmountChange = amount => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        id,
        name,
        price,
        imgUrl,
        qty: amount,
        slug
      }
    });
  };

  return (
    <Wrapper>
      <Image alt={name} width={140} height={140} display="block" src={imgUrl || "/assets/images/furniture-products/b-3.png"} />
      <IconButton size="small" onClick={handleCartAmountChange(0)} sx={{
        position: "absolute",
        right: 15,
        top: 15
      }}>
        <Close fontSize="small" />
      </IconButton>
      <FlexBox p={2} rowGap={2} width="100%" flexDirection="column">
        <Link href={`/products/${slug}`}>
          <Span ellipsis fontWeight="600" fontSize={18}>
            {name}
          </Span>
        </Link>
        <FlexBox gap={1} flexWrap="wrap" alignItems="center">
          <Span color="grey.600">
            {currency(price)} x {qty}
          </Span>
          <Span fontWeight={600} color="primary.main">
            {currency(price * qty)}
          </Span>
        </FlexBox>
        <FlexBox alignItems="center">
          <Button color="primary" sx={{
            p: "5px"
          }} variant="outlined" disabled={qty === 1} onClick={handleCartAmountChange(qty - 1)}>
            <Remove fontSize="small" />
          </Button>
          <Span mx={1} fontWeight={600} fontSize={15}>
            {qty}
          </Span>
          <Button color="primary" sx={{
            p: "5px"
          }} variant="outlined" onClick={handleCartAmountChange(qty + 1)}>
            <Add fontSize="small" />
          </Button>
        </FlexBox>
      </FlexBox>
    </Wrapper>

  );
};

export default CartItem;
