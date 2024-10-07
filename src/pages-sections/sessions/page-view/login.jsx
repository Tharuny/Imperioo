"use client";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup"; // LOCAL CUSTOM COMPONENTS
import EyeToggleButton from "../components/eye-toggle-button"; // LOCAL CUSTOM HOOK
import usePasswordVisible from "../use-password-visible"; // GLOBAL CUSTOM COMPONENTS
import BazaarTextField from "components/BazaarTextField"; // ==============================================================
import { useDispatch, useSelector } from "react-redux";
import { loginValidation } from "app/store/userRedux/userAction";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


// ==============================================================
const LoginPageView = ({
  closeDialog
}) => {
  const dispatch=useDispatch();
  const [isValid,setValidity]=useState(false);
  const loginVerified=useSelector((state)=>state.user.loginVerified);
  const [emailExist,setEmailExist] = useState(false);
  const [notUser,setNotUser] = useState(false);
  // const [nullEmail,setEmailNull] = useState(false);
  const router=useRouter();
  useEffect(()=>{
   
    setValidity(loginVerified)
  },[loginVerified])
 
  useEffect(()=>{
    if(isValid)
    {
      router.push("/")
    }
  },[isValid])

  const {
    visiblePassword,
    togglePasswordVisible
  } = usePasswordVisible(); // LOGIN FORM FIELDS INITIAL VALUES

  const initialValues = {
    email: "",
    password: ""
  }; // LOGIN FORM FIELD VALIDATION SCHEMA

  const validationSchema = yup.object().shape({
    password: yup.string().required("Password is required"),
    email: yup.string().email("invalid email").required("Email is required")
  });
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    // handleSubmit
  } = useFormik({
    initialValues,
    validationSchema,
    // onSubmit: values => {
    //   closeDialog?.();
    // }
  });

  const handleSubmit= (e)=>{
    e.preventDefault();
    if(values.email!=''||values.password!=''){
    dispatch(loginValidation(values))
    closeDialog();
    }
    else{
      alert("Fill the required fields")
    }
  }

  const handleBlurEmail = async (e) =>{
    try{
      // if (e.target.value === ""){
      //   setEmailNull(true)
      // }
      const response = await fetch(`/api/email-already-exist?email=${e.target.value}`,{
        method:"GET"
      })
      const result=  await response.json()
      const existedEmail = result[0].email
      
      if (e.target.value === existedEmail){ 
        setEmailExist(false)
        setNotUser(false)
      }
    }catch(error){
      setEmailExist(true)
      setNotUser(true)

     
    }
}

  return <form onSubmit={handleSubmit}>
      <BazaarTextField mb={1.5} fullWidth name="email" size="small" type="email" variant="outlined" onBlur={handleBlurEmail} value={values.email} onChange={handleChange} label="Email or Phone Number" placeholder="exmple@mail.com" error={!!touched.email && !!errors.email} helperText={touched.email && errors.email} />
      {notUser && <p style={{color:"maroon",marginLeft:"15px",fontSize:"12px",marginTop:"-5px",marginBottom:"5px"}}>Email Not Registered</p>}
      {/* {nullEmail && <p style={{color:"maroon",marginLeft:"15px",fontSize:"12px",marginTop:"-5px",marginBottom:"5px"}}>Please Enter Valid Email</p>} */}

      <BazaarTextField mb={2} fullWidth size="small" name="password" label="Password" autoComplete="on" variant="outlined" onBlur={handleBlur} onChange={handleChange} value={values.password} placeholder="*********" type={visiblePassword ? "text" : "password"} error={!!touched.password && !!errors.password} helperText={touched.password && errors.password} InputProps={{
      endAdornment: <EyeToggleButton show={visiblePassword} click={togglePasswordVisible} />
    }} />

      <Button fullWidth type="submit" color="primary" variant="contained" size="large" disabled={emailExist}>
        Login
      </Button>
    </form>;
};

export default LoginPageView;