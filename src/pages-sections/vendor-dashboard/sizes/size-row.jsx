'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar"; // MUI ICON COMPONENTS
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye"; // GLOBAL CUSTOM COMPONENT
import BazaarSwitch from "components/BazaarSwitch"; // STYLED COMPONENTS
import { StyledIconButton, StyledTableCell, StyledTableRow } from "../styles";
import { useDispatch, useSelector } from "react-redux";
import { deleteSizeData } from "app/store/sizeRedux/sizeSlice";
import { deleteSize } from "app/store/sizeRedux/sizeAction";
import { Snackbar, Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

const SizeRow = ({ sizeData }) => {
  const [sizeDataa, setSizeDataa] = useState(sizeData);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    console.log("reload");
  }, [sizeData])

  // const {
  //   name,
  //   featured,
  //   logo,
  //   id,
  //   slug
  // } = size || {};
  const router = useRouter();
  const dispatch = useDispatch();
  const data = useSelector(state => state.user.sizeDetails);
  // console.log("vijit",id);
  // const [featuredCategory, setFeaturedCategory] = useState(featured);
  // const hasSelected = selected.indexOf(name) !== -1;
  const handleNavigate = () => router.push(`/admin/sizes/${slug}`);
  const handleSubmit = () => {
    dispatch(deleteSize(sizeData.sizeid));
    setSnackbarMessage("Size deleted successfully");
    setSnackbarOpen(true);
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <StyledTableRow tabIndex={-1} role="checkbox">
        <StyledTableCell align="center">{sizeData.sizeid}</StyledTableCell>
        <StyledTableCell align="center">{sizeData.sizename}</StyledTableCell>

        {/* <StyledTableCell align="center">
          <Avatar alt={name}  sx={{
          width: 55,
          height: "auto",
          margin: "auto",
          borderRadius: 0
        }} />
        </StyledTableCell> */}

        <StyledTableCell align="center">
          {/* <BazaarSwitch color="info" checked={featuredCategory} onChange={() => setFeaturedCategory(state => !state)} /> */}
        </StyledTableCell>

        <StyledTableCell align="center">
          <StyledIconButton onClick={handleNavigate}>
            <RemoveRedEye />
          </StyledIconButton>

          <StyledIconButton onClick={handleSubmit}>
            <Delete />
          </StyledIconButton>
        </StyledTableCell>
      </StyledTableRow>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
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

export default SizeRow;