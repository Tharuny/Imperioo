"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { H3 } from "components/Typography";
import SearchArea from "../../search-box";
import { StyledTableCell } from "pages-sections/vendor-dashboard/styles";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesFromVendor } from "app/store/vendorRedux/CategoryRedux/categoryAction";
import { deleteSubCategoryById, getAllSubCategoriesFromVendor, getSubCategoriesFromVendor, updateSubCategoryById } from "app/store/vendorRedux/SubCategroyRedux/subCategoryAciton";
import SubCategoryRow from "../subcategory-row";
import { Card } from "@mui/material";
import Scrollbar from "components/scrollbar/scrollbar";
import useMuiTable from "hooks/useMuiTable";
import { capital } from "app/store/capitalize/capitalizeText";
import Pagination from "pages-sections/customer-dashboard/pagination";
const SubCategoriesPageView = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [mappingCategories, setMappingCategories] = useState([]);
  const [mappedSubCategories, setMappedSubCategories] = useState([]);
  const [formData, setFormData] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const categories = useSelector((state) => state.vendorCategory.categoryList);
  const subcategories = useSelector((state) => state.vendorSubCategory.subcategoryList);
  const [getSubCategories, setGetSubCategories] = useState(subcategories);
  const [subcategoryvalue, setsubcategoryvalue] = useState("");
  const [editStatus, setEditStatus] = useState();
  const [subcategoryIdd, setsubcategoryIdd] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categorykeyid, setCategoryId] = useState("");
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 8;

  // useEffect(() => {
  //   dispatch(getCategoriesFromVendor());
  // }, []);

  useEffect(() => {
    dispatch(getAllSubCategoriesFromVendor());
  }, [dispatch]);



  useEffect(() => {
    setGetSubCategories(subcategories);
  }, [subcategories]);

  // useEffect(() => {
  //   setMappingCategories(categories);
  // }, [categories]);

  // useEffect(() => {
  //   setMappedSubCategories(subcategories);
  // }, [subcategories]);

  // const handleChange = (event) => {
  //   const categorykey = event.target.value;
  //   const selectedCategory = categories.find(category => category.categoryname === categorykey);
  //   if (selectedCategory) {
  //     dispatch(getSubCategoriesFromVendor(selectedCategory.categoryid));
  //     setMappedSubCategories(subcategories);
  //   }
  // };

  const handleClickChange = (val, status) => {
    setsubcategoryIdd(val);
    setUpdateStatus(status);
  };

  const handleEdit = () => {
    setOpen(true);
  };

  const handleClickEdit = (e) => {
    setsubcategoryvalue(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    setsubcategoryvalue("");
    setEditStatus("");
    setsubcategoryIdd("");
    setCategoryId("");
    setSelectedSubcategory(null);
  };

  const handleSave = async () => {
    const subdata = {
      subcategoryid: subcategoryIdd,
      subcategoryname: subcategoryvalue,
      subcategorystatus: editStatus,
      categoryKey: categorykeyid,
    };
    dispatch(updateSubCategoryById(subdata));
  };

  const handleClickDelete = () => {
    const deleteSubCategory = {
      id: subcategoryIdd,
      parentid:categorykeyid
    };
    dispatch(deleteSubCategoryById(deleteSubCategory));
    setsubcategoryvalue("");
    setEditStatus("");
    setsubcategoryIdd("");
    setCategoryId("");
  };

  const filteredMappingCategories = mappingCategories.map((item) => ({
    name: item.categoryname,
    parentId: item.categoryid,
  }));

  const {
    order,
    orderBy,
    selected,
    // rowsPerPage,
    filteredList,
    // handleChangePage,
    handleRequestSort
  } = useMuiTable({
    // listData: filteredCategories
  });

  const rowsLength = getSubCategories.length;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const requiredRows = getSubCategories.slice(indexOfFirstRow, indexOfLastRow);

  const handleChangePage = (event, page) => {
    console.log("cateor",page)
    setCurrentPage(page); // Pagination library often expects 0-based index
  };


  return (
    <Box py={4}>
      <H3 mb={2}>Sub Categories Products</H3>

      <SearchArea
        handleSearch={() => {}}
        buttonText="Add Sub Category"
        url="/admin/category-sub/create-sub"
        searchPlaceholder="Search Category..."
      />

      {/* <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>CATEGORY NAME</TableCell>
              <TableCell>SUBCATEGORY NAME</TableCell>
              <TableCell>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Grid item sm={6} xs={12}>
                  <TextField
                    select
                    fullWidth
                    color="info"
                    size="medium"
                    name="parent"
                    onChange={handleChange}
                    placeholder="Category"
                    SelectProps={{
                      multiple: false,
                    }}
                  >
                    {filteredMappingCategories.map((category) => (
                      <MenuItem key={category.parentId} value={category.name}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid item sm={6} xs={12}>
                  <TextField
                    select
                    fullWidth
                    color="info"
                    size="medium"
                    name="parent"
                    placeholder="Sub Category"
                    SelectProps={{
                      multiple: false,
                    }}
                  >
                    {mappedSubCategories.map((subcategory) => (
                      <MenuItem
                        key={subcategory.subcategoryid}
                        value={subcategory.subcategoryname}
                        onClick={() => {
                          handleClickChange(
                            subcategory.subcategoryid,
                            subcategory.status,
                            setsubcategoryIdd(subcategory.subcategoryid),
                            setsubcategoryvalue(subcategory.subcategoryname),
                            setCategoryId(subcategory.categoryid),
                            setCategoryName(subcategory.categoryname)
                          );
                        }}
                      >
                        {subcategory.subcategoryname}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </TableCell>
              <StyledTableCell>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleEdit}
                  >
                    <Edit />
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleClickDelete}
                  >
                    <Delete />
                  </Button>
                </Stack>
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Subcategory</DialogTitle>
        <DialogContent>
          {subcategoryvalue && (
            <Box>
              <TextField
                fullWidth
                margin="dense"
                label="Subcategory Name"
                value={subcategoryvalue}
                onChange={handleClickEdit}
              />
              <TextField
                fullWidth
                name="status"
                label="Status"
                color="info"
                size="medium"
                placeholder="Status"
                onChange={(e) => setEditStatus(e.target.value)}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog> */}

<Card>
        <Scrollbar>
          <TableContainer sx={{
          minWidth: 900
        }}>
            <Table>
            <TableHead>
            <TableRow>
              <TableCell>SUBCATEGORY NAME</TableCell>
              <TableCell>CATEGORY NAME</TableCell>
              <TableCell>ACTION</TableCell>
            </TableRow>
            </TableHead>

              <TableBody>
                {requiredRows.map(subcategory => <SubCategoryRow subcategoryid={subcategory.subcategoryid} subcategory={subcategory.subcategoryname} category={subcategory.categoryname} categoryid={subcategory.categoryid} selected={selected} status={subcategory.status} />)}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <Pagination
            rowsPerPageOptions={[]}
            component="div"
            count={Math.ceil(rowsLength / rowsPerPage)}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onChange={handleChangePage}
          />
        </Stack>

      </Card>
    </Box>
  );
};

export default SubCategoriesPageView;
