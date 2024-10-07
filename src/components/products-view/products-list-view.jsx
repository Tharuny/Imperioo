import Pagination from "@mui/material/Pagination"; // GLOBAL CUSTOM COMPONENTS

import { Span } from "components/Typography";
import FlexBetween from "components/flex-box/flex-between";
import { ProductCard9 } from "components/product-cards/product-card-9"; // CUSTOM DATA MODEL
  import ProductCard1 from "components/product-cards/product-card-1/product-card";
import { useSelector } from "react-redux";
import { useEffect } from "react";
// ==========================================================
export default function ProductsListView({
  products
}) {
  // Access the wishlist from the Redux store
  const wishlist = useSelector(state => state.wishlist.wishlistData);
  
  // Create a Set of wishlist product IDs for quick lookup
  const wishlistProductIds = new Set(wishlist.map(item => item.productid));

  // Effect to log changes in wishlist
  useEffect(() => {
  }, [wishlist]);


  return <div>
      {products.map(item => 
      <ProductCard9 id={item.id} key={item.id} slug={item.productid} title={item.productname} currentprice={item.currentprice} originalprice={item.originalprice} discount={item.discount} rating={item.rating} imgUrl={item.thumbnail}  isfav={wishlistProductIds.has(item.productid)}/>)}

      <FlexBetween flexWrap="wrap" mt={4}>
        <Span color="grey.600">Showing 1-9 of 1.3k Products</Span>
        <Pagination count={10} variant="outlined" color="primary" />
      </FlexBetween>
    </div>;
}