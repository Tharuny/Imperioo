"use client";

import { usePathname, useRouter } from "next/navigation";
import { Fragment, useMemo } from "react";
import { useSelector } from "react-redux";

// MUI ICON COMPONENTS
import Place from "@mui/icons-material/Place";
import Person from "@mui/icons-material/Person";
import CreditCard from "@mui/icons-material/CreditCard";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";

// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";
import { Paragraph, Span } from "components/Typography";

// CUSTOM ICON COMPONENT
import CustomerService from "icons/CustomerService";

// STYLED COMPONENTS
import { MainContainer, StyledNavLink } from "./styles";

export default function Navigation() {
  const address = useSelector((state) => state.address.addressDetails);
  const wishlist=useSelector((state) => state.wishlist.wishlistData);
  const ordersData = useSelector((state) => state.vendorOrders.ordersList);
  const addressCount = address.length;
  const wishlistCount=wishlist.length;
  const pathname = usePathname();
  const router = useRouter();

  const MENUS = useMemo(() => [
    {
      title: "DASHBOARD",
      list: [
        {
          href: "/orders",
          title: "Orders",
          Icon: ShoppingBagOutlined,
          count: ordersData.length,
        },
        {
          href: "/wish-list",
          title: "Wishlist",
          Icon: FavoriteBorder,
          count: wishlistCount,
        },
        // {
        //   href: "/support-tickets",
        //   title: "Support Tickets",
        //   Icon: CustomerService,
        //   count: 1,
        // },
      ],
    },
    {
      title: "ACCOUNT SETTINGS",
      list: [
        {
          href: "/profile",
          title: "Profile Info",
          Icon: Person,
          count: 3,
        },
        {
          href: "/address",
          title: "Addresses",
          Icon: Place,
          count: addressCount,
        },
        {
          href: "/payment-methods",
          title: "Payment Methods",
          Icon: CreditCard,
          count: 4,
        },
      ],
    },
  ], [addressCount,wishlistCount,ordersData]);

  return (
    <MainContainer>
      {MENUS.map((item) => (
        <Fragment key={item.title}>
          <Paragraph p="26px 30px 1rem" color="grey.600" fontSize={12}>
            {item.title}
          </Paragraph>

          {item.list.map(({ Icon, count, href, title }) => (
            <StyledNavLink
              href={href}
              key={title}
              isCurrentPath={pathname.includes(href)}
            >
              <FlexBox alignItems="center" gap={1}>
                <Icon color="inherit" fontSize="small" className="nav-icon" />
                <Span>{title}</Span>
              </FlexBox>

              <Span>{count}</Span>
            </StyledNavLink>
          ))}
        </Fragment>
      ))}
    </MainContainer>
  );
}
