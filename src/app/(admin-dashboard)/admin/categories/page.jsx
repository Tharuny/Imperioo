'use client'
import { CategoriesPageView } from "pages-sections/vendor-dashboard/categories/page-view"; // API FUNCTIONS
import { useState,useEffect } from "react";
import api from "utils/__api__/dashboard";
import { useDispatch,useSelector } from "react-redux";
import { getCategory } from "app/store/categoryRedux/categoryAction";
const metadata = {
  title: "Categories - Bazaar Next.js E-commerce Template",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{
    name: "UI-LIB",
    url: "https://ui-lib.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function Categories() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getCategory());
  },[]);
  const categories = useSelector((state)=>state.category.categoryData);
  return <CategoriesPageView categories={categories} />;
}