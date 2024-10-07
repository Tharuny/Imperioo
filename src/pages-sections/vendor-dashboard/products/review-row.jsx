import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Delete from "@mui/icons-material/Delete";
import { FlexBox } from "components/flex-box";
import BazaarSwitch from "components/BazaarSwitch";
import { Paragraph, Small } from "components/Typography";
import { StyledIconButton, StyledTableCell, StyledTableRow } from "../styles";
import { useDispatch, useSelector } from "react-redux";
import { deleteReviewByID, getReview } from "app/store/reviewRedux/reviewAction";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
 
const ReviewRow = (props) => {
  console.log(props);
  const { productid, productname, firstname, reviewid } = props.productReview;
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('success');
 
  async function handleDelete() {
    try {
      console.log("Starting delete operation");
      const result = await dispatch(deleteReviewByID(props.productReview));
      console.log(result, "vachindhi mowaa");
      if (result.status === 'success') {
        console.log("Delete successful, refreshing reviews");
        showSnackbar('delete', 'Review deleted successfully');
        dispatch(getReview("AllProducts"));
      } else {
        console.error('Failed to delete review:', result.message);
        showSnackbar('error', 'Failed to delete review');
      }
    } catch (error) {
      console.error('An error occurred in handleDelete:', error);
      showSnackbar('error', 'An error occurred while deleting the review');
    }
  }
 
  const showSnackbar = (type, message) => {
    setSnackbarType(type);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
 
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };
 
  const getSnackbarColor = (type) => {
    switch (type) {
      case 'delete':
        return '#ff9800'; // Orange for delete
      case 'error':
        return '#f44336'; // Red for error
      default:
        return '#4caf50'; // Green for success
    }
  };
 
  return (
    <>
      <StyledTableRow tabIndex={-1} role="checkbox">
        <StyledTableCell align="left">
          <FlexBox alignItems="center" gap={1.5}>
            <p style={{color:'black'}}>
              {props.productReview.productname}
            </p>
          </FlexBox>
        </StyledTableCell>
        <StyledTableCell align="left">{props.user}</StyledTableCell>
        <StyledTableCell align="left">
          <Small>{props.productReview.reviewcomment}</Small>
        </StyledTableCell>
        <StyledTableCell align="center">
          <StyledIconButton onClick={handleDelete}>
            <Delete />
          </StyledIconButton>
        </StyledTableCell>
      </StyledTableRow>
 
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: getSnackbarColor(snackbarType),
          color: 'white',
          padding: '6px 16px',
          borderRadius: '4px',
          boxShadow: '0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12)',
        }}>
          {snackbarType === 'delete' ? (
            <Delete sx={{ marginRight: 1 }} />
          ) : (
            <CheckCircleOutlineIcon sx={{ marginRight: 1 }} />
          )}
          <Typography variant="body2">{snackbarMessage}</Typography>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
            sx={{ marginLeft: 'auto' }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Snackbar>
    </>
  );
};
 
export default ReviewRow;