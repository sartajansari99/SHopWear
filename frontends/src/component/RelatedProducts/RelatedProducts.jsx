import React, { useEffect, useState } from "react";
import "./RelatedProduct.css";
// import data_product from "../assets/data";
import Item from "../items/Item";
function RelatedProducts() {
  const [data_products, setDataProducts] = useState([]);

  useEffect(() => {
    fetch("https://shopwear.onrender.com/popularinwomen")
      .then((response) => response.json())
      .then((data) => setDataProducts(data));
  }, []);
  return (
    <div className="relatedproducts">
      <h1>Related Product</h1>
      <hr />
      <div className="relatedproduct">
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

export default RelatedProducts;
