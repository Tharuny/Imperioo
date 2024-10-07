"use client";

import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useFormik } from "formik";
import * as yup from "yup";

import EyeToggleButton from "../components/eye-toggle-button";
import BoxLink from "../components/box-link";
import usePasswordVisible from "../use-password-visible";

import { Span } from "components/Typography";
import { FlexBox } from "components/flex-box";
import BazaarTextField from "components/BazaarTextField";
import { useState } from "react";
import { useDispatch } from "react-redux";

const RegisterPageView = () => {
  const { visiblePassword, togglePasswordVisible } = usePasswordVisible();
  const dispatch=useDispatch();

  const inputProps = {
    endAdornment: <EyeToggleButton show={visiblePassword} click={togglePasswordVisible} />
  };


  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    re_password: "",
  };

  const validationSchema = yup.object().shape({
    first_name: yup
      .string()
      .matches(/^[A-Z][a-z]*$/, "First letter must be capital")
      .required("First Name is required"),
    last_name: yup
      .string()
      .matches(/^[A-Z][a-z]*$/, "First letter must be capital")
      .required("Last Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone_number: yup
      .string()
      .matches(/^[6-9]{1}[0-9]{9}$/, "Phone _nmust be 10 digits")
      .required("Phone number is required"),
    password: yup.string().required("Password is required"),
    re_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please re-type password"),
    agreement: yup
      .bool()
      .test("agreement", "You have to agree with our Terms and Conditions!", value => value === true)
      .required("You have to agree with our Terms and Conditions!")
  });
  
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange
  } = useFormik({
    initialValues,
    validationSchema
  });

  const { agreement } = values; 
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (values.password !== values.re_password) {
      alert("Passwords do not match!");
      return;
    }

    // try {
    //   const response = await fetch('/api/postnewdata', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(values),
    //   });

    //   const result = await response.json();

    //   if (response.ok) {
    //   } else {
    //     alert(`Error: ${result.error}`);
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    //   alert(`Unexpected error: ${error}`);
    // }

    dispatch(userRegister({name:"jaya",email:"jaya@gmail.com",mobile:"8309053400"}))
  };

  return (
    <form onSubmit={handleSubmit}>
      <BazaarTextField
        mb={1.5}
        fullWidth
        name="first_name"
        size="small"
        label="First Name"
        variant="outlined"
        onBlur={handleBlur}
        value={values.first_name}
        onChange={handleChange}
        placeholder="John"
        error={!!touched.first_name && !!errors.first_name}
        helperText={touched.first_name && errors.first_name}
      />

      <BazaarTextField
        mb={1.5}
        fullWidth
        name="last_name"
        size="small"
        label="Last Name"
        variant="outlined"
        onBlur={handleBlur}
        value={values.last_name}
        onChange={handleChange}
        placeholder="Doe"
        error={!!touched.last_name && !!errors.last_name}
        helperText={touched.last_name && errors.last_name}
      />

      <BazaarTextField
        mb={1.5}
        fullWidth
        name="email"
        size="small"
        type="email"
        variant="outlined"
        onBlur={handleBlur}
        value={values.email}
        onChange={handleChange}
        label="Email"
        placeholder="example@mail.com"
        error={!!touched.email && !!errors.email}
        helperText={touched.email && errors.email}
      />

      <BazaarTextField
        mb={1.5}
        fullWidth
        name="phone_number"
        size="small"
        variant="outlined"
        onBlur={handleBlur}
        value={values.phone_number}
        onChange={handleChange}
        label="Phone Number"
        placeholder="1234567890"
        error={!!touched.phone_number && !!errors.phone_number}
        helperText={touched.phone_number && errors.phone_number}
      />

      <BazaarTextField
        mb={1.5}
        fullWidth
        size="small"
        name="password"
        label="Password"
        variant="outlined"
        autoComplete="on"
        placeholder="***"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.password}
        type={visiblePassword ? "text" : "password"}
        error={!!touched.password && !!errors.password}
        helperText={touched.password && errors.password}
        InputProps={inputProps}
      />

      <BazaarTextField
        fullWidth
        size="small"
        autoComplete="on"
        name="re_password"
        variant="outlined"
        label="Retype Password"
        placeholder="***"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.re_password}
        type={visiblePassword ? "text" : "password"}
        error={!!touched.re_password && !!errors.re_password}
        helperText={touched.re_password && errors.re_password}
        InputProps={inputProps}
      />

<FormControlLabel
        name="agreement"
        className="agreement"
        onChange={handleChange}
        control={<Checkbox size="small" color="secondary" checked={agreement || false} />}
        label={
          <FlexBox flexWrap="wrap" alignItems="center" justifyContent="flex-start" gap={1}>
            <Span display={{ sm: "inline-block", xs: "none" }}>By signing up, you agree to</Span>
            <Span display={{ sm: "none", xs: "inline-block" }}>Accept Our</Span>
            <BoxLink title="Terms & Condition" href="/" />
          </FlexBox>
        }
      />

      <Button 
        fullWidth 
        type="submit" 
        color="primary" 
        variant="contained" 
        size="large"
        disabled={!agreement}  // Disable the button if agreement is false
      >
        Create Account
      </Button>
    </form>
  );
};

export default RegisterPageView;