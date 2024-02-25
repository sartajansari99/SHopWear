import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import add_product from "../../adminassets/Product_Cart.svg";
import list_product from "../../adminassets/Product_list_icon.svg";
function Sidebar() {
  return (
    <div className="sidebar">
      <Link to={"/addproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={add_product} alt="" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to={"/listProduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={list_product} alt="" />
          <p>List Product</p>
        </div>
      </Link>
    </div>
  );
}

export default Sidebar;
