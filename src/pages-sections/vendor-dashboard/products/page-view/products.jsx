"use client";
import { StyledIconButton } from "components/settings/styles";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useState,useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { H3 } from "components/Typography";
import Scrollbar from "components/scrollbar";
import { TableHeader, TablePagination } from "components/data-table"; // GLOBAL CUSTOM HOOK
import useMuiTable from "hooks/useMuiTable"; // Local CUSTOM COMPONENT
import ProductRow from "../product-row";
import SearchArea from "../../search-box"; // CUSTOM DATA MODEL
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import {useDispatch,useSelector} from "react-redux";
import { getProduct, getProductById } from "app/store/vendorProductRedux/productAction";
import { StyledTableCell } from "pages-sections/vendor-dashboard/styles";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useRouter } from "next/navigation";
import Pagination from "pages-sections/customer-dashboard/pagination";
import { deleteProductById, getProductFromVendor } from "app/store/vendorRedux/ProductRedux/productAction";
import { capital } from "app/store/capitalize/capitalizeText";
// =============================================================================
const ProductsPageView = (
) => {
  // const [productList, setProductList] = useState([...products]); // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
  const dispatch = useDispatch();
  const router=useRouter();
  const[productid,setProductId]=useState([])
  const[categoryy,setCategoryy]=useState("");
  const [open, setOpen] = useState(false);
  const[subcat,setSubCat]=useState("");
  const[price,setPrice]=useState("");
  const products = useSelector((state)=>state.vendorProduct.productList);
  const [currentPage,setCurrentPage] = useState(1);
  const productsPerPage = 8;
  useEffect(() => {
    dispatch(getProductFromVendor());
  },[]);

   const handelProduct =(e)=>{
    for(let i=0;i<products.length;i++)
      {
        if(products[i].productid==e.target.value) {
          setProductId(products[i].productid)
          setCategoryy(products[i].categoryname);
          setSubCat(products[i].subcategoryname);
          setPrice(products[i].currentprice);
          dispatch(getProductById(products[i].productid))
        }
        
      }
  }

  const handleEdit = () => {
   router.push(`/admin/products/edit`);
  };

  const handleClickDelete=()=>{
    dispatch(deleteProductById(productid))
  }

  const productsLength = products.length;
  const indexOfLastRow = currentPage * productsPerPage;
  const indexOfFirstRow = indexOfLastRow - productsPerPage;
  const requiredProducts = products.slice(indexOfFirstRow, indexOfLastRow);

  const handleChangePage = (event, page) => {
    setCurrentPage(page); // Pagination library often expects 0-based index
  };
  
  return <Box py={4}>
      <H3 mb={2}>Product List</H3>

      <SearchArea handleSearch={() => {}} buttonText="Add Product" url="/admin/products/create" searchPlaceholder="Search Product..." />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Sub Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* <TableRow>
              {/* Product Name */}
              {/* <TableCell>
                <Grid item sm={6} xs={12}>
                  <TextField
                    select
                    fullWidth
                    color="info"
                    size="medium"
                    name="parent"
                    onChange={handelProduct}
                    placeholder="Product Name"
                    SelectProps={{
                      multiple: false,
                    }}
                  >
                    {products.map((product) => (
                      <MenuItem key={product.productid} value={product.productid}>
                        {product.productname}
                      </MenuItem>
                    ))}
                    
                  </TextField>
                </Grid>
              </TableCell> */}
              {/* Category Name */}
              {/* <TableCell>
                
              {categoryy}
                
              </TableCell> */}
              {/* SubCategory Name */}
              {/* <TableCell>
                {subcat}
              </TableCell> */}
              {/* Printing price of product */}
              {/* <TableCell>
                {price}
              </TableCell>
              <TableCell >
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
       
      </TableCell>
            </TableRow> */}
                {requiredProducts.map(product => <ProductRow productid={product.productid} name={product.productname} category={product.categoryname} categoryid={product.categoryid} subcategory={product.subcategoryname} subcategoryid={product.subcategoryid} price={product.currentprice}  slug={product.productid} status={product.status} />)}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination 
        count={Math.ceil(productsLength/productsPerPage)} 
        onChange={handleChangePage} 
        page={currentPage} />

    </Box>;
};

export default ProductsPageView;