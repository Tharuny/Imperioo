
import { getProductInWishlist } from "app/store/wishlistRedux/wishlistActions";
import { WishListPageView } from "pages-sections/customer-dashboard/wish-list"; // API FUNCTIONS
const metadata = {
  title: "Wish List - Bazaar Next.js E-commerce Template",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [
    {
      name: "UI-LIB",
      url: "https://ui-lib.com",
    },
  ],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};
export default async function WishList({ searchParams }) {
  // const { products, totalProducts } = await getWishListProducts(
  //   searchParams.page
  // );
  return <WishListPageView />;
}
