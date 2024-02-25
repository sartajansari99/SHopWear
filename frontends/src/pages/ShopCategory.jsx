import React, { useContext } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../component/Context/ShopContext";
import Item from "../component/items/Item";
import dropdownicon from "../component/assets/dropdown_icon.png";
function ShopCategory(props) {
  const { all_product } = useContext(ShopContext);
  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>showing 1-12</span>Out of 36 Products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdownicon} alt="" />
        </div>
      </div>
      <div className="shopcategory-product">
        {all_product.map((item, i) => {
          if (props.category === item.category) {
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
          } else {
            return null;
          }
        })}
      </div>
      <div className="shopcatogery-lodmore">
        Explore more
      </div>
    </div>
  );
}

export default ShopCategory;
