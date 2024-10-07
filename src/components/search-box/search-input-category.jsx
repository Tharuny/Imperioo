"use client";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField"; // LOCAL CUSTOM COMPONENTS
import "./components/styles.css";
import SearchResult from "./components/search-result";
// import CategoryDropdown from "./components/category-dropdown"; // LOCAL CUSTOM HOOKS

import useSearch from "./hooks/use-search"; // CUSTOM ICON COMPONENT

import Search from "icons/Search";
import CategoryDropdown from "./components/category-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { getSearchProducts } from "app/store/SearchProductRedux/searchProductAction";
import { useEffect, useRef, useState } from "react";

export default function SearchInputWithCategory() {
  const {
    categoryTitle,
    parentRef,
    resultList,
    handleCategoryChange,
    handleSearch,
  } = useSearch();

  const dispatch = useDispatch();

  const handleSearchProducts = (e) => {
    setCount(1);
    document.getElementById("searchrows").style.display = "block";
    const value = e.target?.value;
    dispatch(getSearchProducts(value));
  };

  const [counter, setCounter] = useState(0);
  const [count, setCount] = useState(0);
  const [resultSearchProducts, setResultSearchProducts] = useState([]);
  const searchProducts = useSelector((state) => state.search.searchData);
  let prouductSearch = [];

  const searchInputRef = useRef(null);

  useEffect(() => {
    if (count == 0) {
      document.getElementById("searchrows").style.display = "none";
      setResultSearchProducts(prouductSearch);
    }

    setResultSearchProducts(searchProducts);
  }, [searchProducts, count]);

  const handleBlur = (e) => {
    // Check if the blur event is not triggered by clicking inside the search results
    if (!e.currentTarget.contains(e.relatedTarget)) {
      document.getElementById("searchrows").style.display = "none";
    }
  };

  const handleFocus = () => {
    if (resultSearchProducts.length > 0) {
      document.getElementById("searchrows").style.display = "block";
    }
  };

  const handlemouseclick = () => {
    setCount(0);
  };

  const handleClick = () =>{
    document.getElementById("searchrows").style.display = "none";
  }
  const handleMouseDown = (e) => {
    // Prevent the blur event from hiding the results when clicking inside the search results
    e.preventDefault();
  };

  const INPUT_PROPS = {
    sx: {
      border: 0,
      height: 44,
      padding: 0,
      overflow: "hidden",
      backgroundColor: "grey.200",
      "& .MuiOutlinedInput-notchedOutline": {
        border: 0,
      },
    },
  //   startAdornment: (
  //     <Box
  //       mr={2}
  //       px={2}
  //       display="grid"
  //       alignItems="center"
  //       justifyContent="center"
  //       borderRight="1px solid"
  //       borderColor="grey.400"
  //     >
  //       <CategoryDropdown
  //         title={categoryTitle}
  //         handleChange={handleCategoryChange}
  //       />
  //     </Box>
  //   ),
    endAdornment: (
      <Box
        mr={2}
        px={2}
        display="grid"
        alignItems="center"
        justifyContent="center"
        borderLeft="1px solid"
        borderColor="grey.400"
      >
        <Search
          sx={{
            fontSize: 17,
            color: "grey.600",
          }}
          onClick={handleClick}
          style={{
            cursor:'pointer'
          }}
        />
     </Box>
    ),
  };

  return (
    <Box
      position="relative"
      flex="1 1 0"
      maxWidth="670px"
      mx="auto"
      {...{
        ref: parentRef,
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Searching for..."
        onChange={handleSearchProducts}
        onBlur={handleBlur}
        onFocus={handleFocus}
        InputProps={INPUT_PROPS}
        inputRef={searchInputRef}
      />
      {/* SHOW SEARCH RESULT LIST */}
      <div
        id="searchrows"
        onMouseDown={handleMouseDown}
        onClick={handlemouseclick}
      >
        <SearchResult results={resultSearchProducts} />
      </div>
    </Box>
  );
}
