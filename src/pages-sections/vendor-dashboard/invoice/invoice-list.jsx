"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { H3 } from "components/Typography";
import { useDispatch, useSelector } from "react-redux";
import { getInvoice } from "app/store/invoiceRedux/invoiceAction";

const InvoiceList = (props) => {
  const dispatch = useDispatch();
  const invoiceList = useSelector((state) => state.invoice.invoiceData);
  const [invoices, setInvoices] = useState([]);
  // const addInvoices = (newInvoice) => {
  //   setInvoices([...invoices, newInvoice]);
  // };

  useEffect(() => {
    dispatch(getInvoice());
    // const fetchInvoices = async () => {
    //   try {
    //     const response = await fetch("/api/invoiceData", {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });
    //     const result = await response.json();
    //     setInvoices(result);
    //   } catch (error) {
    //     console.error("Error fetching invoices:", error);
    //   }
    // };

    // fetchInvoices();
  }, []);

  // useEffect(() => {
  //   dispatch(getInvoice());
  // }, [dispatch]);

  useEffect(() => {
    setInvoices(invoiceList);
  }, [invoiceList]);

  return (
    <>
      <Card sx={{ p: 6 }}>
        <H3 mb={2}>Invoice List</H3>
        <List>
          {invoices.map((invoice) => (
            <ListItem
              key={invoice.invoiceid}
              sx={{
                mb: 2,
                p: 2,
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "primary.main",
                color: "white",
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar
                    src={invoice.invoiceimage}
                    alt={`Invoice ${invoice.invoiceid}`}
                  />
                </Grid>
                <Grid item xs>
                  <ListItemText
                    primary={
                      <Typography
                        variant="h6"
                        sx={{ color: "white", fontFamily: "Arial" }}
                      >
                        Invoice ID: {invoice.invoiceid}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          variant="body2"
                          sx={{ color: "white", fontFamily: "Arial" }}
                        >
                          Invoice Number: {invoice.invoicenumber}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "white", fontFamily: "Arial" }}
                        >
                          Image URL: {invoice.invoiceimage}
                        </Typography>
                      </>
                    }
                  />
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </Card>
    </>
  );
};

export default InvoiceList;
