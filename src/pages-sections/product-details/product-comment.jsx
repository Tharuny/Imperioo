"use client";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import { FlexBox } from "components/flex-box";
import { H5, H6, Paragraph, Span } from "components/Typography";
import Pagination from "pages-sections/customer-dashboard/pagination";
// import { getDateDifference } from "lib";


export default function ProductComment(props) {
  const {
    firstname,
    // imgUrl,
    rating,
    reviewcomment
  } = props || {};
  return (
    <Box mb={4} maxWidth={600} borderBottom="1px solid #e0e0e0"  padding={2}>
      <Box maxHeight={400} overflow="auto" css={{ '&::-webkit-scrollbar': { width: '8px' }, '&::-webkit-scrollbar-track': { background: '#f1f1f1' }, '&::-webkit-scrollbar-thumb': { background: '#888' }, '&::-webkit-scrollbar-thumb:hover': { background: '#555' } }}>
        <FlexBox alignItems="center" mb={2} gap={2}>
          <Avatar alt={firstname}/>
          <div>
            <H5 mb={1}>{firstname}</H5>
            <FlexBox alignItems="center" gap={1.25}>
              <Rating size="small" value={rating} color="warn" readOnly />
              <H6>{rating}</H6>
              {/* <Span>{getDateDifference(date)}</Span> */}
            </FlexBox>
          </div>
         
          
        </FlexBox>
        <Paragraph color="grey.700">{reviewcomment}</Paragraph>
      </Box>
    </Box>
  );
}