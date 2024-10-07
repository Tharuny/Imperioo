"use client";

import { useState, useEffect, Fragment } from "react";
import Place from "@mui/icons-material/Place"; // Local CUSTOM COMPONENT
import Pagination from "../../pagination";
import AddressListItem from "../address-item";
import DashboardHeader from "../../dashboard-header"; // CUSTOM DATA MODEL
import { useDispatch, useSelector } from "react-redux";
import { getAddress } from "app/store/AddressRedux/addressAction";
import { Grid } from "@mui/material";

// =======================================================
export default function AddressPageView() {
  const [allAddress, setAllAddress] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // You can adjust this as needed

  const maindata = useSelector(state => state.address.addressDetails);
  const dispatch = useDispatch();
  const userValid = useSelector(state => state.user.loginVerified);
  const userid = useSelector(state => state.user.userid);

  useEffect(() => {
    const id = { id: userid };
    dispatch(getAddress(id));
  }, [dispatch, userid]);

  useEffect(() => {
    setAllAddress(maindata);
    console.log(allAddress)
  }, [maindata]);

  const onChangePage = (event, page) => {
    setCurrentPage(page);
  };

  const indexOfLastAddress = currentPage * itemsPerPage;
  const indexOfFirstAddress = indexOfLastAddress - itemsPerPage;
  const currentAddresses = allAddress.slice(indexOfFirstAddress, indexOfLastAddress);

  return (
    <Fragment>
      {
        /* TITLE HEADER AREA */
      }
      <DashboardHeader 
        Icon={Place} 
        href="/address/New-address" 
        title="My Addresses" 
        buttonText="Add New Address" 
      />

      {
        /* ALL ADDRESS LIST AREA */
      }
      <Grid container spacing={2}>
        {currentAddresses.map(address => (
          <AddressListItem
            key={address.id}
            address={address}
          />
        ))}
      </Grid>
         
      {
        /* PAGINATION AREA */
      }
      <Pagination 
        count={Math.ceil(allAddress.length / itemsPerPage)} 
        page={currentPage} 
        onChange={onChangePage} 
      />
    </Fragment>
  );
}
