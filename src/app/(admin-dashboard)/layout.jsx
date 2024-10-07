'use client'
import React, { useEffect, useState } from 'react';
import Login from 'app/(adminauth)/adminlogin/page'; // Adjust import path as needed
import VendorDashboardLayout from 'components/layouts/vendor-dashboard';
import { useSelector } from 'react-redux';

const Layout = ({ children }) => {
  const isAdminAuthenticated = useSelector((state) => state.admin.AdminAuth);
  const [isLoggedIn, setLoggedIn] = useState(isAdminAuthenticated);

  useEffect(() => {
    // Update local loggedIn state when isAdminAuthenticated changes
    setLoggedIn(isAdminAuthenticated);
  }, [isAdminAuthenticated]);

  if (!isLoggedIn) {
    return <Login />;
  }

  return <VendorDashboardLayout>{children}</VendorDashboardLayout>;
};

export default Layout;
