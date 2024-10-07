// "use client";

// import Box from "@mui/material/Box";
// import Divider from "@mui/material/Divider"; // GLOBAL CUSTOM COMPONENTS

// import { Paragraph } from "components/Typography"; // GLOBAL CUSTOM HOOK

// import useCart from "hooks/useCart"; // LOCAL CUSTOM COMPONENTS

// import CartItem from "./cart-item";
// import ListItem from "../list-item";

// export default function Summary(){

//     // const {
//     //     state
//     //   } = useCart();  


//       return 
//       // <div>
//       //     <Paragraph color="secondary.900" fontWeight={700} mb={2}>
//       //       Your order
//       //     </Paragraph>
    
//       //     {state.cart.map(({
//       //     name,
//       //     qty,
//       //     price,
//       //     id
//       //   }) => <CartItem name={name} price={price} qty={qty} key={id} />)}
    
//       //     {/* <Box component={Divider} borderColor="grey.300" my={3} />
    
//       //     <ListItem title="Subtotal" value={2610} />
//       //     <ListItem title="Shipping" />
//       //     <ListItem title="Tax" value={40} />
//       //     <ListItem title="Discount" mb={3} />
    
//       //     <Box component={Divider} borderColor="grey.300" mb={1} />
    
//       //     <ListItem title="Total" value={2650} color="inherit" /> */}
//       //   </div>;
// }







 
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";

import useCart from "hooks/useCart"; // LOCAL CUSTOM COMPONENTS

import MiniCartItems from "components/mini-cart/components/Summary-Cart";
import EmptyCartView from "components/mini-cart/components/empty-view";


import Scrollbar from "components/scrollbar"; // CUSTOM UTILS LIBRARY FUNCTION

import { currency } from "lib"; // CUSTOM DATA MODEL
import { useSelector } from "react-redux";


// =========================================================
export default function MiniCart({
  toggleSidenav
}) 
{
  const {push} = useRouter();
  // const {state,dispatch} = useCart();
  const cartList = useSelector((state) => state.cartModified.cartData);
  console.log(cartList,"carrt");

  const handleCartAmountChange = (quantity, product) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { ...product,
        qty: quantity
      }
    });
  };
  
  const getTotalPrice = () => {
    return cartList.reduce((acc, item) => acc + item.currentprice * item.qty, 0);
  };

  const handleNavigate = path => () => {
    toggleSidenav();
    push(path);
  };

  return <Box width="100%" minWidth={380}>
    
      {/* <Box height={`calc(100vh - ${cartList.length ? "207px" : "75px"})`}> */}
        
        {cartList.length > 0 ? 
        <Scrollbar>
            {cartList.map(item => <MiniCartItems item={item} key={item.id} handleCartAmountChange={handleCartAmountChange} />)}
          </Scrollbar> : <EmptyCartView />}
      {/* </Box> */}

    </Box>;
}