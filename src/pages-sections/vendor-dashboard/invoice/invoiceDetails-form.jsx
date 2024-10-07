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
import { MenuItem } from "@mui/material";

const VALIDATION_SCHEMA = yup.object().shape({
  invoicenumber: yup.string().required("Invoice number is required"),
  productid: yup.string().required("Product Id name is required"),
  invoiceid: yup.string().required("Invoice Id name is required"),
  productname: yup.string().required("Product name is required"),
  quantity: yup.number().required("Quantity is required").positive("Quantity must be positive"),
  remainingquantity: yup.number().required("Remaining quantity is required").positive("Remaining quantity must be positive"),
  marginprice: yup.number().required("Margin price is required").positive("Margin price must be positive"),
  originalprice: yup.number().required("Original price is required").positive("Original price must be positive"),
  discount: yup.number().required("Discount is required").max(100, "Discount cannot exceed 100%"),
  profit: yup.number().required("Profit is required").positive("Profit must be positive"),
  sellingprice: yup.number().required("Selling price is required").positive("Selling price must be positive"),
});


const InvoiceForm = ({initialValues}) => {
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });


  return (
    <>
      <Card sx={{ p: 6 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={VALIDATION_SCHEMA}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const response = await fetch("/api/invoiceDetails", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              });

              const result = await response.json();

              if (response.ok) {
                setFormStatus({
                  type: "success",
                  message: "Invoice saved successfully!",
                });
                resetForm();
              } else {
                setFormStatus({
                  type: "error",
                  message: `Error: ${result.error}`,
                });
              }
            } catch (error) {
              setFormStatus({
                type: "error",
                message: `Unexpected error: ${error.message}`,
              });
            } finally {
              setSubmitting(false);
              setTimeout(() => {
                setFormStatus({ type: "", message: "" });
              }, 3000);
            }
          }}
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
                    select
                    fullWidth
                    name="invoicenumber"
                    label="Invoice Number"
                    color="info"
                    size="medium"
                    placeholder="Invoice Number"
                    value={values.invoicenumber}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.invoicenumber && !!errors.invoicenumber}
                    helperText={touched.invoicenumber && errors.invoicenumber}
                    SelectProps={{
                        multiple: false,
                      }}
                  >
                  <MenuItem value="1234567">1234567</MenuItem>
                  <MenuItem value="7654321">7654321</MenuItem>
                  <MenuItem value="2123453">2123453</MenuItem>
                  <MenuItem value="6426744">6426744</MenuItem>
                  </TextField>
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    name="invoiceid"
                    label="Invoice Id"
                    color="info"
                    size="medium"
                    placeholder="invoiceid"
                    value={values.invoiceid}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.invoiceid && !!errors.invoiceid}
                    helperText={touched.invoiceid && errors.invoiceid}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    name="productid"
                    label="Product Id"
                    color="info"
                    size="medium"
                    placeholder="productid"
                    value={values.productid}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.productid && !!errors.productid}
                    helperText={touched.productid && errors.productid}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                <TextField
                  select
                  fullWidth
                  color="info"
                  size="medium"
                  name="productname"
                  onBlur={handleBlur}
                  value={values.productname}
                  onChange={handleChange}
                  placeholder="Product name"
                  label="Product name"
                  SelectProps={{
                    multiple: false,
                  }}
                >
                  <MenuItem value="Product1">Product1</MenuItem>
                  <MenuItem value="Product2">Product2</MenuItem>
                  <MenuItem value="Product3">Product3</MenuItem>
                  <MenuItem value="Product4">Product4</MenuItem>
                </TextField>
              </Grid>

              

                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    name="quantity"
                    label="Quantity"
                    color="info"
                    size="medium"
                    placeholder="Quantity"
                    value={values.quantity}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.quantity && !!errors.quantity}
                    helperText={touched.quantity && errors.quantity}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    name="remainingquantity"
                    label="Remaining Quantity"
                    color="info"
                    size="medium"
                    placeholder="Remaining Quantity"
                    value={values.remainingquantity}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.remainingquantity && !!errors.remainingquantity}
                    helperText={touched.remainingquantity && errors.remainingquantity}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    name="marginprice"
                    label="Margin Price"
                    color="info"
                    size="medium"
                    placeholder="Margin Price"
                    value={values.marginprice}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.marginprice && !!errors.marginprice}
                    helperText={touched.marginprice && errors.marginprice}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    name="originalprice"
                    label="Original Price"
                    color="info"
                    size="medium"
                    placeholder="Original Price"
                    value={values.originalprice}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.originalprice && !!errors.originalprice}
                    helperText={touched.originalprice && errors.originalprice}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    name="discount"
                    label="Discount (%)"
                    color="info"
                    size="medium"
                    placeholder="Discount"
                    value={values.discount}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.discount && !!errors.discount}
                    helperText={touched.discount && errors.discount}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    name="profit"
                    label="Profit"
                    color="info"
                    size="medium"
                    placeholder="Profit"
                    value={values.profit}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.profit && !!errors.profit}
                    helperText={touched.profit && errors.profit}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    name="sellingprice"
                    label="Selling Price"
                    color="info"
                    size="medium"
                    placeholder="Selling Price"
                    value={values.sellingprice}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.sellingprice && !!errors.sellingprice}
                    helperText={touched.sellingprice && errors.sellingprice}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="info" type="submit">
                    Save Invoice Details
                  </Button>
                </Grid>
                {formStatus.message && (
                  <Grid item md= {12} xs={12}>
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
                )}
              </Grid>
            </form>
          )}
        </Formik>
      </Card>
    </>
  );
};

export default InvoiceForm;
