"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button"; // MUI ICON COMPONENTS

import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove"; // GLOBAL CUSTOM HOOK

import useCart from "hooks/useCart"; // GLOBAL CUSTOM COMPONENTS

import LazyImage from "components/LazyImage";
import { H1, H2, H3, H6 } from "components/Typography";
import { FlexBox, FlexRowCenter } from "components/flex-box"; // CUSTOM UTILS LIBRARY FUNCTION

import { currency } from "lib"; // DUMMY DATA

import productVariants from "data/product-variants"; // CUSTOM DATA MODEL
import ProductDescription from "./product-description";
import zIndex from "@mui/material/styles/zIndex";
import { getRating } from "app/store/ratingRedux/ratingAction";
import { useDispatch, useSelector } from "react-redux";
import ProductSpecifications from "./product-specification";
import { getColor } from "app/store/colorRedux/colorAction";
import ProductDescription1 from "./product-description1";
import { useRouter } from "next/navigation";
import { capital } from "app/store/capitalize/capitalizeText";
import { addProductToCart, addProductToCartDetail } from "app/store/UserCartRedux/UserCartAction";

export default function ProductIntro({ product }) {
  const cartData = useSelector((state) => state.cartModified.cartData);
  console.log("cartData",cartData)
  let cartqty=0;
  cartData.map((item)=>{
    if(item.productid==product.productid)
    {
      cartqty=item.quantity;
    }
  })

  console.log("quantity",cartqty)
  const router=useRouter();
  const userValid=useSelector((state)=>state.user.loginVerified)
  const userId=useSelector((state)=>state.user.userid)
  const [productid,setProductid]=useState(product.productid); 
  const rate = useSelector(state=>state.rating.ratingDetails)
  const [overallRating,setOverallRating]= useState(rate);
  useEffect(()=>{
     
  },[rate,cartData])
  let {
    id,
    currentprice,
    originalprice,
    productname,
    description,
    specification,
    // images = "/assets/images/furniture-products/b-2.png",
    slug,
    thumbnail
  } = product|| {};

  // const [selectedImage, setSelectedImage] = useState(0);
  const [selectVariants, setSelectVariants] = useState({
    option: "option",
    type: "type"
  });
  const [zoomEnabled, setZoomEnabled] = useState(false);
  const [capitalizedProductName, setCapitalizedProductName] = useState("");
  const [capitalizedDescription, setCapitalizedDescription] = useState("");
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const dispatch1=useDispatch();
  

  const handleChangeVariant = (variantName, value) => () => {
    setSelectVariants(state => ({ ...state, [variantName.toLowerCase()]: value }));
  };



  const handleCartAmountChange = amount => () => {
    if(userValid)
    {
      console.log("amount",typeof(Number(amount)))
      const productData = {
        id:product.productid,
        userid: userId,
        qty: amount,
        remainingqty: 0,
      };
    dispatch1(addProductToCart(productData));
   }
   else{
    router.push("/login");
   }
  };

  const images = [
    "/assets/images/furniture-products/b-3.png",
    "/assets/images/furniture-products/b-2.png",
    "/assets/images/furniture-products/furniture-7.png"
  ];

  const [selectedImage, setSelectedImage] = useState(0);

  const handleImageClick = (index) => () => {
    setSelectedImage(index);
  };
  
 

  const handleMouseMove = (e) => {
    if (zoomEnabled) {
      const rect = imageRef.current.getBoundingClientRect();
      setZoomPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseEnter = () => {
    setZoomEnabled(true);
  };

  const handleMouseLeave = () => {
    setZoomEnabled(false);
  };
 

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [zoomEnabled]);


  useEffect(()=>{
     dispatch1(getRating(productid));
  },[overallRating])

  useEffect(() => {
    if (productname) {
      const capitalize = capital(productname);
      capitalize().then(result => {
        setCapitalizedProductName(result);
      });
    }
  }, [productname]);

  useEffect(() => {
    if (description) {
      const capitalize = capital(description);
      capitalize().then(result => {
        setCapitalizedDescription(result);
      });
    }
  }, [description]);

  const color_id=product.colorids.split(",");
  const color_name=product.colornames.split(",");
  const color_code=product.colorcodes.split(",");
 
  return (
    <Box width="100%">
      <Grid container spacing={12} padding="5% 5% 0% 5%" >
       
        <Grid  md={7} xs={12} >
        <Box display="flex" padding="5%" paddingLeft="10%">
            <FlexBox flexDirection="column" alignItems="center">
                {images.map((url, ind) => (
                  <FlexRowCenter
                    key={ind}
                    width={80}
                    height={80}
                    minWidth={64}
                    bgcolor="white"
                    border="1px solid"
                    borderRadius="10px"
                    mb={ind === images.length - 1 ? 0 : "10px"}
                    style={{ cursor: "pointer" }}
                    onClick={handleImageClick(ind)}
                    borderColor={selectedImage === ind ? "primary.main" : "grey.400"}
                  >
                    <Avatar alt="product" src={url} variant="square" sx={{ height: 40 }} />
                  </FlexRowCenter>
                ))}
              </FlexBox>

              <Box margin="5% 0 0 20% " padding="0">
                <img 
                  src={images[selectedImage]} 
                  alt="Selected product" 
                  style={{ width: '350px', height: '350px' }}
                  />
              </Box>

                 {/* {zoomEnabled && (
            <Box
              position="absolute"
              top="20%"
              left="40%"
              transform="translate(-50%, -50%)"
              width={800}
              height={500}
              overflow="hidden"
              zIndex={1500}
              bgcolor="white"
              border="1px solid"
              borderColor="grey.400"
              borderRadius={2}
              sx={{
                backgroundImage: `url(${product.images[selectedImage]})`,
                backgroundPosition: `-${zoomPosition.x * 2}px -${zoomPosition.y * 2}px`,
                backgroundSize: `${product.images[selectedImage].width * 4}px ${product.images[selectedImage].height * 4}px`,
                backgroundRepeat: "no-repeat",
              }}
            />
        )} */}

          {/* <ProductSpecifications data={product.specification} /> */}
        

            

          </Box>

        </Grid>

         {/* PRODUCT DETAILS AREA */}
        {/* <Grid item md={5} xs={12} alignItems="center" padding="10%" >
      
        </Grid> */}
        <Grid  md={5} xs={12} >
        <Box padding="5%">
            {
            /* PRODUCT NAME */
          }
            {/* <H1 mb={1}>{productname}</H1> */}
            <H1 mb={1}>{capitalizedProductName || productname}</H1>


            {
            /* PRODUCT BRAND */
          }
           

            {
            /* PRODUCT RATING */
          }
            <FlexBox alignItems="center" gap={1} mb={2}>
              <Box lineHeight="1">Rated:</Box>
              <Rating color="warn" value={Number(rate)} readOnly />
              <H6 lineHeight="1">{Number(rate)}</H6>
            </FlexBox>

            {/* <FlexBox alignItems="center" mb={1} >
              <div>Brand: </div>
              <H6>ABF</H6>
            </FlexBox> */}

            <FlexBox mb={1}>
              {/* <ProductDescription1 data={product.description}/> */}
              <ProductDescription1 data={capitalizedDescription || description}/>
            </FlexBox>

            {
            /* PRODUCT COLORS */
          }
            <Box lineHeight="1" mb={1}>Colors:</Box>
              
              <Grid container spacing={1}>
              {color_name.map((variant, index) => (
                  <Grid item key={index}>
                    {/* <p style={{marginRight:"1px"}}>{variant}</p> */}
                    <div style={{
                      backgroundColor: color_code[index], // Use color_code for actual color values
                      borderRadius: "50%",
                      height: "40px",
                      width: "40px",
                      marginTop: "10px",
                      cursor: "pointer",
                      marginRight:"5px"
                    }}>
                    </div>
                  </Grid>
                ))}

              </Grid>

            {
            /* PRICE & STOCK */
          }
            <Box pt={1} mb={3}>
              <FlexBox alignItems="center" gap={1} mt={0.5}>
                <H2 color="primary.main" mb={0.5} lineHeight="1">
                  {currency(currentprice)}
                </H2>
                <Box component="del" fontWeight={600} color="grey.600">
                  {currency(originalprice)}
                </Box> 
              </FlexBox>
              <Box color="inherit">Stock Available</Box>
            </Box>

            {
            /* ADD TO CART BUTTON */
          }
            {(cartqty<=0)?
            <Button color="primary" variant="contained" onClick={handleCartAmountChange(cartqty + 1)} sx={{
            mb: 4.5,
            px: "1.75rem",
            height: 40
          }}>
                Add to Cart
              </Button> :
               <FlexBox alignItems="center" mb={4.5}>
                <Button size="small" sx={{
              p: 1
            }} color="primary" variant="outlined" onClick={handleCartAmountChange(cartqty - 1)}>
                  <Remove fontSize="small" />
                </Button>

                <H3 fontWeight="600" mx={2.5}>
                {cartqty}
                </H3>

                <Button size="small" sx={{
              p: 1
            }} color="primary" variant="outlined" onClick={handleCartAmountChange(Number(cartqty) + 1)}>
                  <Add fontSize="small" />
                </Button>
              </FlexBox>}

            {
            /* SHOP NAME */
          }
            <FlexBox alignItems="center" gap={1} mb={2}>
              {/* <div>Sold By:</div>
              <Link href="/shops/scarlett-beauty">
                <H6>Mobile Store</H6>
              </Link> */}
            </FlexBox>

            </Box>
           

        </Grid>
      </Grid>
    </Box>
  );
}




