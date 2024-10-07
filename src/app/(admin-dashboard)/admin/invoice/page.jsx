"use client"
import { getInvoice } from "app/store/invoiceRedux/invoiceAction";
import { InvoiceListPageView } from "pages-sections/vendor-dashboard/invoice/page-view"; // API FUNCTIONS
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";

import api from "utils/__api__/dashboard";
const metadata = {
  title: "Categories - Bazaar Next.js E-commerce Template",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [
    {
      name: "UI-LIB",
      url: "https://ui-lib.com",
    },
  ],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};
export default async function Invoices() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getInvoice());
  },[])
  const invoices = useSelector((state)=>state.invoice.invoiceData);
  return <InvoiceListPageView invoices={invoices}/>;
}
