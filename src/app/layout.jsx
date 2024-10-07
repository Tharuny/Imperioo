'use client'
import { Open_Sans } from "next/font/google";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ThemeProvider from "theme/theme-provider"; // THEME PROVIDER
import CartProvider from "contexts/CartContext"; // PRODUCT CART PROVIDER
import SettingsProvider from "contexts/SettingContext"; // SITE SETTINGS PROVIDER
import RTL from "components/rtl"; // GLOBAL CUSTOM COMPONENTS
import ProgressBar from "components/progress"; // GLOBAL CUSTOM COMPONENTS
import "i18n"; // IMPORT i18n SUPPORT FILE

import { Person2Rounded } from "@mui/icons-material"; // Icon component
import { persistor } from "./store/store";
import store from "./store/store";
import Header from "components/header/header";
import Sticky from "components/sticky/Sticky";
import { useCallback, useState } from "react";
import SearchInput from "components/SearchInput";
import { MobileNavigationBar } from "components/mobile-navigation";
import MobileNavigationBar2 from "components/mobile-navigation/mobile-navigation-bar-2";
export const openSans = Open_Sans({
  subsets: ["latin"]
});

export default function RootLayout({ children }) {

  return (
    <html lang="en" suppressHydrationWarning>
      <Provider store={store}>
      {/* <PersistGate loading={<div>Loading...</div>} persistor={persistor}> */}
          <body className={openSans.className}>
            <CartProvider>
              <SettingsProvider>
                <ThemeProvider>
                  <ProgressBar />
                  <RTL>{children}</RTL>
                  <MobileNavigationBar/>
                </ThemeProvider>
              </SettingsProvider>
            </CartProvider>
          </body>
        {/* </PersistGate> */}
      </Provider>
    </html>
  );
}
