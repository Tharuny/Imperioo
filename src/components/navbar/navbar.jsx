// LOCAL CUSTOM COMPONENTS
import Categories from "./categories";
import NavigationList from "./nav-list"; // STYLED COMPONENTS

import { NavBarWrapper, InnerContainer } from "./styles"; // DATA TYPES
// ==========================================================

// ==========================================================
export default function Navbar({
  border,
  elevation = 2,
  hideCategories = false
}) {
  return <NavBarWrapper hoverEffect={false} elevation={elevation}>
      {hideCategories ? <InnerContainer sx={{
     
    }}>
          {/* <NavigationList /> */}
        </InnerContainer> : <InnerContainer>
         
          {/* <Categories /> */}

          {
        /* HORIZONTAL MENU */
      }
          <NavigationList />
        </InnerContainer>
      }
    </NavBarWrapper>;
}