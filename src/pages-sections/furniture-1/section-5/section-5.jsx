import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack"; // LOCAL CUSTOM COMPONENTS

import Card1 from "./components/card-1";
import Card2 from "./components/card-2";
import Card3 from "./components/card-3";
import Card4 from "./components/card-4";

import { H1,Paragraph } from "components/Typography";


export default function Section5({heading,description}) {
  return (
    <div className="p-2">
      <div>
        <H1>{heading}</H1>
        {/* <Paragraph color="grey.600" mb={4}>{description}</Paragraph> */}
      </div>
     
       <Grid container spacing={1}>
       {
        /* WINTER OFFER 50% OFF BANNER CARD */
        }
        <Grid item xs={12} sm={6} md={4} className="p-3">
          <Card1 />
        </Grid>

        {
        /* WINTER OFFER 50% OFF BANNER CARD */
        }
        <Grid item xs={12} sm={6} md={4} className="p-3">
          <Card2 />
        </Grid>

       
        {
        /* WINTER OFFER 50% OFF BANNER CARD */
        }
        <Grid item xs={12} sm={6} md={4} className="p-3">
          <Card3 />
        </Grid>

        {
        /* WINTER OFFER 50% OFF BANNER CARD */
        }
        <Grid item xs={12} sm={6} md={4} className="p-3">
          <Card4 />
        </Grid>

        </Grid>
    </div>
  )

}