import Link from "next/link";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import styled from "@mui/material/styles/styled"; // GLOBAL CUSTOM COMPONENTS

import Image from "components/BazaarImage";
import { H5 } from "components/Typography";
import { FlexBox } from "components/flex-box"; // LOCAL CUSTOM HOOK

import useProduct from "../use-product"; // LOCAL CUSTOM COMPONENTS

import DiscountChip from "../discount-chip";
import ProductPrice from "../product-price";
import AddToCartButton from "./components/add-to-cart";
import FavoriteButton from "./components/favorite-button"; // STYLED COMPONENT

const Wrapper = styled(Card)({
  width: "100%",
  overflow: "hidden",
  position: "relative",
  marginBottom: "1.25rem",
  ":hover": {
    transform: "translateY(-2px)",
    boxShadow:"0 4px 12px rgba(0, 0, 0, 0.2)",
  }
}); // ===========================================================

// ===========================================================
export default function ProductCard9(props) {
  const {
    imgUrl,
    title,
    currentprice,
    originalprice,
    discount,
    rating,
    id,
    slug,
    isfav
  } = props || {};
  const {
    cartItem,
    handleCartAmountChange,
    isFavorite,
    toggleDialog,
    toggleFavorite
  } = useProduct(slug);

  const handleIncrementQuantity = () => {
    const product = {
      id,
      slug,
      currentprice,
      imgUrl,
      name: title,
      qty: (cartItem?.qty || 0) + 1
    };
    handleCartAmountChange(product);
  };

  const handleDecrementQuantity = () => {
    const product = {
      id,
      slug,
      price,
      imgUrl,
      name: title,
      qty: (cartItem?.qty || 0) - 1
    };
    handleCartAmountChange(product, "remove");
  };

  return <Wrapper>
      {
      /* PRODUCT FAVORITE BUTTON */
    }
       <FavoriteButton productId={slug} isFavorite={isfav} toggleView={toggleDialog} toggleFavorite={toggleFavorite} />
      <Grid container spacing={1}>
        <Grid item sm={3} xs={12}>
          <Box position="relative">
            {
            /* DISCOUNT PERCENT CHIP IF AVAILABLE */
          }
            <DiscountChip discount={discount} />

            {
            /* PRODUCT IMAGE / THUMBNAIL */
          }
            <Image src="/assets/images/furniture-products/b-3.png" alt={title} width="100%" />
          </Box>
        </Grid>

        <Grid item sm={9} xs={12}>
          <FlexBox flexDirection="column" justifyContent="center" height="100%" p={2}>
            {
            /* PRODUCT TITLE / NAME */
          }
            <Link href={`/products/${slug}`}>
              <H5 fontWeight="600" my="0.5rem">
                {title}
              </H5>
            </Link>

            {
            /* PRODUCT RATING / REVIEW  */
          }
            <Rating size="small" value={rating} color="warn" readOnly />

            {
            /* PRODUCT PRICE */
          }
            <ProductPrice originalPrice={originalprice} currentprice={currentprice}  />

            {
            /* PRODUCT ADD TO CART BUTTON */
          }
            <AddToCartButton quantity={cartItem?.qty} handleDecrement={handleDecrementQuantity} handleIncrement={handleIncrementQuantity} />
          </FlexBox>
        </Grid>
      </Grid>
    </Wrapper>;
}