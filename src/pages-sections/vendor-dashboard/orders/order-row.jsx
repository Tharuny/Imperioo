import { useRouter } from "next/navigation";
import { format } from "date-fns"; // MUI ICON COMPONENTS

import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye"; // CUSTOM UTILS LIBRARY FUNCTION

import { currency } from "lib"; // STYLED COMPONENTS

import { StatusWrapper, StyledIconButton, StyledTableCell, StyledTableRow } from "../styles"; // ========================================================================

// ========================================================================
const OrderRow = ({
  order
}) => {
  const {
    user_id,
    product_id,
    qty,
    order_date,
    purchaseDate,
    price
  } = order || {};
  const getDeliveryStatus=(deliveryDate)=> {
      const currentDate = new Date();
      const expectedDate = new Date(deliveryDate);

      if (expectedDate < currentDate) {
          return 'Delivered';
      } else {
          return 'Pending';
      }
  }

  const router = useRouter();
  const billingAddress = "Akkadey"
  console.log(order,"orderdata");
  return <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">{order.firstname}</StyledTableCell>
      <StyledTableCell align="left">{order.productname}</StyledTableCell>

      <StyledTableCell align="left" sx={{
      fontWeight: 400
    }}>
        {qty}
      </StyledTableCell>

      <StyledTableCell align="left" sx={{
      fontWeight: 400
    }}>
        {billingAddress}
      </StyledTableCell>

      <StyledTableCell align="left">{currency(price)}</StyledTableCell>

      <StyledTableCell align="left">
        <StatusWrapper >{getDeliveryStatus(order.expected_delivery)}</StatusWrapper>
      </StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton onClick={() => router.push(`/admin/orders/${id}`)}>
          <RemoveRedEye />
        </StyledIconButton>

        <StyledIconButton>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>;
};

export default OrderRow;