import React, { createContext, useEffect, useState } from "react";
// import all_product from "../assets/all_product";
export const ShopContext = createContext("null");

const getdefaultCart = () => {
  let cart = {};
  for (let item = 0; item < 300 + 1; item++) {
    cart[item] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_product] = useState([]);
  const [cartItem, setCartItem] = useState(getdefaultCart());

  useEffect(() => {
    fetch("http://localhost:4000/allproducts")
      .then((response) => response.json())
      .then((data) => setAll_product(data));

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/getcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: "",
      })
        .then((response) => response.json())
        .then((data) => setCartItem(data));
    }
  }, []);
  const addToCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    } else {
      window.location.href = "/login";
    }
  };

  const removeFromCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const sa in cartItem) {
      if (cartItem[sa] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(sa));
        totalAmount += itemInfo.new_price * cartItem[sa];
      }
    }
    return totalAmount;
  };

  const getTotalDisAmount = () => {
    let totalDisAmount = 0;
    for (const sa in cartItem) {
      if (cartItem[sa] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(sa));
        totalDisAmount += itemInfo.old_price * cartItem[sa];
      }
    }
    return totalDisAmount;
  };

  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const sa in cartItem) {
      if (cartItem[sa] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(sa));
        totalAmount += itemInfo.new_price + 99 + 50 * cartItem[sa];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        totalItem += cartItem[item];
      }
    }
    return totalItem;
  };

  
  const contextValue = {
    getTotalAmount,
    getTotalDisAmount,
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItem,
    addToCart,
    removeFromCart,
  };

 
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );

  
};
export default ShopContextProvider;
