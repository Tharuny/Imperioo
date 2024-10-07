import IconButton from "@mui/material/IconButton"; // MUI ICON COMPONENTS

import Favorite from "@mui/icons-material/Favorite";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder"; // STYLED COMPONENTS
import { HoverIconWrapper } from "../styles";
import { useDispatch, useSelector } from "react-redux";
import { addProductToWishlist, removeProductFromWishlist } from "app/store/wishlistRedux/wishlistActions";
// ==============================================================

export default function HoverActions({
  productId,
  isFavorite,
  toggleFavorite,
  toggleView,
}) {
  const dispatch = useDispatch();
  const userId=useSelector((state)=>state.user.userid)
  const handleDelete = async (productId) => {
   
    dispatch(removeProductFromWishlist(productId,userId));
  };
  const handleclick =()=>{
    
  }

  return (
    <HoverIconWrapper className="hover-box">
      <IconButton onClick={toggleView}>
        <RemoveRedEye color="disabled" fontSize="small" />
      </IconButton>

      <IconButton
        onClick={() => {
          handleDelete(productId);
          toggleFavorite;
        }}
      >
        {isFavorite ? (
                    <FavoriteBorder fontSize="small" />

        ) : (
          <Favorite style={{color:'red'}} fontSize="small" />

        )}
      </IconButton>
    </HoverIconWrapper>
  );
}
