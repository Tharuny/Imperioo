'use client'
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Formik } from "formik";
import * as yup from "yup";
import { ChromePicker } from "react-color";
import { IconButton, Modal, Box, Typography } from "@mui/material";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import namer from 'color-namer';
import { useDispatch } from "react-redux";
import { postColor } from "app/store/colorRedux/colorAction";


const VALIDATION_SCHEMA = yup.object().shape({
  colorname: yup.string().required(""),
  colorcode: yup.string().required("").matches(/^#/, "Hex code must start with #"),
});

const ColorsForm = (props) => {
  const dispatch = useDispatch();
  const { initialValues, onSearch } = props;
  const [openColorPicker, setOpenColorPicker] = useState(false);
  const [colorData, setColorData] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const fetchColorData = async (values) => {
    try {
      const queryParams = new URLSearchParams({
        colorname: values.colorname,
        colorcode: values.colorcode
      }).toString();

      const response = await fetch(`/api/colors?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (response.ok) {
        setColorData(result.data);
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Unexpected error: ${error}`);
    }
  };

  const saveColorData = async (values) => {
    try {
      await dispatch(postColor(values));
      setOpenSnackbar(true);
      return true;
    } catch (error) {
      console.error('Error:', error);
      alert(`Unexpected error: ${error}`);
      return false;
    }
    // try {
    //   const response = await fetch('/api/colors', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(values),
    //   });

    //   const result = await response.json();

    //   if (response.ok) {
    //     alert("Color Saved Successfully!");
    //     return true;
    //   } else {
    //     alert(`Error: ${result.error}`);
    //     return false;
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    //   alert(`Unexpected error: ${error}`);
    //   return false;
    // }
  };

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    const saveSuccess = await saveColorData(values);
    if (saveSuccess) {
      resetForm();
      setColorData(null);
    }
    setSubmitting(false);
  };

  const suggestColorName = (hexCode) => {
    const names = namer(hexCode);
    return names.ntc[0].name;
  };

  const suggestHexCode = (colorName) => {
    const names = namer(colorName);
    let hexCode = names.ntc[0].hex;
    return hexCode.startsWith('#') ? hexCode : `#${hexCode}`;
  };

  const ensureHexPrefix = (hexCode) => {
    return hexCode.startsWith('#') ? hexCode : `#${hexCode}`;
  };

  useEffect(() => {
    if (initialValues.colorname && initialValues.colorcode) {
      fetchColorData(initialValues);
    }
  }, [initialValues]);

  return (
    <Card sx={{ p: 6 }}>
      <Formik
        initialValues={{
          colorname: initialValues.colorname || "",
          colorcode: initialValues.colorcode || "",
        }}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={handleFormSubmit}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          isSubmitting,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3} alignItems="center">
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="colorname"
                  label="Color Name"
                  color="info"
                  size="medium"
                  placeholder="Enter Color Name"
                  value={values.colorname}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    const newColorName = e.target.value;
                    setFieldValue("colorname", newColorName);
                    const suggestedHexCode = suggestHexCode(newColorName);
                    setFieldValue("colorcode", suggestedHexCode);
                  }}
                  error={!!touched.colorname && !!errors.colorname}
                  helperText={touched.colorname && errors.colorname}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <Box display="flex" alignItems="center">
                  <TextField
                    fullWidth
                    name="colorcode"
                    value={values.colorcode}
                    onChange={(e) => {
                      const newColorCode = ensureHexPrefix(e.target.value);
                      const newColorName = suggestColorName(newColorCode);
                      setFieldValue("colorcode", newColorCode);
                      setFieldValue("colorname", newColorName);
                    }}
                    onBlur={handleBlur}
                    label="Color Code"
                    variant="outlined"
                    size="medium"
                    error={!!touched.colorcode && !!errors.colorcode}
                    helperText={touched.colorcode && errors.colorcode}
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={() => setOpenColorPicker(true)}>
                          <ColorLensIcon />
                        </IconButton>
                      )
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit" disabled={isSubmitting} sx={{ mr: 2 }}>
                  Save Color
                </Button>
              </Grid>
              {colorData && (
                <Grid item xs={12}>
                  <Typography variant="h6">Color Data:</Typography>
                  <Card sx={{ p: 2, mt: 2 }}>
                    <Typography variant="body1">
                      <strong>Color Name:</strong> {colorData.colorname}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Color Code:</strong> {colorData.colorcode}
                    </Typography>
                    <Box
                      sx={{
                        width: "100%",
                        height: "50px",
                        backgroundColor: colorData.colorcode,
                        borderRadius: "4px",
                        mt: 1,
                      }}
                    />
                  </Card>
                </Grid>
              )}
            </Grid>

            <Modal
              open={openColorPicker}
              onClose={() => setOpenColorPicker(false)}
              aria-labelledby="color-picker-modal"
              aria-describedby="color-picker-modal-description"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                  borderRadius: 4,
                }}
              >
                <Typography
                  id="color-picker-modal"
                  variant="h6"
                  component="h2"
                  gutterBottom
                >
                  Choose Your Color
                </Typography>
                <ChromePicker
                  color={values.colorcode}
                  onChange={(color) => {
                    const newColorCode = ensureHexPrefix(color.hex);
                    const newColorName = suggestColorName(newColorCode);
                    setFieldValue("colorcode", newColorCode);
                    setFieldValue("colorname", newColorName);
                  }}
                />
                <Button
                  onClick={() => setOpenColorPicker(false)}
                  sx={{ mt: 2 }}
                  variant="contained"
                >
                  Done
                </Button>
              </Box>
            </Modal>
          </form>
        )}
      </Formik>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" >
          Color saved successfully!
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default ColorsForm;