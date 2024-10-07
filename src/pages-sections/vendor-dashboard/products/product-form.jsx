import React, { useState, useEffect } from "react";
import {
  Card,
  Grid,
  Button,
  MenuItem,
  TextField,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Formik, FieldArray } from "formik";
import * as yup from "yup";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { postProduct } from "app/store/vendorProductRedux/productAction";
import { getCategory } from "app/store/categoryRedux/categoryAction";
import { getSubcategory } from "app/store/subcategoryRedux/subcategoryAction";
import { getCategoriesFromVendor } from "app/store/vendorRedux/CategoryRedux/categoryAction";
import { getSubCategoriesFromVendor } from "app/store/vendorRedux/SubCategroyRedux/subCategoryAciton";
import { postProductFromVendor } from "app/store/vendorRedux/ProductRedux/productAction";
import { getColor } from "app/store/colorRedux/colorAction";

const VALIDATION_SCHEMA = yup.object().shape({
  color: yup.array().of(
    yup.object().shape({
      colorid: yup.string().required("Color is required!"),
      colorname: yup.string().required("Color name is required!"),
    })
  ).min(1, "At least one color is required"),
  categoryId: yup.string().required("Category is required!"),
  subCategoryId: yup.string().required("Subcategory is required!"),
  productName: yup.string().required("Name is required!").max(500, "Name must be 500 characters or less"),
  description: yup.string().required("Description is required!").min(10, "Description must be at least 10 characters long"),
  specification: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Specification name is required"),
      value: yup.string().required("Specification value is required"),
    })
  ).min(1, "At least one specification is required"),
  originalPrice: yup.number().required("Original price is required!").positive("Price must be a positive number"),
  currentPrice: yup.number().required("Current price is required!").positive("Current price must be a positive number")
    .max(yup.ref('originalPrice'), "Current price must be less than or equal to original price"),
  discount: yup.number().required("Discount is required!").min(0, "Discount must be between 0 and 100").max(100, "Discount must be between 0 and 100").integer("Discount must be a whole number"),
});

const initialValues = {
  categoryId: '',
  subCategoryId: '',
  productName: '',
  description: '',
  specification: [{ name: '', value: '' }],
  originalPrice: '',
  currentPrice: '',
  discount: '',
  color: [{ colorid: '', colorname: '' }],
};

