"use client";
// import "../../../components/product-cards/product-card-7/styles/card.css";
import Link from "next/link";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import { H3, Span } from "components/Typography"; // LOCAL CUSTOM HOOK

import useProduct from "../use-product"; // LOCAL CUSTOM COMPONENTS
import "./styles/card.css";
import ProductPrice from "../product-price";
import DiscountChip from "../discount-chip";
import ProductStatus from "./components/product-status";
import ProductRating from "../product-rating";
import QuantityButtons from "./components/quantity-buttons"; // STYLED COMPONENTS


import { StyledCard, ContentWrapper, ColorBox, ImgBox } from "./styles"; // =======================================================


// =======================================================
export default function ProductCard7(props) {

  return <StyledCard className="Grid">
      <Link href={`/products/${props.slug}`}>
        <ImgBox className="bg-white" >
          {
          /* PRODUCT BADGE STATUS IF STATUS AVAILABLE */
        }
          <ProductStatus  />

          {
          /* DISCOUNT PERCENT CHIP IF AVAILABLE */
        }
          <DiscountChip 
         />

          {
          /* PRODUCT IMAGE / THUMBNAIL */
        }
          <div className="img-wrapper bg-white ">
            <LazyImage  className="image" alt={props.ptitle} width={300} height={273}  src="/assets/images/furniture-products/b-3.png"/>
          </div>
        </ImgBox>
      </Link>

      <ContentWrapper>
        <div className="content">
          {
          /* PRODUCT TITLE / NAME */
        }
          <Link href={`/products/${props.slug}`}>
            <div  className= "product-title">
              <p className="pname" mb={1} ellipsis title={props.ptitle}  >
                {props.ptitle}
              </p>
            </div>
            
          </Link>

          {
          /* PRODUCT RATING / REVIEW  */
        }
          {/* <ProductRating showRating={!hideRating} rating={rating} /> */}

          {
          /* PRODUCT COLORS */
         }
          {/* {productColors.length ? <ColorBox>
               {productColors.map((color, ind) => <Span key={ind} bgcolor={color} />)}
             </ColorBox> : null} */}

          {
          /* PRODUCT PRICE WITH DISCOUNT */
        }
        
            {/* <ProductPrice  price={props.price} discount={props.discount}/>  */}
        </div>

        {
        /* PRODUCT QUANTITY HANDLER BUTTONS */
      }
        {/* <QuantityButtons  handleIncrement={handleIncrementQuantity} handleDecrement={handleDecrementQuantity} /> */}
      </ContentWrapper>
    </StyledCard>;
}