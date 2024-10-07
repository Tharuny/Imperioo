"use client";

import styled from "@mui/material/styles/styled";
export const RootStyle = styled("div")(({
  theme
}) => ({
  minHeight: 500,
  borderRadius: 12,
  display: "flex",
  overflow: "hidden",
  position: "relative",
  background: "linear-gradient(90deg, #28B5BB 0%, #FFF 100%)",
  ".doctor-img": {
    objectFit: "cover"
  },
  ".content": {
    left: 80,
    top: "50%",
    color: "white",
    position: "absolute",
    transform: "translateY(-50%)",
    [theme.breakpoints.down("lg")]: {
      left: 48
    },
    [theme.breakpoints.down(375)]: {
      h2: {
        fontSize: 24
      }
    }
  },
  ".btn-group": {
    gap: ".75rem",
    display: "flex",
    button: {
      borderRadius: 20,
      paddingInline: 20,
      ":last-child": {
        color: "black"
      }
    }
  },
  [theme.breakpoints.down("sm")]: {
    minHeight: 400,
    background: theme.palette.primary.main,
    ".doctor-img": {
      display: "none"
    },
    "& .content": {
      left: 0,
      paddingInline: "2rem"
    }
  }
}));