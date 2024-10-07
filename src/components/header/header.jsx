import { Fragment } from "react";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import clsx from "clsx";
import "./styles.css";
import useHeader from "./hooks/use-header";

import LazyImage from "components/LazyImage";
import FlexBox from "components/flex-box/flex-box";
import MobileHeader from "./components/mobile-header";
import DialogDrawer from "./components/dialog-drawer";
import CategoriesMenu from "./components/categories-menu";
import LoginCartButtons from "./components/login-cart-buttons";
import { HeaderWrapper, StyledContainer } from "./styles";
import { SearchInputWithCategory } from "components/search-box";
import Link from "next/link";

export default function Header({ isFixed, className, midSlot }) {
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down(1150));
  const { dialogOpen, sidenavOpen, toggleDialog, toggleSidenav } = useHeader();

  const CONTENT_FOR_LARGE_DEVICE = (
    <Fragment>
      {/* LEFT CONTENT - LOGO AND CATEGORY */}
      <FlexBox minWidth={100} alignItems="center">
        <Link href="/">
          <LazyImage src={require("../../../public/assets/images/logo2.svg")} alt="logo" />
        </Link>

        {/* SHOW DROP DOWN CATEGORY BUTTON WHEN HEADER FIXED */}
        {isFixed ? <CategoriesMenu /> : null}
      </FlexBox>

      {/* SEARCH FORM | NAVIGATION */}
      <div className="searchBar">
        <SearchInputWithCategory />
      </div>

      {/* LOGIN AND CART BUTTON */}
      <LoginCartButtons toggleDialog={toggleDialog} toggleSidenav={toggleSidenav} />

      {/* LOGIN FORM DIALOG AND CART SIDE BAR */}
      <DialogDrawer
        dialogOpen={dialogOpen}
        sidenavOpen={sidenavOpen}
        toggleDialog={toggleDialog}
        toggleSidenav={toggleSidenav}
      />
    </Fragment>
  );

  return (
      <HeaderWrapper className={clsx(className)}>
        <StyledContainer>
          {downMd ? <MobileHeader /> : CONTENT_FOR_LARGE_DEVICE}
        </StyledContainer>
        {/* Ensure the search bar appears below the header on mobile and tablet */}
        {downMd && (
          <>
            <div className="searchBar">
              <SearchInputWithCategory />
            </div>
          </>
        )}
      </HeaderWrapper>
  );
}
