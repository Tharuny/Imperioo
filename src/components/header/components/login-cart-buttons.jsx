import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton"; // MUI ICON COMPONENT
import Avatar from "@mui/material/Avatar";
import PersonOutline from "@mui/icons-material/PersonOutline"; // CUSTOM ICON COMPONENT
import ShoppingBagOutlined from "icons/ShoppingBagOutlined"; // GLOBAL CUSTOM HO
import useCart from "hooks/useCart";
import { H6 } from "components/Typography";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import UserAccountPopover from "components/layouts/customer-dashboard/user-account-popover";

export default function LoginCartButtons({
  toggleDialog,
  toggleSidenav
}) {
  const dispatch = useDispatch();
  
  const loginVerified = useSelector((state) => state.user.loginVerified);
  const username = useSelector((state) => state.user.username);
  const [isValid, setValidity] = useState(false);
  const router = useRouter();
  const cartData = useSelector((state) => state.cartModified.cartData);
  useEffect(() => {
    setValidity(loginVerified);
  }, [loginVerified, username]);

  const handleProfileClick = () => {
    router.push("/profile");
  };

  const handleWishlistClick = () => {
    if (loginVerified) {
      router.push("/wish-list");
    } else {
      router.push("/login");
    }
  };

  const { state } = useCart();
  const ICON_COLOR = {
    color: "grey.600"
  };

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <IconButton onClick={handleWishlistClick}>
          <FavoriteBorderOutlinedIcon sx={ICON_COLOR} />
        </IconButton>
      </div>
      <div>
        <Badge badgeContent={cartData.length} color="primary">
          <IconButton onClick={loginVerified ? toggleSidenav : () => { router.push("/login") }}>
            <ShoppingBagOutlined sx={ICON_COLOR} />
          </IconButton>
        </Badge>
      </div>
      <div>
        {isValid ? (
          <div>
            <div style={{ textAlign: 'center', marginTop: '6px' }}>
              <UserAccountPopover username={username} />
              {/* {username && <p style={{ fontSize: "12px" }}>{username}</p>} */}
            </div>
          </div>
        ) : (
          <IconButton onClick={toggleDialog}>
            <PersonOutline sx={ICON_COLOR} />
          </IconButton>
        )}
      </div>
    </div>
  );
}
