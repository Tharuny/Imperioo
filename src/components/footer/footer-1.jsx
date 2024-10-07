import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container"; // LOCAL CUSTOM COMPONENT

import LogoSection from "./components/logo";
import AboutLinks from "./components/about-links";
import SocialLinks from "./components/social-links";
import CustomerCareLinks from "./components/customer-care-links"; // GLOBAL CUSTOM COMPONENTS

import { Paragraph } from "components/Typography"; // STYLED COMPONENTS

import { ATag, H3Tag, Heading, HrTag, StyledLink } from "./styles";
import AppStore from "./components/app-store";
export default function Footer1() {
  return (
      <div id="About">
            <Box component="footer" bgcolor="#222935" mb={{
                sm: 0,
                xs: 7
              }}>
                  <Box component={Container} color="white" overflow="hidden" py={{
                  sm: 10,
                  xs: 4
                }}>
                    <Grid container spacing={3}>
                    <Grid item lg={2.3} md={6} sm={6} xs={12}>
                        {/* <AboutLinks /> */}
                        <Heading>Corporate</Heading>

                        <StyledLink  href="/" >About Us</StyledLink>
                        <StyledLink  href="/" >Corporate Governance</StyledLink>
                        <StyledLink  href="/" >ABF in the news</StyledLink>
                        <StyledLink  href="/" >Careers</StyledLink>
                      </Grid>

                      {
                      /* ABOUT US LINKS */
                    }
                      <Grid item lg={2.3} md={6} sm={6} xs={12}>
                      <Heading>Useful Links</Heading>

                          <StyledLink  href="/" >About Us</StyledLink>
                          <StyledLink  href="/" >Corporate Governance</StyledLink>
                          <StyledLink  href="/" >ABF in the news</StyledLink>
                          <StyledLink  href="/" >Careers</StyledLink>
                      </Grid>

                      <Grid item lg={2.3} md={6} sm={6} xs={12}>
                      <Heading>Partner with Us</Heading>

                            <StyledLink  href="/" >About Us</StyledLink>
                            <StyledLink  href="/" >Corporate Governance</StyledLink>
                            <StyledLink  href="/" >ABF in the news</StyledLink>
                            <StyledLink  href="/" >Careers</StyledLink>
                      </Grid>

                      {
                      /* CUSTOMER CARE LINKS */
                    }
                      <Grid item lg={2.4} md={6} sm={6} xs={12}>
                      <Heading>Need Help ?</Heading>

                        <StyledLink  href="/" >About Us</StyledLink>
                        <StyledLink  href="/" >Corporate Governance</StyledLink>
                        <StyledLink  href="/" >ABF in the news</StyledLink>
                        <StyledLink  href="/" >Careers</StyledLink>
                      </Grid>

                      {
                      /* CONTACT & SOCIAL LINKS */
                    }
                      <Grid item lg={2.5} md={6} sm={6} xs={12}>
                      <Heading>Shop Built Safe Products</Heading>

                            <StyledLink  href="/" >About Us</StyledLink>
                            <StyledLink  href="/" >Corporate Governance</StyledLink>
                            <StyledLink  href="/" >ABF in the news</StyledLink>
                            <StyledLink  href="/" >Careers</StyledLink>
                        <AppStore/>
                      
                      </Grid>
                    
                    </Grid>
                    <HrTag/>
                    {/* <hr style={{marginTop:"3%",marginBottom:"3%",opacity:"0.2"}}/> */}
                    <Grid container spacing={3}>
                      <Grid item lg={7} md={6} sm={6} xs={12}>
                        {/* <LogoSection /> */}
                        <H3Tag>We Accept</H3Tag>

                      </Grid>

                      {
                      /* ABOUT US LINKS */
                    }
                      <Grid item lg={5} md={6} sm={6} xs={12}>
                        <H3Tag>Like  What  You  See ?  Follow us Here</H3Tag>
                        <SocialLinks/>
                      </Grid>
                    
                    </Grid>
                    <HrTag/>
                    <Grid  display="flex" justifyContent="center" >
                      <Grid item lg={12} md={6} sm={6} xs={12} >
                        {/* <LogoSection /> */}
                        <ATag href="">Whitehat</ATag>
                        <ATag href="">Sitemap</ATag>
                        <ATag href="">Terms of Us</ATag>
                        <ATag href="">Privacy Policy</ATag>
                        <ATag href="">Your Data And Security</ATag>
                        <ATag href="">Grievance Redressal</ATag>
                        <Heading style={{marginTop:"30px",marginLeft:"200px",marginBottom:"opx"}}>© Copyright ABF Limited</Heading>
                      </Grid>
                    
                    </Grid>


                  </Box>
                  
                </Box>
</div>
  )
 
}