// import { CreateBrandPageView } from "pages-sections/vendor-dashboard/brands/page-view";
import { CreateColorsPageView } from "pages-sections/vendor-dashboard/colors/page-view";

export const metadata = {
  title: "Color Create - Bazaar Next.js E-commerce Template",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{
    name: "UI-LIB",
    url: "https://ui-lib.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default function ColorCreate() {
  return <CreateColorsPageView />;
}