"use client";

import Box from "@mui/material/Box";
import styled from "@mui/material/styles/styled"; // STYLED COMPONENTS

export const CardWrapper = styled(Box)({
  maxHeight: 240,
  overflow: "hidden",
  position: "relative",
  "& img": {
    transition: "0.3s"
  },
  ":hover": {
    img: {
      transform: "scale(1.1)"
    }
  }
});
export const CardContent = styled(Box, {
  shouldForwardProp: props => props !== "contentAlign"
})(({
  contentAlign,
  theme
}) => ({
  top: 0,
  zIndex: 1,
  color: "white",
  height: "100%",
  display: "flex",
  position: "absolute",
  flexDirection: "column",
  justifyContent: "center",
  ...(contentAlign === "left" ? {
    left: 32
  } : {
    right: 32,
    alignItems: "flex-end"
  }),
  ...(theme.direction === "rtl" && { ...(contentAlign === "left" ? {
      right: 32,
      alignItems: "flex-end"
    } : {
      left: 32
    })
  })
}));
export const CardLink = styled("span")({
  position: "relative",
  paddingBottom: "2px",
  textTransform: "uppercase",
  ":hover::after": {
    width: "100%"
  },
  ":after": {
    left: 0,
    bottom: 0,
    width: "0%",
    content: "''",
    height: "2px",
    transition: "0.3s",
    position: "absolute",
    backgroundColor: "white"
  }
});