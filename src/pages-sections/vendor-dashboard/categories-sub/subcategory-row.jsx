import { useState } from "react";
import { useDispatch } from "react-redux";
import { 
  Box, Button, IconButton, Modal, TextField, Typography,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { StyledTableRow, StyledTableCell, StyledIconButton } from "../styles";
import { deleteSubCategoryById, updateSubCategoryById } from "app/store/vendorRedux/SubCategroyRedux/subCategoryAciton";
import Snackbar from '@mui/material/Snackbar';
import DeleteIcon from '@mui/icons-material/Delete';



const SubCategoryRow = ({
  subcategoryid,
  subcategory,
  category,
  categoryid,
}) => {
  const dispatch = useDispatch();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(subcategory);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('success');

  const handleEdit = () => setEditModalOpen(true);

  const handleEditModalClose = async () => {
    const updateSubCategory = {
      subcategoryid: subcategoryid,
      subcategoryname: editData,
      categoryKey: categoryid,
    };
    try {
      await dispatch(updateSubCategoryById(updateSubCategory));
      showSnackbar('update', `Subcategory updated successfully`);
      setEditModalOpen(false);
    } catch (error) {
      showSnackbar('error', 'Error updating subcategory');
    }
  };

  const handleDelete = async () => {
    const deleteSubCategory = {
      id: subcategoryid,
      parentid: categoryid
    };
    try {
      await dispatch(deleteSubCategoryById(deleteSubCategory));
      showSnackbar('delete', `Subcategory deleted successfully`);
    } catch (error) {
      showSnackbar('error', 'Error deleting subcategory');
    }
  };

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
      case 'update':
        return '#2196f3'; // Blue
      case 'delete':
        return '#ff9800'; // Light Red (Orange)
      case 'error':
        return '#f44336'; // Error Red
      default:
        return '#4caf50'; // Success Green
    }
  };

  return (
    <>
      <StyledTableRow tabIndex={-1} role="checkbox">
        <StyledTableCell align="left">{subcategory}</StyledTableCell>
        <StyledTableCell align="left">{category}</StyledTableCell>
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
            Edit Subcategory
          </Typography>
          <TextField
            fullWidth
            label="Subcategory Name"
            // value={editData}
            onChange={(e) => setEditData(e.target.value)}
            margin="normal"
          />
          <Button onClick={handleEditModalClose} variant="contained" sx={{ mt: 2 }}>
            Update
          </Button>
        </Box>
      </Modal>

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
            <DeleteIcon sx={{ marginRight: 1 }} />
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

export default SubCategoryRow;