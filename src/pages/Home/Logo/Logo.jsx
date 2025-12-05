import React from "react";
import { Link } from "react-router";
import logoImg from "../../../assets/logo.png";

const Logo = () => {
  return (
    <div>
      <Link to="/" className="btn btn-ghost normal-case text-xl">
        <img src={logoImg} alt="Logo" className="w-10" />
        <span className=" font-bold text-primary">ScholarStream</span>
      </Link>
    </div>
  );
};

export default Logo;
