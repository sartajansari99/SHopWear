import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./CartItems.css";
import cross_icon from "../assets/cart_cross_icon.png";
import { ShopContext } from "../Context/ShopContext";
function CartItems() {
  const {
    getTotalAmount,
    getTotalDisAmount,
    getTotalCartAmount,
    all_product,
    cartItem,
    removeFromCart,
  } = useContext(ShopContext);
  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>total</p>
        <p>Remove</p>
      </div>
      <hr />

      {all_product.map((e) => {
        if (cartItem[e.id] > 0) {
          return (
            <div>
              <div className="cartitems-format cartitems-format-main">
                <img className="productimg" src={e.image} alt="" />
                <p>{e.name}</p>
                <p>{e.new_price}</p>
                <button className="cartitems-quantity">{cartItem[e.id]}</button>
                <p>{e.new_price * cartItem[e.id]}</p>
                <img
                  className="cartitems-remove-icon"
                  src={cross_icon}
                  onClick={() => {
                    removeFromCart(e.id);
                  }}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="checkoutoption">
        <div className="contentoptions">
          <h1>PRICE DETAILS</h1>
          <hr />
          <div className="tablecontent">
            <p>Price({cartItem.length})</p>
            <p>{getTotalCartAmount()}</p>
          </div>
          <div className="tablecontent">
            <p>Discount</p>
            <p>{getTotalDisAmount()}</p>
          </div>
          <div className="tablecontent">
            <p>Secured Packaging Fee</p>
            <p>99</p>
          </div>
          <div className="tablecontent">
            <p>Delivery Charges</p>
            <p>50</p>
          </div>
          <hr />
          <div className="tablecontent">
            <h3>Total Amount</h3>
            <p>{getTotalAmount()}</p>
          </div>
        </div>
        <Link to="/checkout" style={{ textDecoration: "none" }}>
          <button>CHECKOUT</button>
        </Link>
      </div>
    </div>
  );
}

export default CartItems;
