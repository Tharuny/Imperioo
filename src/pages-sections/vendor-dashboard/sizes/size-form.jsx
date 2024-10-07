import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { postSize } from "app/store/sizeRedux/sizeAction";

// FORM FIELDS VALIDATION SCHEMA
const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Size Name is required!"),
});

// Function to post data
const postData = async (url, data) => {
  // const response = await fetch(url, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(data)
  // });
  // if (!response.ok) {
  //   throw new Error('Failed to save size');
  // }
  // return response.json();
};

const SizeForm = props => {
  const { initialValues, handleFormSubmit } = props;
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  return (
    <>
      <Formik
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          try {
            await dispatch(postSize(values));
            setOpenSnackbar(true);
            resetForm();
          } catch (error) {
            console.error('Error:', error);
            alert(`Unexpected error: ${error}`);
          }
          setSubmitting(false);
        }}
        initialValues={initialValues || { name: '' }}
        validationSchema={VALIDATION_SCHEMA}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Card sx={{ p: 3, m: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="name"
                    label="Size Name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                    Save Size
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </form>
        )}
      </Formik>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" >
          Size saved successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default SizeForm;