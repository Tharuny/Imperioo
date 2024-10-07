import React, { Fragment, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import { Span } from "components/Typography";
import { FlexBetween } from "components/flex-box";
import ProductCard from "components/product-cards/product-card/product-card";
import { useDispatch, useSelector } from "react-redux";
import { clearsearchProduct } from "app/store/SearchProductRedux/searchProductSlice";
import { getCartProducts } from "app/store/UserCartRedux/UserCartAction";
import { capital } from "app/store/capitalize/capitalizeText";
export default function ProductsGridView({ products }) {
  // Access the wishlist from the Redux store
  const wishlist = useSelector((state) => state.wishlist.wishlistData);
  const cartData = useSelector((state) => state.cartModified.cartData);
  let searchProducts = useSelector((state) => state.search.searchData);
  const userId = useSelector((state) => state.user.userid);
  const [data,setData]=useState([]);
  const dispatch=useDispatch();


  useEffect(()=>{
    dispatch(clearsearchProduct())
  },[])

  useEffect(()=>{
    dispatch(getCartProducts(userId));
    if(searchProducts.length!=0){
    setData(searchProducts)
    }
    else{
      setData(products)
    }
  },[searchProducts])//searchProducts - removed SearchProducts --**samuel**

  
  // Create a Set of wishlist product IDs for quick lookup
  const wishlistProductIds = new Set(wishlist.map((item) => item.productid));

  const productsLength = products.length;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage =6; // Set the number of items per page

  // Calculate the current products to display
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;

  const currentProducts = searchProducts.length
    ? searchProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    : products.slice(indexOfFirstProduct, indexOfLastProduct);

    const result = currentProducts.map(product => {
      const cartItem = cartData.find(cart => cart.productid === product.productid);
      return {
          ...product,
          quantity: cartItem ? cartItem.quantity : 0 ,
          remaining_qty: cartItem ? cartItem.remaining_qty : 0 
      };
  });

  // getting cart data based on userid 
  

  // Handle page change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Converting to Encode for slug
  const encode = (name, id) => {
    let slugString = "key=" + name + "&upi="; // Adding Remaining Text and encoded id
    let encodedid = slugString
      + Buffer.from(id).toString("base64")
        .replace(/\+/g, "-") // Replace '+' with '-' for URL safety
        .replace(/\//g, "_") // Replace '/' with '_' for URL safety
        .replace(/=+$/, ""); // Remove trailing '=' characters
    return encodedid;
  };

  const totalProducts = searchProducts.length ? searchProducts.length : productsLength;

  return (
    <Fragment>
      <Grid container spacing={3}>
        {result.map((item) => (
          <Grid item lg={4} sm={6} xs={12} key={item.productid}>
            <ProductCard
              id={item.productid}
              slug={encode(item.productname, item.productid)}
              title={item.productname}
              currentprice={item.currentprice}
              rating={item.overallrating}
              imgUrl={item.thumbnail}
              discount={item.discount}
              originalPrice={item.originalprice}
              specs={item.specification}
              fav={wishlistProductIds.has(item.productid)}
              qty={item.quantity}
              orginalQty = {item.remaining_qty}
            />
          </Grid>
        ))}
        
        
      </Grid>

      <FlexBetween flexWrap="wrap" mt={4}>
        <Span color="grey.600">
          Showing {indexOfFirstProduct + 1} - {Math.min(indexOfLastProduct, totalProducts)} of {totalProducts} Products
        </Span>
        <Pagination
          count={Math.ceil(totalProducts / itemsPerPage)}
          variant="outlined"
          color="primary"
          page={currentPage}
          onChange={handlePageChange}
        />
      </FlexBetween>
    </Fragment>
  );
}
