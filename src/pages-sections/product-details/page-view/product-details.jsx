import Container from "@mui/material/Container"; // Local CUSTOM COMPONENTS

import ProductTabs from "../product-tabs";
import ProductIntro from "../product-intro";
import AvailableShops from "../available-shops";
import RelatedProducts from "../related-products";
import FrequentlyBought from "../frequently-bought"; // CUSTOM DATA MODEL

// ==============================================================
export default function ProductDetailsPageView(props) {
  return <Container className="mt-5 mb-2">
      {
      /* PRODUCT DETAILS INFO AREA */
    }
      {props.product[0] && <ProductIntro product={props.product[0]} />}

      {
      /* PRODUCT DESCRIPTION AND REVIEW */
    }

    {props.product[0] && <ProductTabs specs={props.product[0]} />}
      

      {
      /* FREQUENTLY BOUGHT PRODUCTS AREA */
    }
      {/* <FrequentlyBought products={props.frequentlyBought} /> */}

      {
      /* AVAILABLE SHOPS AREA */
    }
      {/* <AvailableShops /> */}

      {
      /* RELATED PRODUCTS AREA */
    }
      { /*<RelatedProducts products={props.relatedProducts} />*/}
    </Container>;
}