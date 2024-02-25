import React, { useState, useEffect } from "react";
import "./Popular.css";
// import data_product from "../assets/data";
import Item from "../items/Item";

function Poupular() {
  const [data_products, setDataProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/popularinwomen")
      .then((response) => response.json())
      .then((data) => setDataProducts(data));
  }, []);
  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {data_products.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Poupular;
