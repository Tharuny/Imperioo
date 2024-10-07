import { useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import { FlexBox } from "components/flex-box";
import BazaarSwitch from "components/BazaarSwitch";
import { Paragraph, Small } from "components/Typography";
import { currency } from "lib";
import { StyledTableRow, CategoryWrapper, StyledTableCell, StyledIconButton } from "../styles";
import { useDispatch } from "react-redux";
import { deleteProductById } from "app/store/vendorRedux/ProductRedux/productAction";
import { Snackbar, Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

const ProductRow = ({
  productid, category, categoryid, name, price, subcategory, subcategoryid, status, slug
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleClickDelete = () => {
    dispatch(deleteProductById(productid));
    setSnackbarMessage(`Product Deleted Successfully`);
    setSnackbarOpen(true);
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  console.log("name", name, "category", category, "subcategory", subcategory, "price", price)

  return (
    <>
      <StyledTableRow tabIndex={-1} role="checkbox">
        <StyledTableCell align="left">
          {name}
        </StyledTableCell>
        <StyledTableCell align="left">
          {category}
        </StyledTableCell>
        <StyledTableCell align="left">
          {subcategory}
        </StyledTableCell>
        <StyledTableCell align="left">{currency(price)}</StyledTableCell>
        <StyledTableCell align="left">
          <StyledIconButton onClick={() => router.push(`/admin/products/${slug}`)}>
            <Edit />
          </StyledIconButton>
          <StyledIconButton onClick={handleClickDelete}>
            <Delete />
          </StyledIconButton>
        </StyledTableCell>
      </StyledTableRow>
















      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: '#f3722c',
            color: 'white',
          }
        }}
        message={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <DeleteIcon sx={{ marginRight: 1 }} />
            <Typography variant="body2">{snackbarMessage}</Typography>
          </Box>
        }
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </>
  );
};

export default ProductRow;