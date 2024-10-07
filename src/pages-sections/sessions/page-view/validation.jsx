"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { mobileValidation,otpVerification} from "app/store/userRedux/userAction";
import { useRouter } from "next/navigation";

const ValidationForm = () => {
  const [showOtpField, setShowOtpField] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch=useDispatch();
  const numberValidOrNot=useSelector((state)=>state.user.validMobileNumber);
  const otp=useSelector((state)=>state.user.otp);
  const otpVerified=useSelector((state)=>state.user.otpVerified);
  const [isValid, setValidity] = useState(false);
  const [phoneNotExist,setPhoneNotExist] = useState(false)
  const router=useRouter()
  const initialValues = {
    emailOrMobile: "",
    otp: ""
  };
  useEffect(() => {
    setValidity(numberValidOrNot);
  }, [numberValidOrNot]);

  useEffect(()=>{
    if(isValid) {
      setIsLoading(false)
       setShowOtpField(true);
    setMessage(otp);
    }
  },[isValid])

  useEffect(() => {
   
    if (otpVerified) {
      router.push('/login');
    }
  }, [otpVerified, router]);

  const validationSchema = yup.object().shape({
    emailOrMobile: yup
      .string()
      .test('email-or-mobile', 'Enter a valid email or Indian mobile number', (value) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        const mobileRegex = /^[6-9]\d{9}$/;
        return emailRegex.test(value) || mobileRegex.test(value);
      })
      .required("Email or mobile number is required"),
    otp: yup.string().when('$showOtpField', {
      is: true,
      then: yup.string().required("OTP is required").length(6, "OTP must be 6 digits")
    })
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setMessage('');
      if (!showOtpField)
          dispatch(mobileValidation(values.emailOrMobile))
      else
      {
        
          dispatch(otpVerification(values))
      }
    },
  });

  const onClickSendOTP = async (e) =>{
    try{
      const response = await fetch(`/api/email-already-exist?phone=${e.target.value}`,{
        method:"GET"
      })
      const result=  await response.json()
      const existedPhoneNumber = result[0].phonenumber
      if (e.target.value === existedPhoneNumber){
        setPhoneNotExist(false) 
        setIsLoading(false)
      }
    }catch(error){
      setPhoneNotExist(true)
      setIsLoading(true)
    }
  }

  
  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Sign Up
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center">
        {showOtpField ? 'Enter the OTP sent to your email/mobile' : 'Enter your email or mobile number'}
      </Typography>
      
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          name="emailOrMobile"
          label="Email or Mobile Number"
          value={formik.values.emailOrMobile}
          onChange={formik.handleChange}
          onBlur={onClickSendOTP}
          error={formik.touched.emailOrMobile && Boolean(formik.errors.emailOrMobile)}
          helperText={formik.touched.emailOrMobile && formik.errors.emailOrMobile}
         disabled={showOtpField}
          margin="normal"
        />
        
        {showOtpField && (
          <TextField
            fullWidth
            name="otp"
            label="OTP"
            value={formik.values.otp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.otp && Boolean(formik.errors.otp)}
            helperText={formik.touched.otp && formik.errors.otp}
            margin="normal"
          />
        )}

        {phoneNotExist && <p style={{color:"maroon",marginLeft:"15px",fontSize:"12px",marginTop:"-5px",marginBottom:"5px"}}>Phone Number Not Registered</p>}

        
        <Button 
          fullWidth 
          type="submit" 
          variant="contained" 
          color="primary"
          disabled={isLoading}
          sx={{ mt: 2 }}
         
        >
          {isLoading ? "Processing..." : (showOtpField ? "Verify OTP" : "Send OTP")}
        </Button>

        {message && (
          <Typography color="primary" align="center" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ValidationForm;