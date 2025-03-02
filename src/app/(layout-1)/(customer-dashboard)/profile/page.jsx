import { ProfilePageView } from "pages-sections/customer-dashboard/profile/page-view"; // API FUNCTIONS

import api from "utils/__api__/users";
export const metadata = {
  title: "Profile - Bazaar Next.js E-commerce Template",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{
    name: "UI-LIB",
    url: "https://ui-lib.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function Profile() {
  // const user = await api.getUser();
  return <ProfilePageView  />;
}