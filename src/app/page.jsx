  "use client"
  import React, { useRef } from "react";
  import Header from "components/header/header";
  import Furniture from "pages-sections/furniture-1/page-view/furniture-1";
  import Section12 from "pages-sections/furniture-1/section-12";
  import { Footer1 } from "components/footer";
  import { Navbar } from "components/navbar";
  import './app.css';
import Sticky from "components/sticky/Sticky";
import { MobileNavigationBar } from "components/mobile-navigation";
import StickyNew from "components/sticky/issticky";

  export default function IndexPage() {

  const handleSticky = (isSticky) => {
    console.log('Is sticky:', isSticky);
  };
    return (
          <>
      <StickyNew fixedOn={0} scrollDistance={200}>
        <Header style={{ background: '', padding: '1rem' }}/>
      </StickyNew>

      <Navbar />
      <Furniture  />
      <Section12 id="contact"></Section12>
      <Footer1 />
    </>
  );
}
