import MenuItem from "@mui/material/MenuItem";
import TouchRipple from "@mui/material/ButtonBase";
import useTheme from "@mui/material/styles/useTheme";
import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined";
import BazaarMenu from "components/BazaarMenu";
import { DropDownHandler } from "../styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCategoriesFromVendor } from "app/store/vendorRedux/CategoryRedux/categoryAction";

export default function CategoryDropdown({ title, handleChange }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesFromVendor());
  }, [dispatch]);

  const SubCategories = useSelector((state) => state.subcategory.subcatgeoryDetails);
  const Categories = useSelector((state) => state.vendorCategory.categoryList);

  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);

  const handleMouseEnterCategory = (event, categoryId) => {
    const rect = event.target.getBoundingClientRect();
    setMenuPosition({ top: rect.top, left: rect.right });
    setHoveredCategory(categoryId);
    setIsSubMenuVisible(true);
  };

  const handleMouseLeaveCategory = () => {
    setTimeout(() => {
      if (!isSubMenuVisible) {
        setHoveredCategory(null);
      }
    }, 300);
  };

  const handleMouseEnterSubMenu = () => {
    setIsSubMenuVisible(true);
  };

  const handleMouseLeaveSubMenu = () => {
    setIsSubMenuVisible(false);
    setTimeout(() => {
      if (!isSubMenuVisible) {
        setHoveredCategory(null);
      }
    }, 300);
  };

  const { breakpoints } = useTheme();

  return (
    <div style={{ position: 'relative' }}>
      <BazaarMenu
        direction="left"
        sx={{ zIndex: breakpoints.down("md") ? 99999 : 1502 }}
        handler={
          <DropDownHandler
            px={3}
            gap={0.5}
            height="100%"
            color="grey.700"
            alignItems="center"
            component={TouchRipple}
          >
            {title}
            <KeyboardArrowDownOutlined fontSize="small" color="inherit" />
          </DropDownHandler>
        }
      >
        {Categories.map((item) => (
          <div
            key={item.categoryid}
            style={{ position: 'relative' }}
            onMouseEnter={(event) => handleMouseEnterCategory(event, item.categoryid)}
            onMouseLeave={handleMouseLeaveCategory}
          >
            <MenuItem onClick={() => handleChange(item)}>
              {item.categoryname}
            </MenuItem>
          </div>
        ))}
      </BazaarMenu>

      {hoveredCategory && SubCategories.filter((sub) => sub.categoryid === hoveredCategory).length > 0 && (
        <div
          style={{
            position: 'fixed',
            top: menuPosition.top,
            left: menuPosition.left,
            zIndex: 1503,
            backgroundColor: 'white',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            padding: '10px',
            minWidth: '200px',
          }}
          onMouseEnter={handleMouseEnterSubMenu}
          onMouseLeave={handleMouseLeaveSubMenu}
        >
          {SubCategories.filter((sub) => sub.categoryid === hoveredCategory).map((subItem) => (
            <MenuItem
              key={subItem.subcategoryid}
              sx={{
                cursor: 'pointer',
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                '&:hover': {
                  backgroundColor: '#f0f0f0', // Light gray background on hover
                },
              }}
            >
              {subItem.subcategoryname}
            </MenuItem>
          ))}
        </div>
      )}
    </div>
  );
}
