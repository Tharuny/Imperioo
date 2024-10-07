"use client";
import { useCallback, useState, useMemo,useEffect } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
// MUI ICON COMPONENTS
import Apps from "@mui/icons-material/Apps";
import ViewList from "@mui/icons-material/ViewList";
import FilterList from "@mui/icons-material/FilterList";
import { getAllProducts } from "app/store/ProductsRedux/productAction";
// Local CUSTOM COMPONENT
import ProductFilterCard from "../product-filter-card";

// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";
import Sidenav from "components/side-nav/side-nav";
import { H5, Paragraph } from "components/Typography";
import ProductsGridView from "components/products-view/products-grid-view";
import ProductsListView from "components/products-view/products-list-view";

// PRODUCT DATA
import productDatabase from "data/product-database";
import { set } from "lodash";
import { useParams, useSearchParams } from "next/navigation";

const SORT_OPTIONS = [
  {
    label: "Relevance",
    value: "Relevance"
  },
  {
    label: "Date (Newest First)",
    value: "Date Newest"
  },
  {
    label: "Date (Oldest First)",
    value: "Date Oldest"
  },
  {
    label: "Price Low to High",
    value: "Price Low to High"
  },
  {
    label: "Price High to Low",
    value: "Price High to Low"
  }
];

export default function ProductSearchPageView() { 
  const [view, setView] = useState("grid");
  const [sortOption, setSortOption] = useState(SORT_OPTIONS[0].value);
  const downMd = useMediaQuery(theme => theme.breakpoints.down("md"));
  const toggleView = useCallback(v => () => setView(v), []);
  const PRODUCTS = productDatabase.slice(95, 104);
  const productBysub=useSelector(state=>state.productBySubCategory.productsBasedOnSubcategories);
  // const allProducts = useSelector((state)=>state.productBySubCategory.productsBasedOnSubcategories);
  const [alProducts,setAlProducts] = useState([]);
  const searchParams=useSearchParams();
  const key = searchParams.get('key');
  const cartData = useSelector((state) => state.cartModified.cartData);
  const dispatch=useDispatch();
  
  useEffect(()=>{
    setData(productBysub);
    // setAlProducts(allProducts);
  },[productBysub])



  //all product data from api call
  const [data, setData] = useState([]);


  // need to get state data for each product
  useEffect(() => {
    dispatch(getAllProducts(key));
  }, []);//commented by samuel - 22-09-24


  return (
    <Container className="mt-2 mb-3">
      {/* FILTER ACTION AREA */}
      {/* <Card
        elevation={1}
        sx={{
          mb: "55px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          p: {
            sm: "1rem 1.25rem",
            md: "0.5rem 1.25rem",
            xs: "1.25rem 1.25rem 0.25rem"
          }
        }}
      >
        <div> */}
          {/* <H5>Searching for " mobile phone "</H5> */}
          {/* <Paragraph color="grey.600">{sortedProducts.length} results found</Paragraph> */}
        {/* </div> */}

        {/* <FlexBox alignItems="center" columnGap={4} flexWrap="wrap" my="0.5rem"> */}
          {/* <FlexBox alignItems="center" gap={1} flex="1 1 0">
            <Paragraph color="grey.600" whiteSpace="pre">
              Sort by:
            </Paragraph>

            <TextField
              select
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Short by"
              value={sortOption}
              onChange={e => setSortOption(e.target.value)}
              sx={{
                flex: "1 1 0",
                minWidth: "150px"
              }}
            >
              {SORT_OPTIONS.map(item => (
                <MenuItem value={item.value} key={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          </FlexBox> */}

          {/* <FlexBox alignItems="center" my="0.25rem">
            <Paragraph color="grey.600" mr={1}>
              View:
            </Paragraph>

            <IconButton onClick={toggleView("grid")}>
              <Apps
                color={view === "grid" ? "primary" : "inherit"}
                fontSize="small"
              />
            </IconButton>

            <IconButton onClick={toggleView("list")}>
              <ViewList
                color={view === "list" ? "primary" : "inherit"}
                fontSize="small"
              />
            </IconButton> */}

            {/* SHOW IN THE SMALL DEVICE */}
            {/* {downMd && (
              <Sidenav
                handler={close => (
                  <IconButton onClick={close}>
                    <FilterList fontSize="small" />
                  </IconButton>
                )}
              >
                <ProductFilterCard />
              </Sidenav>
            )}
          </FlexBox>
        </FlexBox>
      </Card> */}

      <Grid container spacing={3}>
        {/* PRODUCT FILTER SIDEBAR AREA */}
        <Grid
          item
          md={3}
          sx={{
            display: {
              md: "block",
              xs: "none"
            }
          }}
        >
          <ProductFilterCard />
        </Grid>

        {/* PRODUCT VIEW AREA */}
        <Grid item md={9} xs={12}>
          {view === "grid" ? (
            <ProductsGridView products={data} />
          ) : (
           <></>
            // <ProductsListView products={data} /> list is not in use as of now
          )}
        </Grid>
      </Grid>
    </Container>
  );
}