  // GLOBAL CUSTOM COMPONENTS
  'use client'
  import Setting from "components/settings";
  import Newsletter from "components/newsletter"; // LOCAL CUSTOM COMPONENTS

import Sidebar from "../sidebar";
import Section1 from "../section-1";
import Section3 from "../section-3";
import Section4 from "../section-4";
import Section5 from "../section-5/section-5";
import Section6 from "../section-6/section-6";
import Section7 from "../section-7/section-7";
import Section8 from "../section-8/section-8";
import Section11 from "../section-11/section-11";
// API FUNCTIONS
import ContactForm from "../contact-form/contact-form";
import api from "utils/__api__/furniture-1";
import { useState,useEffect } from "react";
import { set } from "lodash";
import Section10 from "../section-10/section-10";
import Section9 from "../section-9/section-9";
import Section13 from "../section-13/section-13";
import Section14 from "../section-14/section-14";
import Section12 from "pages-sections/furniture-1/section-12";
import { HomeWrapper } from "./styles";

export default  function FurnitureOnePageView() {
    

    
    return <HomeWrapper>
        {
        /* HERO SECTION */
      }
        <Section1 />

        {
        /* LEFT SIDEBAR & OFFER BANNERS AREA */
      }
        {/* <Sidebar navList={sidebarNavList} /> */}

      {
      /* Shop By Category */
    }
      {/* <Section5 heading="Shop By Categories" description="Tall blind but were, been folks not the expand"  /> */}
    



     
        {
        /* Shop By Category */
      }
        {/* <Section5 heading="Shop By Categories" description="Tall blind but were, been folks not the expand"  /> */}


        {
        /* TOP NEW PRODUCTS AREA */
      }
        {/* <Section7 heading="Top New Product" description="Tall blind but were, been folks not the expand" /> */}

      {
      /* Best SELLING PRODUCT AREA */
    }
      {/* <Section8 heading="Best Selling Products"  description="Tall blind but were, been folks not the expand" /> */}
    
      {
      /* Recommended SELLING PRODUCT AREA */
    }
      {/* <Section3 heading="Recommended products" description="Tall blind but were, been folks not the expand" /> */}
      
      {
      /*   Dicounts */
    }
      {/* <Section6 heading="Products With Discounts"  description="Tall blind but were, been folks not the expand" /> */}
      
    {
      /* ALL PRODUCTS AREA */
    }
      {/* <Section4 /> */}

        {
        /* Best SELLING PRODUCT AREA */
      }
      {/* <div id="Products">
      <Section8 heading="Best Selling Products"  description="Tall blind but were, been folks not the expand" />

        </div>         */}
        {
        /* Recommended SELLING PRODUCT AREA */
      }
        {/* <Section3 heading="Recommended products" description="Tall blind but were, been folks not the expand" /> */}
        
        {
        /*   Dicounts */
      }
        {/* <Section6 heading="Products With Discounts"  description="Tall blind but were, been folks not the expand" /> */}
        
      {
        /* ALL PRODUCTS AREA */
      }
        {/* <Section4 /> */}

      {/* MAIN INDUSTRIES AREA */}
        {
        /* POPUP NEWSLETTER FORM */
      }

    {/* ContactForm */}
    {/* <ContactForm/> */}
        {/* <Newsletter image="/assets/images/newsletter/bg-3.png" /> */}

    

      {
      /* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */
    }
      {/* <Setting /> */}

      {/* Products */}
      <Section13 heading="PRODUCTS"/>

       {/* Top new products */}
       <Section14  heading="TOP NEW PRODUCTS" />

         {/* <Section9/>collections ===>> categories*/}
      <Section9 heading="COLLECTIONS"/>

      {/* Featured Clients */}
       {/* <Section11 heading="FEATURED CLIENTS" description="At WEBSOC.AI , we are proud to work with amazing brands across the globe"/> */}

      {
      /* MAIN INDUSTRIES  */
    }
    {/* <Section7 heading="MAIN INDUSTRIES" description="Tall blind but were, been folks not the expand" /> */}

    {/* ALL PROJECCTS */}
    {/* <div style={{border:"2px solid transparent"}}>
    <Section10  heading="PROJECTS" description="Tall blind but were, been folks not the expand"/>
    </div> */}
   

    {
            /* Contact Form */
  }
    {/* <div id="Contact">
    <Section12  />

    </div> */}
    {/* Contact-form */}
    </HomeWrapper>
    
        {
        /* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */
      }
        <Setting />
  }