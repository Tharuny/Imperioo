import React from 'react'
import InvoiceDetailsForm from '../../../../../pages-sections/vendor-dashboard/invoice/invoiceDetails-form'
import { Box } from '@mui/material';
import { H3 } from 'components/Typography';

const page = () => {
  const initialValues = {
    invoicenumber:"",
    productname:"",
    productid:"",
    invoiceid:"",
    quantity:"",
    remainingquantity:"",
    marginprice:"",
    originalprice:"",
    discount:"",
    profit:"",
    sellingprice:"",
  }

  return <Box py={4}>
  <H3 mb={2}>Invoice Details</H3>
  <InvoiceDetailsForm initialValues={initialValues}/>
</Box>;
}

export default page
