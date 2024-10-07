'use client'
import { notFound } from "next/navigation"; // PAGE VIEW COMPONENT

import { ProductDetailsPageView } from "pages-sections/product-details/page-view"; // API FUNCTIONS
import { useState,useEffect } from "react";
import api from "utils/__api__/products";
import { getFrequentlyBought, getRelatedProducts } from "utils/__api__/related-products";
const metadata = {
  title: "Product Details - Bazaar Next.js E-commerce Template",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{
    name: "UI-LIB",
    url: "https://ui-lib.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function ProductDetails({
  params
}) {
    const [data,setData]=useState({})
    // added by -sa
    // Decoding the encode string by removing extra text added and decoding encoded text by Buffer class
    const decode = (encodedText) => 
      {
      const base64 = encodedText.split("&")[1].split("=")[1]
          .replace(/-/g, '+') //replacing - with + because while encoding change to +
          .replace(/_/g, '/');
      
      // Decode Base64
      // here base64 gives the encoded String using from method using static Buffer class 
      return Buffer.from(base64, 'base64').toString('utf8'); 
      };

    useEffect(()=>{

      const fetchData = async () => {
      try {
        const value = decode(decodeURIComponent(params.slug)); // Extract the slug parameter
        const response = await fetch(`/api/product?key=${value}`, {
          method: 'GET'
        });
        const productData = await response.json(); // Parse the JSON response
        setData(productData); // Update the state with the fetched data
      } catch (error) {
      }
    };

    fetchData();
    },[])
    // const relatedProducts = await getRelatedProducts();
    // const frequentlyBought = await getFrequentlyBought();
    return <ProductDetailsPageView product={data} />
}