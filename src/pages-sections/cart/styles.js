import Card from "@mui/material/Card";
import styled from "@mui/material/styles/styled";
export const Wrapper = styled(Card)(({
  theme
}) => ({
  display: "flex",
  overflow: "hidden",
  alignItems: "center",
  position: "relative",
  borderRadius: "10px",
  marginBottom: "1.5rem",
  boxShadow: theme.shadows[2],
  backgroundColor: theme.palette.background.paper,
  ":hover": {
    transform: "translateY(-1px)",
    boxShadow:"0 4px 20px rgba(0, 0, 0, 0.2)",
  },
  "@media only screen and (max-width: 425px)": {
    flexWrap: "wrap",
    img: {
      height: "auto",
      minWidth: "100%"
    }
  }
}));