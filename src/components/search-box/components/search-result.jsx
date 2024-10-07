import Link from "next/link";
import MenuItem from "@mui/material/MenuItem"; // STYLED COMPONENT
import { SearchResultCard } from "../styles";
import "./styles.css";
// ==============================================================

// ==============================================================
export default function SearchResult(props) {
  const searchList = props.results;
   // Converting to Encode for slug
   const encode = (name, id) => {
    let slugString = "key=" + name + "&upi="; // Adding Remaining Text and encoded id
    let encodedid = slugString
      + Buffer.from(id).toString("base64")
        .replace(/\+/g, "-") // Replace '+' with '-' for URL safety
        .replace(/\//g, "_") // Replace '/' with '_' for URL safety
        .replace(/=+$/, ""); // Remove trailing '=' characters
    return encodedid;
  };
  return (
    <SearchResultCard elevation={2} style={{width:'100%',height:'auto',overflow:'auto',scrollbarWidth:'none'}}>
      {searchList.length>0 ?searchList.map((item) => (
        <Link href={`/products/${encode(item.productname,item.productid )}`} key={item.productid}>
        <MenuItem key={item.productid}>{item.productname}</MenuItem>
        </Link>
      )) : <p className="search">No results found...</p>}
    </SearchResultCard>
  );
}
