import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";
import cart from "../assets/cart_icon.png";
import cart1 from "../assets/cart_icon.png";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

function Navbar() {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  return (
    <div className="navbarouter">
      <div className="navbar">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="logo">
            <img src={logo} alt="" />
            <p>SHopWear</p>
          </div>
        </Link>

        <div className="navli">
          <li
            onClick={() => {
              setMenu("shop");
            }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              Shop
            </Link>{" "}
            {menu === "shop" ? <hr></hr> : ""}
          </li>
          <li
            onClick={() => {
              setMenu("men");
            }}
          >
            <Link to="/men" style={{ textDecoration: "none", color: "black" }}>
              Men
            </Link>
            {menu === "men" ? <hr></hr> : ""}
          </li>
          <li
            onClick={() => {
              setMenu("women");
            }}
          >
            <Link
              to="/women"
              style={{ textDecoration: "none", color: "black" }}
            >
              Women
            </Link>
            {menu === "women" ? <hr></hr> : ""}
          </li>
          <li
            onClick={() => {
              setMenu("kids");
            }}
          >
            <Link to="/kids" style={{ textDecoration: "none", color: "black" }}>
              Kids
            </Link>
            {menu === "kids" ? <hr></hr> : ""}
          </li>
        </div>
        <div className="loginSignup">
          {localStorage.getItem("auth-token") ? (
            <button
              onClick={() => {
                localStorage.removeItem("auth-token");
                window.location.replace("/");
              }}
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button>Login</button>
            </Link>
          )}

          <Link to="/cart">
            <img src={cart} alt="" />
          </Link>
          <div className="cartcount">
            <img className="menubar" src={cart1} alt="" />
            <span>{getTotalCartItems()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
