'use client'
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider"; // GLOBAL CUSTOM HOOK

import useCart from "hooks/useCart"; // LOCAL CUSTOM COMPONENTS

import TopHeader from "./components/top-header";
import MiniCartItem from "./components/cart-item";
import EmptyCartView from "./components/empty-view";
import BottomActions from "./components/bottom-actions"; // GLOBAL CUSTOM COMPONENT

import Scrollbar from "components/scrollbar"; // CUSTOM UTILS LIBRARY FUNCTION

import { currency } from "lib"; // CUSTOM DATA MODEL
import { useSelector } from "react-redux";
import { useEffect } from "react";
// =========================================================
export default function MiniCart({
  toggleSidenav
}) {
  const {
    push
  } = useRouter();


  const cartData = useSelector((state) => state.cartModified.cartData);
  useEffect(()=>{
  },[cartData])
  console.log(cartData,"cartData");
  
  const handleCartAmountChange = (amount, product) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { ...product,
        qty: amount
      }
    });
  };

  const getTotalPrice = () => {
    return cartData.reduce((acc, item) => acc + item.currentprice * item.quantity, 0);
  };

  const handleNavigate = path => () => {
    toggleSidenav();
    push(path);
  };

  return <Box width="100%" minWidth={380}>
      {
      /* HEADING SECTION */
    }
      <TopHeader toggle={toggleSidenav} total={cartData.length} />

      <Divider />

      <Box height={`calc(100vh - ${cartData.length ? "207px" : "75px"})`}>
        {
        /* CART ITEM LIST */
      }
        {cartData.length > 0 ? <Scrollbar>
            {cartData.map(item => <MiniCartItem item={item} key={item.productid} handleCartAmountChange={handleCartAmountChange} />)}
          </Scrollbar> : <EmptyCartView />}
      </Box>

      {
      /* CART BOTTOM ACTION BUTTONS */
    }
      {cartData.length > 0 ? <BottomActions total={currency(getTotalPrice())} handleNavigate={handleNavigate} /> : null}
    </Box>;
}