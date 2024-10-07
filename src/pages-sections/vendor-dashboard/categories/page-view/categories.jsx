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
import { useState,useEffect } from "react";
import CategoryRow from "../category-row";
import SearchArea from "../../search-box"; // CUSTOM DATA MODEL

// TABLE HEAD COLUMN DATA
import { tableHeading } from "../table-heading"; // =============================================================================
import { useDispatch, useSelector } from "react-redux";
// getting categories action to get categories where states are active
import { getCategoriesFromVendor } from "app/store/vendorRedux/CategoryRedux/categoryAction";
import { TableCell, TableHead, TableRow } from "@mui/material";

// =============================================================================
import { capital } from "app/store/capitalize/capitalizeText";
import Pagination from "pages-sections/customer-dashboard/pagination";
// ====imppppppp=========================================================================
const CategoriesPageView = () => {
  const dispatch = useDispatch();
  
  const getCategoriesState = useSelector((state) => state.vendorCategory.categoryList);
  const [getCategories, setGetCategories] = useState(getCategoriesState);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  useEffect(() => {
    dispatch(getCategoriesFromVendor());
  }, [dispatch]);
  
  useEffect(() => {
    setGetCategories(getCategoriesState);
  }, [getCategoriesState]);
  
  const rowsLength = getCategories.length;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const requiredRows = getCategories.slice(indexOfFirstRow, indexOfLastRow);

  const handleChangePage = (event, page) => {
    console.log("cateor",page)
    setCurrentPage(page); // Pagination library often expects 0-based index
  };

  return (
    <Box py={4}>
      <H3 mb={2}>Categories</H3>
      <SearchArea handleSearch={() => {}} buttonText="Add Category" url="/admin/categories/create" searchPlaceholder="Search Category..." />
      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 900 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requiredRows.map(category => (
                  <CategoryRow
                    key={category.categoryid} // Add key prop to avoid React warnings
                    id={category.categoryid}
                    category={category.categoryname}
                    selected={false} // Assuming this should be false by default; adjust as needed
                    status={category.status}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <Stack alignItems="center" my={4}>
          <Pagination
            rowsPerPageOptions={[]}
            component="div"
            count={Math.ceil(rowsLength/rowsPerPage)}
            rowsPerPage={rowsPerPage}
            page={currentPage} // Pagination library often expects 0-based index
            onChange={handleChangePage}
          />
        </Stack>
      </Card>
    </Box>
  );
};

export default CategoriesPageView;

