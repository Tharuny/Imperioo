import { useState, useEffect } from "react";
import {
  Box,
  Card,
  Grid,
  Button,
  MenuItem,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import { Formik, FieldArray } from "formik";
import * as yup from "yup";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelector } from "react-redux";

const VALIDATION_SCHEMA = yup.object().shape({
  category: yup.string().required("Category is required!"),
  subcategory: yup.string().required("Subcategory is required!"),
  name: yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces")
    .required("Name is required!"),
  description: yup.string()
    .min(10, "Description must be at least 10 characters long")
    .required("Description is required!"),
  Specifications: yup.string()
    .min(10, "Specifications must be at least 10 characters long")
    .required("Specifications are required!"),
  stock: yup.number()
    .positive("Stock must be a positive number")
    .integer("Stock must be a whole number")
    .required("Stock is required!"),
  tags: yup.string()
    .matches(/^(#[a-zA-Z0-9]+\s*)+$/, "Tags must be in #tag format")
    .required("Tags are required!"),
  price: yup.number()
    .positive("Price must be a positive number")
    .test('is-currency', 'Price must be in rupees with up to 2 decimal places', 
      value => /^\d+(\.\d{1,2})?$/.test(value))
    .required("Price is required!"),
  sale_price: yup.number()
    .positive("Sale price must be a positive number")
    .test('is-currency', 'Sale price must be in rupees with up to 2 decimal places', 
      value => !value || /^\d+(\.\d{1,2})?$/.test(value))
    .test('is-less-than-price', 'Sale price must be less than regular price', 
      function(value) {
        return !value || value < this.parent.price;
      })
    .optional(),
  Discount: yup.number()
    .min(1, "Discount must be between 1 and 100")
    .max(100, "Discount must be between 1 and 100")
    .integer("Discount must be a whole number")
    .required("Discount is required"),
  // imageUrls: yup.array().of(
  //   yup.string().required("Image URL is required")
  // ).min(3, "At least 3 image URLs are required").max(6, "Maximum 6 image URLs allowed"),
});

const initialValues = {
  imageUrls: ['' ]
};

const ProductImage = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [products, setProducts] = useState([]);

  const allProducts = useSelector((state) => state.product.productData);

  useEffect(() => {
    setProducts(allProducts);
  }, [allProducts]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/Product-form?type=categories');
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const result = await response.json();
        setCategories(result);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await fetch(`/api/Product-form?type=subcategories&id=${categoryId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch subcategories");
      }
      const result = await response.json();
      setSubcategories(result);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setCategoryId(selectedCategoryId);
    fetchSubcategories(selectedCategoryId);
    setSubCategoryId(''); // reset subcategory selection
  };

  const handleSubcategoryChange = (e) => {
    const selectedSubCategoryId = e.target.value;
    setSubCategoryId(selectedSubCategoryId);

    // Filter products based on selected category and subcategory
    const filtered = products.filter(
      (product) => product.categoryid === categoryId && product.subcategoryid === selectedSubCategoryId
    );
    setFilteredProducts(filtered);
  };

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch('/api/postimages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Product saved successfully!');
        resetForm(); // Reset the form after successful submission
      } else {
        console.error('Server responded with an error:', response.status, response.statusText);
        alert(`Error: ${result.error || 'Unknown error occurred'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Unexpected error: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card sx={{ p: 6 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={handleFormSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <TextField
                  select
                  fullWidth
                  color="info"
                  size="medium"
                  name="categoryId"
                  onBlur={handleBlur}
                  value={categoryId}
                  onChange={(e) => {
                    handleChange(e);
                    handleCategoryChange(e);
                    setFieldValue('categoryId', e.target.value);
                  }}
                  placeholder="Parent Category"
                  label="Select Parent Category"
                  error={touched.categoryId && Boolean(errors.categoryId)}
                  helperText={touched.categoryId && errors.categoryId}
                >
                  {categories.map((item) => (
                    <MenuItem key={item.categoryid} value={item.categoryid}>
                      {item.categoryname}
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
                  value={subCategoryId}
                  onChange={(e) => {
                    handleChange(e);
                    handleSubcategoryChange(e);
                    setFieldValue('subCategoryId', e.target.value);
                  }}
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
                  select
                  fullWidth
                  name="productName"
                  label="Select Product Name"
                  color="info"
                  size="medium"
                  placeholder="Product Name"
                  value={values.productName}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue('productName', e.target.value);
                  }}
                  error={touched.productName && Boolean(errors.productName)}
                  helperText={touched.productName && errors.productName}
                >
                  {filteredProducts.map((item) => (
                    <MenuItem key={item.productid} value={item.productid}>
                      {item.productname}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1">Image URLs</Typography>
                <FieldArray
                  name="imageUrls"
                  render={(arrayHelpers) => (
                    <div>
                      {values.imageUrls.map((url, index) => (
                        <Box key={index} display="flex" alignItems="center" mb={1}>
                          <TextField
                            fullWidth
                            name={`imageUrls.${index}`}
                            label={`Image URL ${index + 1}`}
                            value={url}
                            onChange={handleChange}
                            error={!!(touched.imageUrls?.[index] && errors.imageUrls?.[index])}
                            helperText={touched.imageUrls?.[index] && errors.imageUrls?.[index]}
                          />
                          {index > 0 && (
                            <IconButton onClick={() => arrayHelpers.remove(index)}>
                              <RemoveIcon />
                            </IconButton>
                          )}
                        </Box>
                      ))}
                      {values.imageUrls.length < 7 && (
                        <Button
                          startIcon={<AddIcon />}
                          onClick={() => arrayHelpers.push('')}
                        >
                          Add Image URL
                        </Button>
                      )}
                    </div>
                  )}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <Button 
                  variant="contained" 
                  color="info" 
                  type="submit"
                >
                  Submit
                </Button>
              </Grid> 
            </Grid>
          </form>
        )}
      </Formik>
    </Card>
  );
}

export default ProductImage;
