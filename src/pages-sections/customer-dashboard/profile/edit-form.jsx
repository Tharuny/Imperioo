"use client";

import { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Formik } from "formik";
import * as yup from "yup";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import { styled, alpha } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogTitle-root': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2, 0),
  backgroundColor: theme.palette.background.default,
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: 1,
}));

export default function ProfileEditForm({ user }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [currentEmailVerified, setCurrentEmailVerified] = useState(false);
  const [newEmailVerified, setNewEmailVerified] = useState(false);

  const INITIAL_VALUES = {
    first_name: user.name.firstName || "",
    last_name: user.name.lastName || "",
    email: user.email || "",
    password: user.password || "",
    birth_date: new Date(user.dateOfBirth) || new Date(),
    contact: user.phone || "",
  };

  const VALIDATION_SCHEMA = yup.object().shape({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup.string().email("invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
    birth_date: yup.date().required("Birth date is required"),
    contact: yup.string().required("Contact is required"),
  });

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating your profile. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditClick = (field, value) => {
    setEditingField(field);
    setEditValue(value);
    if (field === "email") {
      setNewEmail("");
      setCurrentEmailVerified(false);
      setNewEmailVerified(false);
      setOtpSent(false);
      setOtp("");
    } else if (["contact", "password"].includes(field)) {
      setOtpSent(false);
      setOtp("");
      setOtpVerified(false);
    }
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setEditingField(null);
    setEditValue("");
    setNewEmail("");
    setCurrentEmailVerified(false);
    setNewEmailVerified(false);
    setOtpSent(false);
    setOtp("");
    setOtpVerified(false);
  };

  const handleDialogSave = (setFieldValue) => {
    if (editingField === "email") {
      if (!currentEmailVerified) {
        alert("Please verify your current email before saving.");
        return;
      }
      if (newEmail && !newEmailVerified) {
        alert("Please verify your new email before saving.");
        return;
      }
      setFieldValue(editingField, newEmail || editValue);
    } else if (["contact", "password"].includes(editingField) && !otpVerified) {
      alert(`Please verify your ${editingField} with OTP before saving.`);
      return;
    } else {
      setFieldValue(editingField, editValue);
    }
    handleDialogClose();
  };

  const handleSendOtp = async (emailType) => {
    const emailToVerify = emailType === "current" ? editValue : newEmail;
    setOtpSent(true);
  };

  const handleVerifyOtp = async (emailType) => {
    if (otp === "123456") {
      if (emailType === "current") {
        setCurrentEmailVerified(true);
      } else {
        setNewEmailVerified(true);
      }
      setOtpSent(false);
      setOtp("");
    } else {
      alert("Invalid OTP");
    }
  };

  const renderField = (field, value, setFieldValue) => (
    <Grid item md={6} xs={12} key={field}>
      {field === "birth_date" ? (
        <DatePicker
          label={field.replace("_", " ").charAt(0).toUpperCase() + field.replace("_", " ").slice(1)}
          value={value}
          disabled
          slots={{
            textField: StyledTextField,
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              InputProps: {
                endAdornment: (
                  <StyledIconButton onClick={() => handleEditClick(field, value)}>
                    <EditIcon color="primary" fontSize="small" />
                  </StyledIconButton>
                ),
              },
            },
          }}
        />
      ) : (
        <StyledTextField
          fullWidth
          name={field}
          label={field.replace("_", " ").charAt(0).toUpperCase() + field.replace("_", " ").slice(1)}
          value={value}
          disabled
          type={field === "password" ? "password" : "text"}
          InputProps={{
            endAdornment: (
              <StyledIconButton onClick={() => handleEditClick(field, value)}>
                <EditIcon color="primary" fontSize="small" />
              </StyledIconButton>
            ),
            style: { fontSize: '1.1rem' },
          }}
        />
      )}
    </Grid>
  );

  const renderEmailFields = () => (
    <>
      <StyledTextField
        margin="dense"
        type="email"
        fullWidth
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        label="Current Email"
        disabled={currentEmailVerified}
        InputProps={{
          style: { fontSize: '1.1rem' },
        }}
      />
      {!currentEmailVerified && renderOtpSection("current")}
      {currentEmailVerified && (
        <>
          <StyledTextField
            margin="dense"
            type="email"
            fullWidth
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            label="New Email"
            disabled={newEmailVerified}
            InputProps={{
              style: { fontSize: '1.1rem' },
            }}
          />
          {newEmail && !newEmailVerified && renderOtpSection("new")}
        </>
      )}
    </>
  );

  const renderOtpSection = (emailType) => (
    <>
      {!otpSent ? (
        <StyledButton 
          variant="contained" 
          color="primary" 
          onClick={() => handleSendOtp(emailType)} 
          disabled={!editValue && emailType === "current" || !newEmail && emailType === "new"}
        >
          Send OTP 
        </StyledButton>
      ) : (
        <>
          <StyledTextField
            margin="dense"
            type="text"
            fullWidth
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            InputProps={{
              style: { fontSize: '1.1rem' },
            }}
          />
          <StyledButton 
            variant="contained" 
            color="secondary" 
            onClick={() => handleVerifyOtp(emailType)} 
            disabled={!otp}
          >
            Verify OTP 
          </StyledButton>
        </>
      )}
    </>
  );

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={INITIAL_VALUES}
      validationSchema={VALIDATION_SCHEMA}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <StyledPaper elevation={3}>
            <Grid container spacing={3}>
              {Object.keys(INITIAL_VALUES).map((field) => renderField(field, values[field], setFieldValue))}
            </Grid>
          </StyledPaper>

          <StyledDialog
            open={openDialog}
            onClose={handleDialogClose}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>
              Edit {editingField?.replace("_", " ").charAt(0).toUpperCase() + editingField?.replace("_", " ").slice(1)}
            </DialogTitle>
            <DialogContent>
              {editingField === "email" ? (
                renderEmailFields()
              ) : editingField === "birth_date" ? (
                <DatePicker
                  value={editValue}
                  onChange={(newValue) => setEditValue(newValue)}
                  slots={{
                    textField: StyledTextField,
                  }}
                  slotProps={{
                    textField: { fullWidth: true, margin: "normal" },
                  }}
                />
              ) : (
                <StyledTextField
                  autoFocus
                  margin="dense"
                  type={editingField === "password" ? "password" : "text"}
                  fullWidth
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  InputProps={{
                    style: { fontSize: '1.1rem' },
                  }}
                />
              )}
              {["contact", "password"].includes(editingField) && renderOtpSection(editingField)}
            </DialogContent>
            <DialogActions>
              <StyledButton 
                onClick={handleDialogClose} 
                style={{ 
                  backgroundColor: alpha('#000', 0.1),
                  color: 'inherit'
                }}
              >
                Cancel
              </StyledButton>
              <StyledButton
                onClick={() => handleDialogSave(setFieldValue)}
                color="secondary"
                variant="contained"
                disabled={
                  (editingField === "email" && (!currentEmailVerified || (newEmail && !newEmailVerified))) ||
                  (["contact", "password"].includes(editingField) && !otpVerified)
                }
              >
                Save
              </StyledButton>
            </DialogActions>
          </StyledDialog>
        </form>
      )}
    </Formik>
  );
}