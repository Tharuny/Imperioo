import IconButton from "@mui/material/IconButton"; // MUI ICON COMPONENTS

import Favorite from "@mui/icons-material/Favorite";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder"; // STYLED COMPONENTS
import { useDispatch, useSelector } from "react-redux";
import { addProductToWishlist, removeProductFromWishlist } from "app/store/wishlistRedux/wishlistActions";
import { useRouter } from "next/navigation";
import { HoverIconWrapper } from "../styles";
import { useEffect,useState} from "react";
// ==============================================================

export default function HoverActions({
  productId,
  isFavorite,
  toggleFavorite,
  toggleView
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const userId = useSelector((state) => state.user.userid);
  const userValid = useSelector((state) => state.user.loginVerified);
  const wishlist = useSelector(state => state.wishlist.wishlistData);
  const [wishlistdata,setWishlistdata]=useState([])
  
useEffect(()=>{

},[wishlist])
 

  // const handleFavorite = (productId, userId) => {
  //   if (userValid) {
  //     const data = { productId, userId };
  //   
  //     if(!isFavorite)
  //     {
  //   
  //     dispatch(addProductToWishlist(data));
  //     }
  //   } else {
  //     router.push("/login");
  //   }
  // };

  const handleClick=(productId, userId)=>{
    if(!isFavorite)
    {
      if (userValid) {
        const data = { productId, userId };
      
        dispatch(addProductToWishlist(data));
        }
        else {
          router.push("/login");
        }
      }
      else
      {

        if (userValid) {
         
          dispatch(removeProductFromWishlist(productId, userId));
        } else {
          router.push("/login");
        }
      } 
    }

  // const handleDelete = async (productId) => {
  //   if (userValid) {
  //   
  //     if(isFavorite)
  //     {
  //     dispatch(removeProductFromWishlist(productId, userId));
  //     }
  //   } else {
  //     router.push("/login");
  //   }
  // };

  return (
    <HoverIconWrapper className="hover-box">
      <IconButton onClick={toggleView}>
        <RemoveRedEye color="disabled" fontSize="small" />
      </IconButton>

      <IconButton onClick={() => { handleClick(productId, userId);toggleFavorite(); }}>
        {isFavorite ? <Favorite color="primary" fontSize="small" /> : <FavoriteBorder fontSize="small" />}
      </IconButton>
    </HoverIconWrapper>
  );
}
