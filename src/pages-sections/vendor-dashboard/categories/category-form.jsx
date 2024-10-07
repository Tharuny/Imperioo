"use client"
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { postCategory } from "app/store/categoryRedux/categoryAction";

// imports required for category CRUD
import { postCategoryFromVendor } from "app/store/vendorRedux/CategoryRedux/categoryAction";

const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Name required")
});

const CategoryForm = (props) => {
  const dispatch = useDispatch();
  const { initialValues } = props;
  // getting post data message from state -$sam
  const postVendorCategoryMessage=useSelector((state)=> state.vendorCategory.categoryPostMessage);
  const [postMessage,setPostMessage]=useState("");
  const [postCounter,setPostCounter]=useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  
  // To show Message dialog box dynamically -$sam
  useEffect(()=>{
    // dispatch(postVendorCategory)
    setPostMessage(postVendorCategoryMessage);
    if(postCounter==0)
          document.getElementById("category").style.display='none';
    else 
      document.getElementById("category").style.display='block';
  },[postVendorCategoryMessage,postCounter])
  

  // To close dialog Box to throw message  - $sam
  const removePostMessage=()=>{ 
    setPostCounter(0);
    document.getElementById("category").style.display='none';
    setPostMessage("");
  }

  const handleSnackbarOpen = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Card sx={{ p: 6 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={VALIDATION_SCHEMA}
        // submitting form on succesfull form filling 
        onSubmit={async (values, { setSubmitting, resetForm }) => { 
          const categoryData = {
            categoryName: values.name,
          };
          try {
            await dispatch(postCategoryFromVendor(categoryData));
            handleSnackbarOpen("Category added successfully", "success");
            resetForm();
          } catch (error) {
            handleSnackbarOpen("Error adding category", "error");
          }
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                {/* Text Feild for Category Name */}
                <TextField
                  fullWidth
                  name="name"
                  label="Name"
                  color="info"
                  size="medium"
                  placeholder="Category Name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              {/* Choosing status from drop down */}
              {/* <Grid item sm={6} xs={12}>
                <TextField
                  select
                  fullWidth
                  color="info"
                  size="medium"
                  name="parent"
                  onBlur={handleBlur}
                  value={values.parent}
                  onChange={handleChange}
                  placeholder="Status"
                  label="Status"
                  SelectProps={{
                    multiple: false,
                  }}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">InActive</MenuItem>
                </TextField>
              </Grid> */}

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="info"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Save  category
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
      <div className="container" id="category" >
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
          <div>
            <div >
              <span >
                {postMessage}
              </span>
              <span  onClick={removePostMessage}>
                &times;
              </span>
            </div>
          </div>

          </div>
          <div className="col-md-4"></div>
        </div>
      </div>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default CategoryForm;