const ProductForm = () => {
  const dispatch = useDispatch();
  const [subcategories, setSubcategories] = useState([]);
  const [categoryId, setSubcategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const getCategoriesState = useSelector((state) => state.vendorCategory.categoryList);
  const getSubCategoriesState = useSelector((state) => state.vendorSubCategory.subcategoryList);
  const colors = useSelector((state) => state.color.colorData);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    dispatch(getCategoriesFromVendor());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getColor());
  }, [dispatch]);

  useEffect(() => {
    setCategories(getCategoriesState);
  }, [getCategoriesState]);

  const handleClickBlur = () => {
    dispatch(getSubCategoriesFromVendor(categoryId));
    setSubcategories(getSubCategoriesState)
  }

  const removeFocus = (event) => {
    event.target.blur(); // Remove focus from the input field
  };

  const handleFormSubmit = (values, { setSubmitting, resetForm }) => {
    let valuedup = { ...values };
    let specification = valuedup.specification;
  
    // Convert the specification array to a string
    let specString = "";
    for (let i = 0; i < specification.length; i++) {
      specString += specification[i].name + ";";
      specString += specification[i].value + ";";
    }
  
    valuedup.specification = specString;


  
    console.log("values", valuedup)
  
    dispatch(postProductFromVendor(valuedup))
      .then(() => {
        handleSnackbarOpen("Product added successfully!");
        // Reset the form after successful submission
        setSubmitting(false);
        resetForm();
      })
      .catch((error) => {
        handleSnackbarOpen("Error adding product. Please try again.", "error");
        setSubmitting(false);
      });
  };

  const handleSnackbarOpen = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };
  
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  console.log("sub categories", colors)

  return (
    <Card sx={{ p: 6 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          resetForm,
        }) => {
          useEffect(() => {
            if (values.originalPrice && values.discount) {
              const discountValue = (values.originalPrice * values.discount) / 100;
              const currentPrice = values.originalPrice - discountValue;
              setFieldValue("currentPrice", Math.ceil(currentPrice));
            }
            if (values.discount === '') {
              setFieldValue("currentPrice", values.originalPrice);
            }
          }, [values.originalPrice, values.discount, setFieldValue]);

          return (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    select
                    fullWidth
                    color="info"
                    size="medium"
                    name="categoryId"
                    onBlur={handleClickBlur}
                    value={values.categoryId}
                    onChange={(e) => {
                      handleChange(e);
                      setSubcategoryId(e.target.value);
                    }}
                    placeholder="Parent Category"
                    label="Select Parent Category"
                    error={touched.categoryId && Boolean(errors.categoryId)}
                    helperText={touched.categoryId && errors.categoryId}
                  >
                    {categories.map((subcategory) => (
                      <MenuItem key={subcategory.categoryid} value={subcategory.categoryid}>
                        {subcategory.categoryname}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    select
                    fullWidth
                    color="info"
                    size="medium"
                    name="subCategoryId"
                    onBlur={handleBlur}
                    value={values.subCategoryId}
                    onChange={handleChange}
                    placeholder="Sub Category"
                    label="Select Sub Category"
                    error={touched.subCategoryId && Boolean(errors.subCategoryId)}
                    helperText={touched.subCategoryId && errors.subCategoryId}
                  >
                    {subcategories.map((item) => (
                      <MenuItem key={item.subcategoryid} value={item.subcategoryid}>
                        {item.subcategoryname}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="productName"
                    label="Product Name"
                    color="info"
                    size="medium"
                    placeholder="Product Name"
                    value={values.productName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.productName && Boolean(errors.productName)}
                    helperText={touched.productName && errors.productName}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    rows={6}
                    multiline
                    fullWidth
                    color="info"
                    size="medium"
                    name="description"
                    label="Description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Description"
                    value={values.description}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FieldArray name="specification">
                    {({ push, remove }) => (
                      <>
                        {values.specification.map((spec, index) => (
                          <Grid container spacing={2} key={index} alignItems="center" sx={{ mb: 2 }}>
                            <Grid item xs={5}>
                              <TextField
                                fullWidth
                                name={`specification.${index}.name`}
                                label="Specification Name"
                                color="info"
                                size="medium"
                                placeholder="Specification Name"
                                value={spec.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.specification?.[index]?.name && Boolean(errors.specification?.[index]?.name)}
                                helperText={touched.specification?.[index]?.name && errors.specification?.[index]?.name}
                              />
                            </Grid>

                            <Grid item xs={5}>
                              <TextField
                                fullWidth
                                name={`specification.${index}.value`}
                                label="Specification Value"
                                color="info"
                                size="medium"
                                placeholder="Specification Value"
                                value={spec.value}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.specification?.[index]?.value && Boolean(errors.specification?.[index]?.value)}
                                helperText={touched.specification?.[index]?.value && errors.specification?.[index]?.value}
                              />
                            </Grid>

                            <Grid item xs={2}>
                              <IconButton
                                color="secondary"
                                onClick={() => {
                                  removeFocus;
                                  remove(index);
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        ))}

                        <Button
                          color="primary"
                          onClick={() => push({ name: '', value: '' })}
                          startIcon={<AddIcon />}
                        >
                          Add Specification
                        </Button>
                      </>
                    )}
                  </FieldArray>
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="originalPrice"
                    label="Original Price"
                    color="info"
                    size="medium"
                    placeholder="Original Price"
                    value={values.originalPrice}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.originalPrice && Boolean(errors.originalPrice)}
                    helperText={touched.originalPrice && errors.originalPrice}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="currentPrice"
                    label="Current Price"
                    color="info"
                    size="medium"
                    placeholder="Current Price"
                    value={values.currentPrice}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.currentPrice && Boolean(errors.currentPrice)}
                    helperText={touched.currentPrice && errors.currentPrice}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="discount"
                    label="Discount"
                    color="info"
                    size="medium"
                    placeholder="Discount"
                    value={values.discount}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.discount && Boolean(errors.discount)}
                    helperText={touched.discount && errors.discount}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FieldArray name="color">
                    {({ push, remove }) => (
                      <>
                        {values.color.map((color, index) => (
                          <Grid container spacing={2} key={index} alignItems="center" sx={{ mb: 2 }}>
                            <Grid item xs={10}>
                              <TextField
                                select
                                fullWidth
                                color="info"
                                size="medium"
                                name={`color.${index}.colorid`}
                                onBlur={handleBlur}
                                value={color.colorid}
                                onChange={(e) => {
                                  const selectedColor = colors.find(item => item.colorid === e.target.value);
                                  setFieldValue(`color.${index}.colorid`, selectedColor.colorid);
                                  setFieldValue(`color.${index}.colorname`, selectedColor.colorname);
                                }}
                                placeholder="Color"
                                label="Select Color"
                                error={touched.color?.[index]?.colorid && Boolean(errors.color?.[index]?.colorid)}
                                helperText={touched.color?.[index]?.colorid && errors.color?.[index]?.colorid}
                              >
                                {colors.map((item) => (
                                  <MenuItem key={item.colorid} value={item.colorid}>
                                    <div style={{ width: '20px', height: '20px', borderRadius: '15%', background: item.colorcode, marginRight: "10px" }}></div>
                                    {item.colorname}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Grid>

                            <Grid item xs={2}>
                              <IconButton
                                color="secondary"
                                onClick={() => {
                                  removeFocus;
                                  remove(index);
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        ))}

                        <Button
                          color="primary"
                          onClick={() => push({ colorid: '', colorname: '' })}
                          startIcon={<AddIcon />}
                        >
                          Add Color
                        </Button>
                      </>
                    )}
                  </FieldArray>
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          );
        }}
      </Formik>
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
      <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
    </Card>
  );
};

export default ProductForm;
