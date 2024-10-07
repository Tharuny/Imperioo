"use client";

import { Fragment, useEffect, useState } from "react";
import ShoppingBag from "@mui/icons-material/ShoppingBag"; // Local CUSTOM COMPONENTS

import OrderRow from "../order-row";
import Pagination from "../../pagination";
import DashboardHeader from "../../dashboard-header"; // CUSTOM DATA MODEL
import { useDispatch, useSelector } from "react-redux";
import { getOrdersFromVendor } from "app/store/vendorRedux/orderRedux/orderAction";

// ====================================================
export default function OrdersPageView({
  orders
}) {
  const ordersData = useSelector((state) => state.vendorOrders.ordersList);
  const userId = useSelector((state) => state.user.userid);
  const [getOrdersData,setOrdersData] = useState(ordersData);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("ororororr",getOrdersData)
    const user ={
      userid:userId
    }
    dispatch(getOrdersFromVendor(user));
  }, []);

    useEffect(()=>{},[ordersData]);
  return <Fragment>
      {
      /* TITLE HEADER AREA */
    }
      <DashboardHeader Icon={ShoppingBag} title="My Orders" />

      {
      /* ORDER LIST AREA */
    }
      {ordersData.map(order => <OrderRow order={order} key={order.id} />)}

      {
      /* ORDERS PAGINATION */
    }
      {/* <Pagination count={5} onChange={data} /> */}
    </Fragment>;
}