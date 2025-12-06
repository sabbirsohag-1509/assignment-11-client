import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../pages/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="max-w-7xl mx-auto px-3">
      <nav>
        <Navbar></Navbar>
      </nav>
      <section>
        <Outlet></Outlet>
      </section>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default RootLayout;
