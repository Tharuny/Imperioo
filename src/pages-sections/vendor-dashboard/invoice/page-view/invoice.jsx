"use client";

import Box from "@mui/material/Box"; // GLOBAL CUSTOM COMPONENT

import { H3 } from "components/Typography"; // Local CUSTOM COMPONENT

import InvoiceList from "../invoice-list";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { TableHeader, TablePagination } from "components/data-table"; // GLOBAL CUSTOM HOOK
import InvoiceRow from "../invoice-row";
import useMuiTable from "hooks/useMuiTable";
import Scrollbar from "components/scrollbar/scrollbar";
import { useState } from "react";

const InvoiceListPageView = (invoices) => {
  const filteredInvoices = invoices.invoices.map((invoice) => ({
    id: invoice.invoiceid,
    number: invoice.invoicenumber,
    url: invoice.invoiceimage,
  }));
  // TABLE HEADING DATA LIST
  const tableHeading = [
    {
      id: "name",
      label: "Invoice Number",
      align: "left",
    },
    {
      id: "image",
      label: "Image Url",
      align: "left",
    },
    {
      id: "action",
      label: "Action",
      align: "center",
    },
  ];

  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({
    listData: filteredInvoices,
    defaultSort: "purchaseDate",
    defaultOrder: "desc",
  });

  return (
    <Box py={4}>
      <Card>
        <H3 mb={2}>Invoice List</H3>
        <Scrollbar>
          <TableContainer
            sx={{
              minWidth: 900,
            }}
          >
            <Table>
              <TableHeader
                order={order}
                hideSelectBtn
                orderBy={orderBy}
                heading={tableHeading}
                numSelected={selected.length}
                rowCount={filteredList.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <InvoiceRow invoice={invoice} key={invoice.id} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(filteredList.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </Box>
  );
};

export default InvoiceListPageView;
