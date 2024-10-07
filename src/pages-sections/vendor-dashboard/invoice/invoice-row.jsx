import { useRouter } from "next/navigation";
import { format } from "date-fns"; // MUI ICON COMPONENTS

import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye"; // CUSTOM UTILS LIBRARY FUNCTION

import { currency } from "lib"; // STYLED COMPONENTS

import {
  StatusWrapper,
  StyledIconButton,
  StyledTableCell,
  StyledTableRow,
} from "../styles"; // ========================================================================

// ========================================================================
const InvoiceRow = ({ invoice }) => {
  const { id, number, url } = invoice || {};
  const router = useRouter();
  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">{number}</StyledTableCell>
      <StyledTableCell align="left">
        <a href="#">{url}</a>
      </StyledTableCell>

      {/* <StyledTableCell
        align="left"
        sx={{
          fontWeight: 400,
        }}
      >
        {/* {format(new Date(purchaseDate), "dd MMM yyyy")} */}
      {/* </StyledTableCell> */}

      {/* <StyledTableCell
        align="left"
        sx={{
          fontWeight: 400,
        }}
      >
        {billingAddress}
      </StyledTableCell>

      <StyledTableCell align="left">{currency(amount)}</StyledTableCell>

      <StyledTableCell align="left">
        <StatusWrapper status={status}>{status}</StatusWrapper>
      </StyledTableCell> */}

      <StyledTableCell align="center">
        <StyledIconButton onClick={() => router.push(`/admin/orders/${id}`)}>
          <RemoveRedEye />
        </StyledIconButton>

        <StyledIconButton>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default InvoiceRow;
