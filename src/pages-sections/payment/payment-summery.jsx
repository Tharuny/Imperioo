import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider"; // LOCAL CUSTOM COMPONENT

import PaymentItem from "./payment-item"; // GLOBAL CUSTOM COMPONENTS

import { Paragraph } from "components/Typography"; // CUSTOM UTILS LIBRARY FUNCTION

import { calculateDiscount, currency } from "lib";
import useCart from "hooks/useCart";

export default function PaymentSummary() {
  const {
    state
  } = useCart();
  const getTotalPrice = () => state.cart.reduce((acc, item) => (acc + item.price * item.qty), 0);
  return 
  // <Card sx={{
  //   padding: {
  //     sm: 3,
  //     xs: 2
  //   }
  // }}>
  //     <PaymentItem title="Subtotal:" amount={getTotalPrice()} />
  //     <PaymentItem title="Shipping:" />
  //     <PaymentItem title="Tax:" amount={40} />
  //     <PaymentItem title="Discount:" amount={40} />

  //     <Divider sx={{
  //     my: 2
  //   }} />

  //     <Paragraph fontSize={25} fontWeight={600} lineHeight={1} textAlign="right">
  //       {currency(getTotalPrice())}
  //     </Paragraph>
  //   </Card>;
}