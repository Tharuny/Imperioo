// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import { H1, H3, Paragraph } from "components/Typography"; // STYLED COMPONENTS

import { StyledLink, BannerRoot } from "../styles"; // IMPORT IMAGE

import sofaImage from "../../../../../public/assets/images/furniture-products/b-2.png";
export default function Card3() {
  return <BannerRoot>
      {/* <div>
        <H3 fontSize={24}>Dining Room</H3>

        <H1 color="primary.main" fontSize={{
        xl: 42,
        xs: 36
      }}>
          50% OFF
        </H1>

        <Paragraph fontSize={16}>All Kind of Furniture Items</Paragraph>

        <StyledLink href="/sales-1">Shop Now</StyledLink>
      </div> */}

      <div className="img-wrapper max-w-xl">
        <LazyImage alt="Sofa" src={sofaImage} />
      </div>
    </BannerRoot>;
}