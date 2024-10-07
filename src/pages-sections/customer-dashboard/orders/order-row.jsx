import Link from "next/link";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import East from "@mui/icons-material/East";
import { isAfter } from 'date-fns';
import { format } from "date-fns"; // GLOBAL CUSTOM COMPONENT

import { H5, Paragraph } from "components/Typography"; // Local CUSTOM COMPONENT

import TableRow from "../table-row"; // CUSTOM UTILS LIBRARY FUNCTION

import { currency } from "lib"; // CUSTOM DATA MODEL

// =================================================
export default function OrderRow({
  order
}) {

  const getColor = status => {
    switch (status) {
      case "Pending":
        return "secondary";

      case "Processing":
        return "secondary";

      case "Delivered":
        return "success";

      case "Cancelled":
        return "primary";

      default:
        return "default";
    }
  };

  const getStatusByDate = (expectedDeliveryDate) => {
    // Get the current date
    const currentDate = new Date();
  
    // Convert the expectedDeliveryDate to a Date object
    const deliveryDate = new Date(expectedDeliveryDate);
  
    // Check if the current date is after the delivery date
    if (isAfter(currentDate, deliveryDate)) {
      return "Delivered";
    } else {
      return "Pending";
    }
  };

  return <Link href={`/orders/${order.id}`}>
      <TableRow sx={{
      gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr"
    }}>
        <H5 ellipsis>{order.firstname}</H5>

        <Box textAlign="center">
          <Chip size="small" label={getStatusByDate(order.expected_delivery)} color={getColor(order.status)} />
        </Box>

        <Paragraph textAlign={{
        sm: "center",
        xs: "left"
      }}>
          {/* {format(new Date(order.createdAt), "MMM dd, yyyy")} */}
          {order.expected_delivery.split("T")[0]}
        </Paragraph>
        
        <Paragraph textAlign="center">{currency(order.price*order.qty)} ({order.qty} pcs)</Paragraph>

        

        <Box display={{
        sm: "inline-flex",
        xs: "none"
      }} justifyContent="end">
          <IconButton>
            <East fontSize="small" sx={{
            color: "grey.500",
            transform: ({
              direction
            }) => `rotate(${direction === "rtl" ? "180deg" : "0deg"})`
          }} />
          </IconButton>
        </Box>
      </TableRow>
    </Link>;
}