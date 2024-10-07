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
import {useState,useEffect} from 'react';
import SizeRow from "../size-row";
import SearchArea from "../../search-box"; // CUSTOM DATA MODEL

// TABLE HEAD COLUMN DATA
import { tableHeading } from "../table-heading"; // =============================================================================

// =============================================================================
const SizesPageView = (sizes) => 
  {
  const data=sizes.sizes;
  
  const filteredSizes = data.map((size)=>{
    id:size.sizeid;
    sname:size.sizename
  });

  // const {order,orderBy,selected,rowsPerPage,filteredList,handleChangePage,handleRequestSort} = useMuiTable({
  //   listData: filteredSizes,
  //   defaultSort: "name"
  // });

  return <Box py={4}>
      <H3 mb={2}>Product Sizes</H3>

      <SearchArea handleSearch={() => {}} buttonText="Add Size" url="/admin/sizes/create" searchPlaceholder="Search Size..." />

      <Card>
        <Scrollbar>
          <TableContainer sx={{
          minWidth: 600
        }}>
            <Table>
              {/* <TableHeader order={order} hideSelectBtn orderBy={orderBy} heading={tableHeading} numSelected={selected.length} rowCount={filteredList.length} onRequestSort={handleRequestSort} /> */}

              <TableBody>
                
                {data.map(size => <SizeRow sizeData={size} />)}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          {/* <TablePagination onChange={handleChangePage} count={Math.ceil(filteredList.length / rowsPerPage)} /> */}
        </Stack>
      </Card>
    </Box>;
};

export default SizesPageView;