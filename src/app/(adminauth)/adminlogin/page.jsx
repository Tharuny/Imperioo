
import React from 'react';
import { useSelector } from 'react-redux';
import { LoginPageView } from 'pages-sections/admin/page-view'; // Adjust the import path as needed
import { initialAdminLoginState } from 'app/store/adminRedux/adminLoginSlice'; // Adjust the import path as needed
import VendorDashboardLayout from 'components/layouts/vendor-dashboard';

// export { metadata }; // Export metadata if needed
const metadata = {
    title: "Login - Bazaar Next.js E-commerce Template",
    description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
    authors: [{
        name: "UI-LIB",
        url: "https://ui-lib.com"
    }],
    keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

// export const checkLoginStatus=async ()=>{
//     const [loggedIn, setLoggedIn] = useState(false); // Local state to manage login status
//     const isAdminAuthenticated = useSelector(state => state.admin.AdminAuth);

//     useEffect(() => {
//         // Update local loggedIn state when isAdminAuthenticated changes
//         setLoggedIn(isAdminAuthenticated);
//     }, [isAdminAuthenticated]);

//     return loggedIn;
// }

const Login = ({ children }) => {
    return <LoginPageView />;
};
export default Login;
