"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { postInvoice, postInvoiceData } from "app/store/invoiceRedux/invoiceAction";
const VALIDATION_SCHEMA = yup.object().shape({
  invoiceNumber: yup.string().required("Invoice number required"),
  invoiceImage: yup.string().required("Invoice image URL is required"),
});



const InvoiceForm = ({ initialValues, handleFormSubmit, newInvoice }) => {
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });
  const [updatedInvoice,setUpdatedInvoice] = useState({});
  const dispatch = useDispatch();

  return (
    <>
      <Card sx={{ p: 6 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={VALIDATION_SCHEMA}
          // onSubmit={
          //async (values, { setSubmitting, resetForm }) => {
          //   try {
          //     const response = await fetch("/api/invoiceData", {
          //       method: "POST",
          //       headers: {
          //         "Content-Type": "application/json",
          //       },
          //       body: JSON.stringify(values),
          //     });

          //     const result = await response.json();

          //     if (response.ok) {
          //       try {
          //         const resultStatus = await responseUpdate.json();
          //       } catch (error) {
          //       }

          //       setFormStatus({
          //         type: "success",
          //         message: "Invoice saved successfully!",
          //       });
          //       resetForm();
          //     } else {
          //       setFormStatus({
          //         type: "error",
          //         message: `Error: ${result.error}`,
          //       });
          //     }
          //   } catch (error) {
          //     setFormStatus({
          //       type: "error",
          //       message: `Unexpected error: ${error.message}`,
          //     });
          //   } finally {
          //     setSubmitting(false);
          //     setTimeout(() => {
          //       setFormStatus({ type: "", message: "" });
          //     }, 3000);
          //   }
          // }
          // }
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
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="invoiceNumber"
                    label="Invoice Number"
                    color="info"
                    size="medium"
                    placeholder="Product ID"
                    value={values.invoiceNumber}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.invoiceNumber && !!errors.invoiceNumber}
                    helperText={touched.invoiceNumber && errors.invoiceNumber}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="invoiceImage"
                    label="Invoice Image URL"
                    color="info"
                    size="medium"
                    placeholder="Image URL"
                    value={values.invoiceImage}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.invoiceImage && !!errors.invoiceImage}
                    helperText={touched.invoiceImage && errors.invoiceImage}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    variant="contained" 
                    color="info" 
                    type="submit"
                    onClick={()=>{
                      dispatch(postInvoice(values))
                    }}>
                    Save Invoice
                  </Button>
                </Grid>
                {/* {formStatus.message && (
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        mt: 2,
                        p: 2,
                        borderRadius: "4px",
                        backgroundColor:
                          formStatus.type === "success"
                            ? "primary.main"
                            : "error.main",
                      }}
                    >
                      <Typography sx={{ color: "white" }}>
                        {formStatus.message}
                      </Typography>
                    </Box>
                  </Grid>
                )} */}
              </Grid>
            </form>
          )}
        </Formik>
      </Card>
    </>
  );
};

export default InvoiceForm;
