import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Box, Button, IconButton, Modal, TextField, Typography,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { StyledTableRow, StyledTableCell, StyledIconButton } from "../styles";
import { deleteCategoryById, updateCategoryById, getCategoriesFromVendor } from "app/store/vendorRedux/CategoryRedux/categoryAction";
import Snackbar from '@mui/material/Snackbar';

const CategoryRow = ({ id, category, status }) => {
  const dispatch = useDispatch();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(category);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('success');

  useEffect(() => {
    console.log("Snackbar state changed:", snackbarOpen, snackbarMessage, snackbarType);
  }, [snackbarOpen, snackbarMessage, snackbarType]);

  const handleEdit = () => setEditModalOpen(true);

  const handleEditModalClose = async () => {
    const updateCategory = {
      id: id,
      name: editData,
    };
    try {
      await dispatch(updateCategoryById(updateCategory));
      showSnackbar('update', `Category updated successfully`);
      setEditModalOpen(false);
      dispatch(getCategoriesFromVendor());
    } catch (error) {
      showSnackbar('error', 'Error updating category');
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteCategoryById({ id }))
      showSnackbar('delete', `Category deleted successfully`)
    } catch (error) {
      showSnackbar('error', 'Error deleting category');
    }
  };

  const showSnackbar = (type, message) => {
    setSnackbarType(type);
    setSnackbarMessage(message);
    setSnackbarOpen(true);  // Open the Snackbar
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const getSnackbarColor = (type) => {
    switch (type) {
      case 'update':
        return '#2196f3'; // Blue
      case 'delete':
        return '#ff9800'; // Orange
      case 'error':
        return '#f44336'; // Red
      default:
        return '#4caf50'; // Green
    }
  };

  const getSnackbarIcon = (type) => {
    switch (type) {
      case 'update':
        return <CheckCircleOutlineIcon sx={{ marginRight: 1 }} />;
      case 'delete':
        return <DeleteIcon sx={{ marginRight: 1 }} />;
      case 'error':
        return <ErrorOutlineIcon sx={{ marginRight: 1 }} />;
      default:
        return <CheckCircleOutlineIcon sx={{ marginRight: 1 }} />;
    }
  };

  console.log(snackbarMessage);

  return (
    <>
      <StyledTableRow tabIndex={-1} role="checkbox">
        <StyledTableCell align="left">{category}</StyledTableCell>
        <StyledTableCell align="left">{status}</StyledTableCell>
        <StyledTableCell align="start">
          <StyledIconButton onClick={handleEdit}>
            <EditIcon />
          </StyledIconButton>
          <StyledIconButton onClick={handleDelete}>
            <DeleteIcon />
          </StyledIconButton>
        </StyledTableCell>
      </StyledTableRow>

      <Modal
        open={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        aria-labelledby="edit-modal-title"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography id="edit-modal-title" variant="h6" component="h2" mb={2}>
            Edit Category
          </Typography>
          <TextField
            fullWidth
            label="Category Name"
            value={editData}
            onChange={(e) => setEditData(e.target.value)}
            margin="normal"
          />
          <Button onClick={handleEditModalClose} variant="contained" sx={{ mt: 2 }}>
            Update
          </Button>
        </Box>
      </Modal>

      {/* General Snackbar */}
      <Snackbar
        open={snackbarOpen}
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
          {getSnackbarIcon(snackbarType)}
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

export default CategoryRow;
