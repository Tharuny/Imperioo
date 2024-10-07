  "use client";

  import Button from "@mui/material/Button";
  import Checkbox from "@mui/material/Checkbox";
  import FormControlLabel from "@mui/material/FormControlLabel";
  import { useFormik } from "formik";
  import * as yup from "yup";

  import { Paragraph } from "components/Typography";
  import EyeToggleButton from "../components/eye-toggle-button";
  import BoxLink from "../components/box-link";
  import usePasswordVisible from "../use-password-visible";
  import useConfirmPasswordVisible from '../use-confirm-password-visible'

  import { Span } from "components/Typography";
  import { FlexBox } from "components/flex-box";
  import BazaarTextField from "components/BazaarTextField";
  import { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { userRegister } from "app/store/userRedux/userAction";
  import { useRouter } from "next/navigation";
  import { truncate } from "lodash";

  const RegisterPageView = () => {
    const { visiblePassword, togglePasswordVisible } = usePasswordVisible();
    const { visibleConfirmPassword, toggleConfirmPasswordVisible } = useConfirmPasswordVisible();
    const dispatch=useDispatch()
    const Registerauth=useSelector((state)=>state.user.UserAuth);
    const [isValid,setValidity]=useState(false);
    const [formValid,setFormValid] = useState(false);
    const [emailExist,setEmailExist] = useState(false);
    const [phoneNull,setPhoneNull] = useState(false);
    const [emailNull,setEmailNull] = useState(false);
    const [phoneAlreadyExist,setPhoneAlreadyExist] = useState(false);
    const router=useRouter();
    let msg=null;
    const inputProps = {
      endAdornment: <EyeToggleButton show={visiblePassword}  click={togglePasswordVisible} />
    };
    const inputProps2 = {
      endAdornment: <EyeToggleButton show={visibleConfirmPassword}  click={toggleConfirmPasswordVisible} />
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
        .matches(/^[6-9][0-9]{9}$/, "Phone _nmust be 10 digits and starts with 6-9")
        .required("Phone number is required"),
      password: yup.string().required("Password is required"),
      re_password: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Please re-type password"),
      agreement: yup
        .bool()
        .test("agreement", "You have to agree with our Terms and Conditions!", value => value === true)
        .required("You have to agree with our Terms and Conditions!"),
    });
   


    useEffect(()=>{
      setValidity(Registerauth)
    },[Registerauth])

    useEffect(()=>{
      if(isValid)
      router.push("/validateOTP")
    },[isValid])
 

    const initialValues = {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      password: "",
      re_password: "",
    };

    const handleBlurEmail = async (e) =>{
      try{
        if (e.target.value === ""){
            setEmailNull(true)
        }else{
          setEmailNull(false)
        }
        const response = await fetch(`/api/email-already-exist?email=${e.target.value}`,{
          method:"GET"
        })
        const result=  await response.json()
        const existedEmail = result[0].email
        
        if (e.target.value === existedEmail){
          setEmailExist(true)
          setFormValid(false)
        }
      }catch(error){
        setEmailExist(false)
       

      }
  }


  const handleBlurPhoneNumber = async (e) =>{
    try{
      if (e.target.value === "" || e.target.value.length !== 10){
        setPhoneNull(true)
        setFormValid(false)
      }else{
        setPhoneNull(false)
        setFormValid(true)
      }
      const response = await fetch(`/api/email-already-exist?phone=${e.target.value}`,{
        method:"GET"
      })
      const result=  await response.json()
      const existedPhoneNumber = result[0].phonenumber
      if (e.target.value === existedPhoneNumber){
        setPhoneAlreadyExist(true)
        setFormValid(false)
      }
    }catch(error){
      setPhoneAlreadyExist(false)
      
     
    }
  }


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


    useEffect(() => {
      // Check if all form values are filled
      const isFormValid = Object.values(values).every(value => !!value);
      setFormValid(isFormValid);
    }, [values]);


    const { agreement } = values; 
    const handleSubmit = async (e) => {
      e.preventDefault();
      if(values.email!=''||values.first_name!=''||values.last_name!=''||values.password!=''||values.phone_number!=''){
      
      dispatch(userRegister(values))
      }
      else{
        alert("Enter the fields")
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        {msg&&<h2>{msg}</h2>}
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
          // onBlur={handleBlur}
          onBlur={handleBlurEmail}
          value={values.email}
          onChange={handleChange}
          label="Email"
          placeholder="example@mail.com"
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
        />

        {emailNull && <p style={{color:"maroon",marginLeft:"15px",fontSize:"12px",marginTop:"-5px",marginBottom:"5px"}}>Email Required</p>}
        {emailExist && <p style={{color:"maroon",marginLeft:"15px",fontSize:"12px",marginTop:"-5px",marginBottom:"5px"}}>Email Already Registered</p>}
        <BazaarTextField
          mb={1.5}
          fullWidth
          name="phone_number"
          size="small"
          variant="outlined"
          onBlur={handleBlurPhoneNumber}
          value={values.phone_number}
          onChange={handleChange}
          label="Phone Number"
          placeholder="6789012345"
          disabled={emailExist}
          error={!!touched.phone_number && !!errors.phone_number}
          helperText={touched.phone_number && errors.phone_number}
        />

        {phoneNull && <p style={{color:"red",marginLeft:"15px",fontSize:"12px",marginTop:"-5px",marginBottom:"5px"}}>Phone number   must be 10 digits and starts with 6-9</p>}
        {phoneAlreadyExist && <p style={{color:"red",marginLeft:"15px",fontSize:"12px",marginTop:"-5px",marginBottom:"5px"}}>Phone Number Already Registered</p>}

        <BazaarTextField
          mb={1.5}
          fullWidth
          size="small"
          name="password"
          label="Password"
          variant="outlined"
          autoComplete="on"
          placeholder="******"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          type={visiblePassword ? "text" : "password"}
          error={!!touched.password && !!errors.password}
          helperText={touched.password && errors.password}
          InputProps={inputProps}
        />

        <BazaarTextField 
          mb={1.5}
          fullWidth size="small" 
          autoComplete="on" 
          name="re_password" 
          variant="outlined" 
          label="Retype Password" 
          placeholder="******" 
          onBlur={handleBlur} 
          onChange={handleChange} 
          value={values.re_password} 
          type={visibleConfirmPassword ? "text" : "password"} 
          error={!!touched.re_password && !!errors.re_password} 
          helperText={touched.re_password && errors.re_password} 
          InputProps={inputProps2} />

        {/* <FormControlLabel name="agreement" className="agreement" onChange={handleChange} control={<Checkbox size="small" color="secondary" checked={values.agreement || false} />} label={<FlexBox flexWrap="wrap" alignItems="center" justifyContent="flex-start" gap={1}>
              <Span display={{
          sm: "inline-block",
          xs: "none"
        }}>By signing up, you agree to</Span>
              <Span display={{
          sm: "none",
          xs: "inline-block"
        }}>Accept Our</Span>
              <BoxLink title="Terms & Condition" href="/" />
            </FlexBox>
          }
        /> */}

        <Button fullWidth type="submit" color="primary" variant="contained" size="large" disabled={!formValid}>
          Create Account
        </Button>
      </form>
    );
  };

  export default RegisterPageView;