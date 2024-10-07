import { useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import BazaarSwitch from "components/BazaarSwitch";
import { StyledIconButton, StyledTableCell, StyledTableRow } from "../styles";
import { colors } from "@mui/material";
import { Snackbar, Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

const ColorsRow = ({ color, selected }) => {
  const { name, featured, logo, id, slug } = color || {};
  const router = useRouter();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const hasSelected = selected.indexOf(name) !== -1;

  const handleNavigate = () => router.push(`/admin/colors/${slug}`);

  const handleDelete = async () => {
    try {
      const response = await fetch("/api/colors", {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });
      if (response.ok) {
        setSnackbarMessage("Color deleted successfully");
        setSnackbarOpen(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000); // Reload after 2 seconds to show the snackbar
      }
    } catch (error) {
      console.error("Error:", error);
      setSnackbarMessage("Error deleting color");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <StyledTableRow tabIndex={-1} role="checkbox" selected={hasSelected}>
        <StyledTableCell align="center">{id}</StyledTableCell>
        <StyledTableCell align="center">{name}</StyledTableCell>
        <StyledTableCell align="center">
          <StyledIconButton onClick={handleDelete}>
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

export default ColorsRow;