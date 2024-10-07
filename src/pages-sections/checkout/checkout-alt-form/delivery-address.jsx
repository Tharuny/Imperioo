import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
// MUI ICON COMPONENTS
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import ModeEditOutline from "@mui/icons-material/ModeEditOutline"; // LOCAL CUSTOM COMPONENTS

import Heading from "./heading";
import NewAddressForm from "./new-address-form";
import EditAddressForm from "./edit-address-form"; // GLOBAL CUSTOM COMPONENTS

import { H6, Paragraph } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddress, getAddress } from "app/store/AddressRedux/addressAction";
import { Dialog, DialogContent } from "@mui/material";

// ==============================================================
const DeliveryAddress = ({
  values,
  handleFieldValueChange
}) => {
  const dispatch = useDispatch();
  const addressList1 = useSelector((state) => state.address.addressDetails);
  const userid = useSelector((state) => state.user.userid)
  const [addressList, setAddressList] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  // const [editAddressId, setEditAddressId] = useState(0);

  // const changeEditAddressId = () => setEditAddressId(0);

  // const handleAddNewAddress = address => {
  //   setAddressList(state => [...state, { ...address,
  //     id: Date.now()
  //   }]);
  // };

  // const handleDeleteAddress = addressId => {
  //   setAddressList(state => state.filter(item => item.id !== addressId));
  // };

  // const handleEditAddress = (addressId, data) => {
  //   setAddressList(state => {
  //     return state.map(item => {
  //       if (item.id === addressId) return { ...data
  //       };else return item;
  //     });
  //   });
  // };


  useEffect(() => {
    dispatch(getAddress());
  }, [])

  useEffect(() => {
    setAddressList(addressList1)
  }, [addressList1])

  //to delete the address 
  const handleDelete = (id) => {
    const data = { addressid: id, uid: userid };
    dispatch(deleteAddress(data));
  }

  const handleEditClick = (e) => {
    e.stopPropagation();
    setOpenEditDialog(true);
  };

  const handleClose = () => {
    setOpenEditDialog(false);
  };


  return <Card sx={{
    p: 3,
    mb: 3
  }}>
    {
      /* HEADING & BUTTON SECTION */
    }
    <FlexBetween mb={4}>
      <Heading number={2} title="Delivery Address" mb={0} />
      <NewAddressForm />
    </FlexBetween>

    {
      /* ADDRESS LIST SECTION */
    }
    <Grid container spacing={3}>
      {addressList.map((item, ind) => <Grid item md={4} sm={6} xs={12} key={ind}>
        <Card onClick={() => handleFieldValueChange(item.street1, "address")} sx={{
          padding: 2,
          boxShadow: "none",
          cursor: "pointer",
          border: "1px solid",
          position: "relative",
          backgroundColor: "grey.100",
          borderColor: item.street1 === values.address ? "primary.main" : "transparent"
        }}>
          <FlexBox position="absolute" top={5} right={5}>
            <IconButton size="small" onClick={handleEditClick}>
              <ModeEditOutline fontSize="inherit" />
            </IconButton>

            <IconButton size="small" color="error" onClick={() => handleDelete(item.id)}>
              <DeleteOutline fontSize="inherit" />
            </IconButton>
          </FlexBox>

          <H6 mb={0.5}>{item.name}</H6>
          <Paragraph color="grey.700">{item.street}</Paragraph>
          {item.city ? <Paragraph color="grey.700">{item.city}</Paragraph> : null}
          <Paragraph color="grey.700">{item.statename}</Paragraph>
          <Paragraph color="grey.700">{item.mobilenumber}</Paragraph>
        </Card>
        <Dialog open={openEditDialog} onClose={handleClose}>
          <DialogContent>
            <EditAddressForm address={item} handleClose={handleClose} />
          </DialogContent>
        </Dialog>
      </Grid>)}
    </Grid>



    {
      /* SHOW EDIT ADDRESS FORM MODAL WHEN CLICK EDIT BUTTON */
    }
    {/* {editAddressId ? <EditAddressForm handleEditAddress={handleEditAddress} active={editAddressId ? true : false} changeEditAddressId={changeEditAddressId} address={addressList.find(item => item.id === editAddressId)} /> : null} */}
  </Card>;
};

const DUMMY_ADDRESS_LIST = [{
  id: 1,
  name: "Home",
  phone: "+17804084466",
  street2: "435 Bristol, MA 2351",
  street1: "375 Subidbazaar, MA 2351"
}, {
  id: 2,
  name: "Office",
  phone: "+18334271710",
  street2: "968 Brockton, MA 2351",
  street1: "645 Bondorbazaar, MA 2351"
}, {
  id: 3,
  name: "Office 2",
  phone: "+17754739407",
  street2: "777 Kazi, MA 2351",
  street1: "324 Ambarkhana, MA 2351"
}];
export default DeliveryAddress;