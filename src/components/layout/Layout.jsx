import React from "react";
import { AppNav } from "./Navbar/navbar";
import { Outlet } from "react-router";
import { AppFooter } from "./Footer/footer";

const Layout = () => {
  return (
    <div className="dark:bg-gray-900 dark:text-gray-100 ">
      <AppNav />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
};

export default Layout;
