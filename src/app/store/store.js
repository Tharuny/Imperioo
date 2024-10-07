import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userRegisterSlice from './userRedux/userRegisterSlice';
import adminLoginAuthSlice from './adminRedux/adminLoginSlice';
import invoiceSlice from './invoiceRedux/invoiceSlice';
import categorySlice from './categoryRedux/categorySlice';
import colorSlice from "./colorRedux/colorSlice";
import wishlistSlice from './wishlistRedux/wishlistSlice';
import addressSlice from './AddressRedux/addressSlice';
import { size } from 'lodash';
import sizeSlice from './sizeRedux/sizeSlice';
import subcategorySlice from './subcategoryRedux/subcategorySlice';
import productSlice from './vendorProductRedux/productSlice';
import reviewSlice from './reviewRedux/reviewSlice';
import ratingSlice from './ratingRedux/ratingSlice';
import productBySubCategorySlice  from './ProductsRedux/productslice';
import cartSlice from './cartRedux/cartSlice';
import searchProductSlice from './SearchProductRedux/searchProductSlice';
import vendorCategorySlice from './vendorRedux/CategoryRedux/categorySlice';
import vendorSubCategorySlice from './vendorRedux/SubCategroyRedux/subCategorySlice';
import vendorProductSlice from './vendorRedux/ProductRedux/productSlice'
import UserCartSlice from './UserCartRedux/UserCartSlice';
import resetPasswordSlice from './resetPasswordRedux/resetPasswordSlice';
import placeorderSlice from './placeorderRedux/placeorderSlice';
import vendorOrdersSlice from './vendorRedux/orderRedux/orderSlice';
import vendorCustomerSlice from './vendorRedux/customersRedux/customerSlice';
// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Combine reducers
const rootReducer = combineReducers({
  user: userRegisterSlice,
  admin: adminLoginAuthSlice,
  invoice: invoiceSlice,
  category:categorySlice,
  subcategory:subcategorySlice,
  color:colorSlice,
  review:reviewSlice,
  wishlist: wishlistSlice,
  address : addressSlice,
  size : sizeSlice,
  product: productSlice,
  rating:ratingSlice,
  productBySubCategory:productBySubCategorySlice,
  cart:cartSlice,
  placeorder:placeorderSlice,
  resetPassword:resetPasswordSlice,
  search:searchProductSlice,
  vendorCategory:vendorCategorySlice,
  vendorOrders:vendorOrdersSlice,
  vendorSideCustomers:vendorCustomerSlice,
  vendorSubCategory:vendorSubCategorySlice,
  vendorProduct:vendorProductSlice,
  cartModified:UserCartSlice
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck:false,
    }),
});

export const persistor = persistStore(store); 
export default store;
