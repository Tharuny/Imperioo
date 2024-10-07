import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { postAddress } from "app/store/AddressRedux/addressAction";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

// =============================================================
export default function AddressForm() {
  const userid = useSelector((state) => state.user.userid);
  const [id, setId] = useState(userid);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  useEffect(() => {
    setId(userid);
  }, [userid]);

  const INITIAL_VALUES = {
    id: userid,
    name: "",
    address1: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    contact: "",
  };

  const VALIDATION_SCHEMA = yup.object().shape({
    name: yup.string().required("name is required!"),
    address1: yup.string().required("addressr is equired!"),
    city: yup.string().required("city is required!"),
    pincode: yup.string().required("pincode is required!"),
    state: yup.string().required("state is required!"),
    country: yup.string().required("country is required!"),
    contact: yup
      .string()
      .matches(/^[6-9]\d{9}$/, "Phone number must be 10 digits")
      .required("phone is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    dispatch(postAddress(values));
    setMessage("Your address has been saved!");
    resetForm({ values: INITIAL_VALUES }); // Reset form to initial values
  
    // Clear the message after a delay (e.g., 3 seconds)
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}
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
                  label="Phone"
                  type="number"
                  name="contact"
                  onBlur={handleBlur}
                  value={values.contact}
                  onChange={handleChange}
                  error={!!touched.contact && !!errors.contact}
                  helperText={touched.contact && errors.contact}
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
                  type="number"
                  name="pincode"
                  onBlur={handleBlur}
                  label="Pincode"
                  value={values.pincode}
                  onChange={handleChange}
                  error={!!touched.pincode && !!errors.pincode}
                  helperText={touched.pincode && errors.pincode}
                />
              </Grid>

              <Grid
                item
                xs={12}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Button type="submit" variant="contained" color="primary">
                  Save Changes
                </Button>
                {message && (
                  <Typography
                    variant="body1"
                    color="success.main"
                    style={{ marginLeft: 16 }}
                  >
                    {message}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
