import IconButton from "@mui/material/IconButton"; // MUI ICON COMPONENTS

import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder"; // ==============================================================
import { useDispatch, useSelector } from "react-redux";
import { addProductToWishlist, removeProductFromWishlist } from "app/store/wishlistRedux/wishlistActions";
import { HoverIconWrapper } from "components/product-cards/product-card/styles";


// ==============================================================
export default function FavoriteButton({
  isFavorite,
  toggleFavorite,
  toggleView,
  productId
}) {
  const dispatch = useDispatch();
  const userId = useSelector((state)=>state.user.userid);
 
  
  const handleFavorite = (productId,userId) =>{
    const data = {productId,userId};
    dispatch(addProductToWishlist(data));
  }
  const handleDelete = async (productId) => {
   
    dispatch(removeProductFromWishlist(productId,userId));
  };

  return <IconButton size="small" onClick={()=>{handleFavorite(productId,userId),handleDelete(productId),toggleFavorite}} sx={{
    position: "absolute",
    top: 15,
    right: 15
  }}>
       {isFavorite ? <Favorite color="primary" fontSize="small" /> : <FavoriteBorder fontSize="small" color="red" />}
    </IconButton>;
}