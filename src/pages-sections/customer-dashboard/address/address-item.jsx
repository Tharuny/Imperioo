import React, { useState } from "react";
import Link from "next/link";
import { Card, Grid, IconButton, Box, Dialog, DialogContent } from "@mui/material";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import { H6, Paragraph } from "components/Typography";
import { FlexBox } from "components/flex-box";
import EditAddressForm from "./edit-address-form";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddress } from "app/store/AddressRedux/addressAction";
import { useSelectedLayoutSegment } from "next/navigation";
import { capital } from "app/store/capitalize/capitalizeText";


export default function AddressListItem({ address, handleEdit, isSelected, onClick }) {
  const userid=useSelector((state)=>state.user.userid)
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const dispatch = useDispatch();

  const {
    id,
    street,
    name,
    city,
    statename,
    pincode,
    mobilenumber,
    country,
  } = address;

  const handleEditClick = (e) => {
    e.stopPropagation();
    setOpenEditDialog(true);
  };

  const handleClose = () => {
    setOpenEditDialog(false);
  };

  const handleDelete = () => {
    const data={addressid:id,uid:userid}
    dispatch(deleteAddress(data));
  };

  return (
    <Grid item md={6} sm={6} xs={12}>
      <Card
        // onClick={() => onClick(id)}
        sx={{
          padding: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          // cursor: "pointer",
          border: "2px solid",
          borderRadius: '12px',
          position: "relative",
          backgroundColor: isSelected ? 'primary.light' : 'background.paper',
          borderColor: isSelected ? "primary.main" : "grey.300",
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
            borderColor: 'primary.main',
          }
        }}
      >
        <FlexBox position="absolute" top={10} right={10}>
          <IconButton 
            size="small" 
            sx={{ 
              bgcolor: 'background.paper',
              '&:hover': { bgcolor: 'primary.light' },
              mr: 1
            }}
            onClick={handleEditClick}
          >
            <Edit fontSize="small" color="primary" />
          </IconButton>
          <IconButton 
            size="small"
            sx={{ 
              bgcolor: 'background.paper',
              '&:hover': { bgcolor: 'error.light' }
            }}
            onClick={handleDelete}
          >
            <Delete fontSize="small" color="error" />
          </IconButton>
        </FlexBox>

        {/* <Link href={`/address/${id}`} passHref> */}
          <Box sx={{ textDecoration: 'none', color: 'inherit' }}>
            <H6 mb={1} color="primary.main">{name.toUpperCase().charAt(0)+name.slice(1)}</H6>
            <Paragraph color="text.secondary" mb={0.5}>{`${city.toUpperCase().charAt(0)+city.slice(1)},
             ${street.toUpperCase().charAt(0)+street.slice(1)},
              ${statename.toUpperCase().charAt(0)+statename.slice(1)},
               ${pincode}`}</Paragraph>
            <Paragraph color="text.secondary" mb={0.5}>{dispatch(capital(country))}</Paragraph>
            <Paragraph color="text.primary" fontWeight="medium">{mobilenumber}</Paragraph>
          </Box>
        {/* </Link> */}
      </Card>

      <Dialog open={openEditDialog} onClose={handleClose}>
        <DialogContent>
          <EditAddressForm address={address} handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </Grid>
  );
}
