"use client";

import { Fragment, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { FlexBetween, FlexBox } from "components/flex-box";
import { H5, H6, Paragraph, Span } from "components/Typography";
import AccordionHeader from "components/accordion/accordion-header";
import { getAllProducts, getProducts } from "app/store/ProductsRedux/productAction";

const categoryList = [
  {
    title: "Chairs",
    subCategories: [],
  },
  {
    title: "Tables",
    subCategories: [],
  },
  {
    title: "Sofas",
    subCategories: [],
  },
  {
    title: "Recliners ",
    subCategories: [],
  },
];

const discountOptions = [
  "50% or more",
  "40% or more",
  "30% or more",
  "20% or more",
  "10% or more",
];

const ratingOptions = [
  { value: 4, label: "4★ & above" },
  { value: 3, label: "3★ & above" },
  { value: 2, label: "2★ & above" },
  { value: 1, label: "1★ & above" },
];

export default function ProductFilterCard() {
  const [collapsed, setCollapsed] = useState({});
  const [selectedRating, setSelectedRating] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [mappingCategories, setMappingCategories] = useState([]);
  const [mappedSubCategories, setMappedSubCategories] = useState([]);
  const [colorData, setColorData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch=useDispatch();

  useEffect(() => {
    const fetchColorData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/user-colors`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const result = await response.json();
  
        if (response.ok) {
          setColorData(result.data);
        } else {
          setError(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error('Error:', error);
        setError(`Unexpected error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchColorData();
  }, []);

  const handlePriceRangeChange = (event, type) => {
    const value = event.target.value;
    const isValidValue = value === "" || parseInt(value) >= 1;

    if (isValidValue) {
      setPriceRange((prevPriceRange) => ({
        ...prevPriceRange,
        [type]: value,
      }));
    }
  };

  const handleColorChange = (color) => {
    setSelectedColor(color === selectedColor ? null : color);
  };

  const handleDiscountChange = (discount) => {
    setSelectedDiscount(discount);
  };

  // const clearFilters = () => {
  //   setPriceRange({ min: "", max: "" });
  //   setSelectedDiscount(null);
  //   setSelectedRating(null);
  //   setCollapsed({});
  //   setSelectedColor(null);
  // };

  const clearFilters=()=>{
    dispatch(getAllProducts("products"))
  }

  const handleCollapseToggle = (category) => {
    setCollapsed((prevState) => {
      const newState = Object.keys(prevState).reduce((acc, curr) => {
        acc[curr] = false;
        return acc;
      }, {});
      newState[category] = !prevState[category];
      return newState;
    });
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await fetch("/api/subcategory?key=subcategories", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setSubcategories(result);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        setError(error.message);
      } 
    };

    fetchSubcategories();
  }, []);

  useEffect(() => {
    if (subcategories.length > 0) {
      const groupedCategories = {};

      subcategories.forEach((subcategory) => {
        const { categoryname } = subcategory;
        if (!groupedCategories[categoryname]) {
          groupedCategories[categoryname] = [];
        }
        groupedCategories[categoryname].push(subcategory);
      });

      const mappedCategories = Object.keys(groupedCategories).map(
        (categoryname) => ({
          categoryname,
          subcategories: groupedCategories[categoryname],
        })
      );

      setMappingCategories(mappedCategories);
    }
  }, [subcategories]);

  

  const getid=(id)=>{
  }

  return (
    <Card
      sx={{ p: "18px 27px", overflow: "auto", fontStyle: "normal" }}
      elevation={1}
    >
      <H6 mb={1.25}>Categories</H6>
      {mappingCategories.map((item) =>
        item.subcategories ? (
          <Fragment key={item.categoryname}>
            <AccordionHeader
              open={collapsed[item.categoryname]}
              onClick={() => handleCollapseToggle(item.categoryname)}
              sx={{ padding: ".5rem 0", cursor: "pointer", color: "grey.600" }}
            >
              <Span>{item.categoryname.toUpperCase().charAt(0)+item.categoryname.slice(1)}</Span>

            </AccordionHeader>
            <Collapse in={collapsed[item.categoryname]}>
              {item.subcategories.map((name) => (
                
                <Paragraph
                  pl="22px"
                  py={0.75}
                  key={name.subcategoryname}
                  fontSize="14px"
                  color="grey.600"
                  sx={{ cursor: "pointer" }}
                  onClick={() =>dispatch(getProducts(name.subcategoryid))}
                  // style={{border:'1px solid black'}}
                >
                  {name.subcategoryname.toUpperCase().charAt(0)+name.subcategoryname.slice(1)}
                </Paragraph>
              ))}
            </Collapse>
          </Fragment>
        ) : (
          <Paragraph
            key={item.categoryname}
            sx={{
              py: 0.75,
              cursor: "pointer",
              color: "grey.600",
              fontSize: 14,
            }}
          >
            {item.categoryname}
          </Paragraph>
        )
      )}

      <Box component={Divider} my={3} />

      {/* <H6 mb={2}>Price Range</H6>
      <FlexBetween>
        <TextField
          placeholder="Min"
          type="number"
          size="small"
          fullWidth
          value={priceRange.min}
          onChange={(e) => handlePriceRangeChange(e, "min")}
        />
        <H5 color="grey.600" px={1}>
          -
        </H5>
        <TextField
          placeholder="Max"
          type="number"
          size="small"
          fullWidth
          value={priceRange.max}
          onChange={(e) => handlePriceRangeChange(e, "max")}
        />
      </FlexBetween>

      <Box component={Divider} my={3} /> */}

      {/* <H6 mb={2}>Customer Ratings</H6>
      {ratingOptions.map((item) => (
        <FormControlLabel
          key={item.value}
          control={
            <Checkbox
              size="small"
              color="secondary"
              checked={selectedRating === item.value}
              onChange={() => handleRatingChange(item.value)}
            />
          }
          label={<Span color="inherit">{item.label}</Span>}
          sx={{ display: "flex" }}
        />
      ))} */}

      {/* <Box component={Divider} my={3} />  */}
      {/* <Box component={Divider} my={3} /> */}


      {/* <H6 mb={2}>Colors</H6>
      {isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress size={24} />
        </Box>
      ) : error ? (
        <Paragraph color="error">{error}</Paragraph>
      ) : (
        <FlexBox mb={2} flexWrap="wrap" gap={1}>
          {colorData.map((item) => (
            <Box
              key={item.colorcode}
              width={25}
              height={25}
              flexShrink={0}
              bgcolor={item.colorcode}
              borderRadius="50%"
              sx={{
                cursor: "pointer",
                border: selectedColor === item.hex_code
                  ? "2px solid black"
                  : "none",
              }}
              onClick={() => handleColorChange(item.hex_code)}
            />
          ))}
        </FlexBox>
      )}

      <Box component={Divider} my={3} /> */}

      <Button variant="contained" color="primary" onClick={clearFilters}>
        Reset Filter
      </Button>
    </Card>
  );
}