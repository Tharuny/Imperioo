"use client"
import { useEffect, useState } from "react";
import { ProductReviewsPageView } from "pages-sections/vendor-dashboard/products/page-view"; // API FUNCTIONS
import { useDispatch,useSelector } from "react-redux";
import api from "utils/__api__/dashboard";
import { getReview } from "app/store/reviewRedux/reviewAction";
const metadata = {
  title: "Product Reviews - Bazaar Next.js E-commerce Template",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{
    name: "UI-LIB",
    url: "https://ui-lib.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function ProductReviews() {
  
 
 
  return <ProductReviewsPageView  />;
}
 
 
 