import React from "react";
import "./Navbar.css";
import logo from "../../adminassets/nav-logo.svg";
import navpro from "../../adminassets/nav-profile.svg";
function Navbar() {
  return (
    <div className="navbar">
      <img className="nav-logo" src={logo} alt="" />
      <img className="nav-profile" src={navpro} alt="" />
    </div>
  );
}

export default Navbar;
