import { Fragment, useEffect, useState } from "react"; // MUI

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent"; // FORMIK

import { Formik, useFormik } from "formik"; // YUP

import * as yup from "yup"; // LOCAL CUSTOM COMPONENT

import { H5 } from "components/Typography"; // CUSTOM DATA MODEL
import { useDispatch, useSelector } from "react-redux";
import { getAddress, postAddress } from "app/store/AddressRedux/addressAction";

const validationSchema = yup.object({
  street2: yup.string(),
  name: yup.string().required("required"),
  address1: yup.string().required("required"),
  contact: yup.number().required("required"),
  city: yup.string().required("required"),
  state: yup.string().required("required"),
  country: yup.string().required("required"),
  pincode: yup.number().required("required")
}); // ==================================================================

// ==================================================================
export default function NewAddressForm({
  handleAddNewAddress
}) {
  const dispatch=useDispatch();
  const userid=useSelector((state)=>state.user.userid);
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => setOpenModal(false);

  const initialValues = {
    name: "UI Lib",
    address1: "321, Subid Bazaar",
    street2: "",
    contact: "01789123456",
    city: "Sylhet",
    state: "Sylhet",
    country: "Bangladesh",
    pincode: 4336
  };
  
  const handleSubmit=(values)=>{
    
    const userData={
      name:values.name,
      city:values.city,
      country:values.country,
      contact:values.contact,
      address1:values.address1,
      street2:values.street2,
      pincode:values.pincode,
      state:values.state,
      id:userid
    }
    dispatch(postAddress(userData));
  }

  return <Fragment>
      <Button color="primary" variant="outlined" onClick={() => setOpenModal(true)}>
        Add New Address
      </Button>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogContent>
          <H5 mb={4}>Add New Address Information</H5>

          <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  name="name"
                  label="Name"
                  onBlur={handleBlur}
                  value={values.name}
                  onChange={handleChange}
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  name="address1"
                  onBlur={handleBlur}
                  label="Address Line"
                  value={values.address1}
                  onChange={handleChange}
                  error={!!touched.address1 && !!errors.address1}
                  helperText={touched.address1 && errors.address1}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  name="city"
                  onBlur={handleBlur}
                  label="City"
                  value={values.city}
                  onChange={handleChange}
                  error={!!touched.city && !!errors.city}
                  helperText={touched.city && errors.city}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  name="pincode"
                  onBlur={handleBlur}
                  label="Pincode"
                  value={values.pincode}
                  onChange={handleChange}
                  error={!!touched.pincode && !!errors.pincode}
                  helperText={touched.pincode && errors.pincode}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  name="state"
                  onBlur={handleBlur}
                  label="State"
                  value={values.state}
                  onChange={handleChange}
                  error={!!touched.state && !!errors.state}
                  helperText={touched.state && errors.state}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  name="country"
                  onBlur={handleBlur}
                  label="Country"
                  value={values.country}
                  onChange={handleChange}
                  error={!!touched.country && !!errors.country}
                  helperText={touched.country && errors.country}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="contact"
                  onBlur={handleBlur}
                  value={values.contact}
                  onChange={handleChange}
                  error={!!touched.contact && !!errors.contact}
                  helperText={touched.contact && errors.contact}
                />
              </Grid>

              <Grid item xs={12} style={{ display: "flex", alignItems: "center" }}>
                <Button type="submit" variant="contained" color="primary">
                  Save Changes
                </Button>
                {/* {message && (
                  <Typography variant="body1" color="success.main" style={{ marginLeft: 16 }}>
                    {message}
                  </Typography>
                )} */}
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
        </DialogContent>
      </Dialog>
    </Fragment>;
}