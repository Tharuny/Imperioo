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

import SearchArea from "../../search-box";
import CustomerRow from "../customer-row"; // TABLE HEAD COLUMN DATA

import { tableHeading } from "../table-heading"; // =============================================================================
import { useSelector,useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getCustomersForVendor } from "app/store/vendorRedux/customersRedux/customerAction";
// =============================================================================
const CustomersPageView = ({
  customers
}) => {
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort
  } = useMuiTable({
    listData: customers
  });

  const dispatch = useDispatch();
  const customersData = useSelector((state) => state.vendorSideCustomers.customersList);
  const [getCustomersData,setCustomersData] = useState(customersData);
  
  useEffect(() => {
    dispatch(getCustomersForVendor());
    console.log("ucucucucuc",getCustomersData)
  }, [dispatch]);

  
  useEffect(() => {
    setCustomersData(customersData);
  }, [customersData]);


  return <Box py={4}>
      <H3 mb={2}>Customers</H3>

      <SearchArea handleSearch={() => {}} buttonText="Add Customer" url="/admin/customers" searchPlaceholder="Search Customer..." />

      <Card>
        <Scrollbar>
          <TableContainer sx={{
          minWidth: 900
        }}>
            <Table>
              <TableHeader order={order} hideSelectBtn orderBy={orderBy} heading={tableHeading} numSelected={selected.length} rowCount={filteredList.length} onRequestSort={handleRequestSort} />

              <TableBody>
                {getCustomersData.map(customer => <CustomerRow customer={customer} key={customer.id} />)}
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

export default CustomersPageView;