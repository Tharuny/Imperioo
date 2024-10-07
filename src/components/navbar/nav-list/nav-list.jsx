  "use client"
  import MenuItem from "@mui/material/MenuItem"; // MUI ICON COMPONENTS

  import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown"; // GLOBAL CUSTOM COMPONENTS

  import { NavLink } from "components/nav-link";
  import { FlexBox } from "components/flex-box";
  import BazaarCard from "components/BazaarCard"; // LOCAL CUSTOM COMPONENTS

  import MegaMenu from "../mega-menu";
  import NavItemChild from "./nav-item-child";
  import CategoryBasedMenu from "../category-based-menu"; // NAVIGATION DATA LIST

  import navigation from "data/navbarNavigation"; // STYLED COMPONENTS
  import { H6 } from "components/Typography";
  import { StyledNavLink, NAV_LINK_STYLES, ChildNavListWrapper } from "../styles"; // DATA TYPES
  import Link from "next/link";
  import { useRouter } from "next/router";
  export default function NavigationList() {


    const renderNestedNav = (list = [], isRoot = false) => {
      return list.map(nav => {
        if (isRoot) {
          // SHOW MEGA MENU
          if (nav.megaMenu) {
            return  <MegaMenu key={nav.title} title={nav.title} menuList={nav.child} />;
          } // SHOW MEGA MENU WITH SUB ITEMS
    


          if (nav.megaMenuWithSub) {
            return <CategoryBasedMenu key={nav.title} title={nav.title} menuList={nav.child} />;
          }
        

          if (nav.url) {
            if (nav.title === "CONTACT US") {
              return (
                <StyledNavLink href="/#Contact" key={nav.title} >
                  <H6>{nav.title}</H6>
                </StyledNavLink>
              );
            }
            return (
              <StyledNavLink href={nav.url} key={nav.title}>
                <H6>{nav.title}</H6>
              </StyledNavLink>
            );
          }

          //if (nav.child) {
        //    if (nav.title === "ABOUT"){
        //     return <FlexBox key={nav.title} alignItems="center" position="relative" flexDirection="column" sx={{
        //       "&:hover": {
        //         "& > .child-nav-item": {
        //           display: "block"
        //         }
        //       }
        //     }}>
        //        <Link href="/#About">
        //        <FlexBox alignItems="flex-end" gap={0.3} sx={NAV_LINK_STYLES}>
        //         <H6> {nav.title}</H6>
        //         </FlexBox>
        //        </Link>

        //        {/* <ChildNavListWrapper className="child-nav-item">
        //           <BazaarCard elevation={3} sx={{
        //           mt: 2.5,
        //           py: 1,
        //           minWidth: 100
        //         }}>
        //             {renderNestedNav(nav.child)}
        //           </BazaarCard>
        //         </ChildNavListWrapper> */}
        //       </FlexBox>;
        //    }else{
        //     return <FlexBox key={nav.title} alignItems="center" position="relative" flexDirection="column" sx={{
        //       "&:hover": {
        //         "& > .child-nav-item": {
        //           display: "block"
        //         }
        //       }
        //     }}>
              
        //        <FlexBox alignItems="flex-end" gap={0.3} sx={NAV_LINK_STYLES}>
        //         <H6> {nav.title}</H6>
        //         </FlexBox>

        //        {/* <ChildNavListWrapper className="child-nav-item">
        //           <BazaarCard elevation={3} sx={{
        //           mt: 2.5,
        //           py: 1,
        //           minWidth: 100
        //         }}>
        //             {renderNestedNav(nav.child)}
        //           </BazaarCard>
        //         </ChildNavListWrapper> */}
        //       </FlexBox>;
        //    }
        //   }
        // } else {
        //   if (nav.url) {
        //     return <NavLink href={nav.url} key={nav.title}>
        //         <MenuItem>{nav.title}</MenuItem>
        //       </NavLink>;
        //   }

        //   if (nav.child) {
        //     return <NavItemChild nav={nav} key={nav.title}>
        //         {renderNestedNav(nav.child)}
        //       </NavItemChild>;
        //   }
        // }
      }}
    );
    };

    return <FlexBox gap={15}>{renderNestedNav(navigation, true)}</FlexBox>;
  }