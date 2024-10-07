"use client";

import { Fragment } from "react";
import Person from "@mui/icons-material/Person"; // Local CUSTOM COMPONENT

import UserInfo from "../user-info";
import UserAnalytics from "../user-analytics";
import DashboardHeader from "../../dashboard-header"; // CUSTOM DATA MODEL
import { useState, useEffect,} from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
// ============================================================
export default function ProfilePageView() {
  const userauth=useSelector((state)=>state.user.loginVerified)
  const username=useSelector((state)=>state.user.username);
  const usermail=useSelector((state)=>state.user.usermail);
  const userphn=useSelector((state)=>state.user.userPhoneNumber);
  const router=useRouter();
  useEffect(()=>{
    if(!userauth)
    {
      router.push("/")
    }
  },[userauth])
  
  const user={
    userfullname:username,
    useremail:usermail,
    userphone:userphn
  }
  // const [userProfile, setUserProfile] = useState({});
  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     try {
  //       const response = await fetch("/api/users", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (response.ok) {
  //         const userData = await response.json(); // Parse JSON response
  //         setUserProfile(userData); // Update userProfile state with parsed data
  //        
  //       } else {
  //         const result = await response.json();
  //         alert(`Error: ${result.error}`);
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //       alert(`Unexpected error: ${error}`);
  //     }
  //   };

  //   fetchUserProfile(); // Call the async function immediately
  // }, []);
  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader
        Icon={Person}
        title="My Profile"
        buttonText="Edit Profile"
        href={`/profile/${user.id}`}
      />

      {/* USER PROFILE INFO */}
      <UserAnalytics user={user} />

      {/* USER PROFILE INFO */}
      {/* <UserInfo user={{userProfile}} /> */}
    </Fragment>
  );
}
