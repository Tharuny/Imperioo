import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton"; // MUI ICON COMPONENT

import Avatar from "@mui/material/Avatar";

import PersonOutline from "@mui/icons-material/PersonOutline"; // CUSTOM ICON COMPONENT

import ShoppingBagOutlined from "icons/ShoppingBagOutlined"; // GLOBAL CUSTOM HO
import useCart from "hooks/useCart";
import { H6 } from "components/Typography";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import UserAccountPopover from "components/layouts/customer-dashboard/user-account-popover";
// ==============================================================

// ==============================================================
export default function LoginCartButtonsMobileView({
  toggleDialog,
  toggleSidenav
}) {
  const dispatch=useDispatch();
  
  const loginVerified=useSelector((state)=>state.user.loginVerified)
  const username=useSelector((state)=>state.user.username)
  const [isValid,setValidity]=useState(false);
  const router=useRouter()
  useEffect(()=>{
  
    setValidity(loginVerified)
  },[loginVerified,username])
  
  const handleClick=()=>{
    router.push("/profile")
  }
  const {
    state
  } = useCart();
  const ICON_COLOR = {
    color: "grey.600"
  };

  return <div style={{display:'flex',marginTop:'15px'}}>

     <div>
          {isValid?<div > 
              {/* <IconButton onClick={handleClick}>
                <Avatar alt="Remy Sharp" src="/assets/images/avatars/001-man.svg" />
              </IconButton> */}
                  <div style={{textAlign:'center',justifyContent:'center',paddingBottom:'50%'}}>
                      <UserAccountPopover  username={username}/>
                      {/* {username&&<p style={{fontSize:"12px"}}>{username}</p>} */}
                  </div>
              </div>
              :<div style={{marginBottom:'15px'}}><IconButton onClick={toggleDialog}>
              <PersonOutline sx={ICON_COLOR} />
            </IconButton></div>}
    </div>

    </div>;
}