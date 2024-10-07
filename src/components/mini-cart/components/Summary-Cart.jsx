'use Client'
import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton"; // MUI ICON COMPONENTS

import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import Remove from "@mui/icons-material/Remove"; // GLOBAL CUSTOM COMPONENTS

import { FlexBox } from "components/flex-box";
import { H6, Tiny } from "components/Typography"; // CUSTOM UTILS LIBRARY FUNCTION

import { currency } from "lib"; // CUSTOM DATA MODEL
import { useSelector, useDispatch } from "react-redux";
import { addProductToCart } from "app/store/UserCartRedux/UserCartAction"; // Import your action
import { useEffect, useState } from "react";
import { deleteOrder } from "app/store/placeorderRedux/placeorderAction";

// ==============================================================

export default function MiniCartItems({ item, handleCartAmountChange }) {
  const userValid = useSelector((state) => state.user.loginVerified);
  const userId = useSelector((state) => state.user.userid);
  const [increment, setIncrement] = useState(Number(item.quantity));
  const dispatch = useDispatch(); // Use useDispatch to dispatch actions
  // const cartData = useSelector((state) => state.cartModified.cartData);
  

  const handleIncrementQuantity = () => {
    if (userValid) {
      setIncrement((increment) => {
        return increment + 1; // Return the new increment value
      });
      
      const productData = {
        id: item.productid,
        userid: item.userid,
        qty: increment + 1,
        remainingqty: 0,
      };

      console.log(productData, "step1.1");

      // Dispatch action to add product to cart
      dispatch(addProductToCart(productData));
    } else {
      router.push("/login");
    }
  };

  const handleDecrementQuantity = () => {
    if (userValid) {
      setIncrement((increment) => {
        return increment > 0 ? increment - 1 : 0;
      });

      const productData = {
        id: item.productid,
        userid: item.userid,
        qty: increment - 1,
        remainingqty: 0,
      };

      console.log(productData, "step1.2");
      dispatch(addProductToCart(productData));
    } else {
      router.push("/login");
    }
  };

  const productBysub = useSelector(state => state.productBySubCategory.productsBasedOnSubcategories);

  // Find the product in productBysub based on productid
  const product = productBysub.find(product => product.productid === item.productid);

  // Use the found product name or fall back to a default name
  const productname = product ? product.productname : "Unknown Product";


  const deleteCartItems = ()=>{
    // console.log("dcart items deleted");
    const userIdProductId ={
      user:userId,
      product:item.productid
    }
    // console.log("hitted");
    dispatch(deleteOrder(userIdProductId));
  }

  return (
    <FlexBox py={2} px={2.5} key={item.id} alignItems="center" borderBottom="1px solid" borderColor="divider">
      <FlexBox alignItems="center" flexDirection="column">
        <Button size="small" color="primary" variant="outlined" onClick={handleIncrementQuantity} sx={{
          height: 28,
          width: 28,
          borderRadius: 50
        }}>
          <Add fontSize="small" />
        </Button>

        <H6 my="3px">{increment}</H6>

        <Button size="small" color="primary" variant="outlined" disabled={item.qty === 1} onClick={handleDecrementQuantity} sx={{
          height: 28,
          width: 28,
          borderRadius: 50
        }}>
          <Remove fontSize="small" />
        </Button>
      </FlexBox>

      <Link href={`/products/${item.id}`}>
        <Avatar alt={productname} src="/assets/images/furniture-products/b-3.png" sx={{
          mx: 2,
          width: 100,
          height: 100
        }} />
      </Link>

      <Box flex="1" textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden">
        <Link href={`/products/${item.slug}`}>
          <H6 ellipsis className="title">
            {productname}
          </H6>
        </Link>

        <Tiny color="grey.600">
          {currency(item.currentprice)} x {item.quantity}
        </Tiny>

        <H6 color="primary.main" mt={0.5}>
          {currency(item.quantity * item.currentprice )}
        </H6>
      </Box>
      {/* onClick={() => handleCartAmountChange(0, item)} */}
      <IconButton size="small" onClick={()=> deleteCartItems()}  sx={{
        marginLeft: 2.5
      }}>
        <Close fontSize="small" />
      </IconButton>
    </FlexBox>
  );
}
