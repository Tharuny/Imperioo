"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer"; // GLOBAL CUSTOM COMPONENTS

import { H3 } from "components/Typography";
import Scrollbar from "components/scrollbar";
import { TableHeader, TablePagination } from "components/data-table"; // GLOBAL CUSTOM HOOK

import useMuiTable from "hooks/useMuiTable"; // Local CUSTOM COMPONENT

import OrderRow from "../order-row";
import SearchArea from "../../search-box"; // CUSTOM DATA MODEL

// TABLE HEAD COLUMN DATA
import { tableHeading } from "../table-heading"; // =============================================================================
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersFromVendor } from "app/store/vendorRedux/orderRedux/orderAction";
// =============================================================================
const OrdersPageView = ({
  orders
}) => {
 
  const filteredOrders = orders.map(item => ({
    id: item.id,
    qty: item.items.length,
    purchaseDate: item.createdAt,
    billingAddress: item.shippingAddress,
    amount: item.totalPrice,
    status: item.status
  }));
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort
  } = useMuiTable({
    listData: filteredOrders,
    defaultSort: "purchaseDate",
    defaultOrder: "desc"
  });
  const dispatch = useDispatch();
  const ordersData = useSelector((state) => state.vendorOrders.ordersList);
  const [getOrdersData,setOrdersData] = useState(ordersData);
  
  useEffect(() => {
    console.log("ororororr",getOrdersData)
    const user={
      userid:"NA"
    }
    dispatch(getOrdersFromVendor(user));
  }, [dispatch]);

  
  useEffect(() => {
    setOrdersData(ordersData);
  }, [ordersData]);


  return <Box py={4}>
      <H3 mb={2}>Orders</H3>

      <SearchArea handleSearch={() => {}} buttonText="Create Order" url="/admin/orders" searchPlaceholder="Search Order..." />

      <Card>
        <Scrollbar>
          <TableContainer sx={{
          minWidth: 900
        }}>
            <Table>
              <TableHeader order={order} hideSelectBtn orderBy={orderBy} heading={tableHeading} numSelected={selected.length} rowCount={filteredList.length} onRequestSort={handleRequestSort} />

              <TableBody>
                {getOrdersData.map(order => <OrderRow order={order} key={order.id} />)}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination onChange={handleChangePage} count={Math.ceil(filteredList.length / rowsPerPage)} />
        </Stack>
      </Card>
    </Box>;
};

export default OrdersPageView;