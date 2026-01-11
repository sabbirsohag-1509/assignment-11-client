import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../pages/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const RootLayout = () => {
  return (
    <>
      <nav className="sticky top-0 z-50">
        <Navbar></Navbar>
      </nav>
      <div className="max-w-7xl mx-auto px-3">
        <section>
          <Outlet></Outlet>
        </section>
        <footer>
          <Footer></Footer>
        </footer>
      </div>
    </>
  );
};

export default RootLayout;
