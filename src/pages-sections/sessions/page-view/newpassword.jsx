"use client"
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import EyeToggleButton from "../components/eye-toggle-button";
import usePasswordVisible from "../use-password-visible";
  import useConfirmPasswordVisible from '../use-confirm-password-visible';
import { useSelector,useDispatch } from 'react-redux';
import { updatePassword } from 'app/store/resetPasswordRedux/resetPasswordAction';
const NewPassword = () => {
  const router = useRouter();
  const { visiblePassword, togglePasswordVisible } = usePasswordVisible();
  const { visibleConfirmPassword, toggleConfirmPasswordVisible } = useConfirmPasswordVisible();
  const inputProps = {
    endAdornment: <EyeToggleButton show={visiblePassword}  click={togglePasswordVisible} />
  };
  const inputProps2 = {
    endAdornment: <EyeToggleButton show={visibleConfirmPassword}  click={toggleConfirmPasswordVisible} />
  };
  const resetPassword = useSelector((state) => state.resetPassword.resetPasswordDetails)
  const dispatch = useDispatch();


  // Validation schema to ensure passwords match and are of appropriate length
  const validationSchema = yup.object().shape({
    newPassword: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('New password is required'),
    retypePassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
      .required('Retype new password is required'),
  });

  // Formik setup
  
  const formik = useFormik({
    initialValues: {
      newPassword: '',
      retypePassword: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting, setErrors }) => {
    
      try {
        const response = dispatch(updatePassword({newPassword: values.newPassword,phoneNumber:resetPassword}))
        // const response = await fetch(`/api/email-already-exist?key=updatepassword`, {
        //   method: 'PATCH',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   }, 
        //   body: JSON.stringify({newPassword: values.newPassword,phoneNumber:resetPassword}),

        // });
        // console.log("rrr",response)
        // if (response != "OK") {
        //   throw new Error('Failed to update password');
        // }

        // Handle success
        resetForm();
        router.push('/login'); // Redirect after successful submission
      } catch (error) {
        // Handle errors
        setErrors({ newPassword: error.message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Set New Password
      </Typography>

      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          name="newPassword"
          label="New Password"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type={visiblePassword ? "text" : "password"}
          error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
          helperText={formik.touched.newPassword && formik.errors.newPassword}
          margin="normal"
          InputProps={inputProps}
        />

        <TextField
          fullWidth
          name="retypePassword"
          label="Retype New Password"
          value={formik.values.retypePassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type={visibleConfirmPassword ? "text" : "password"} 
          error={formik.touched.retypePassword && Boolean(formik.errors.retypePassword)}
          helperText={formik.touched.retypePassword && formik.errors.retypePassword}
          margin="normal"
          InputProps={inputProps2}
        />

        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Set New Password
        </Button>
      </Box>
    </Box>
  );
};

export default NewPassword;
