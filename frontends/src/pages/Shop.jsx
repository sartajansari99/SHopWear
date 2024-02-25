import React from "react";
import Hero from "../component/hero/Hero";
import Poupular from "../component/Popular/Poupular";
import Offers from "../component/Offers/Offers";
import NewCollection from "../component/NewCollection/NewCollection";
import NewsLetter from "../component/NewsLetter/NewsLetter";
import '../pages/CSS/Shop.css'

function Shop() {
  return (
    <div className="shop">
      <Hero />
      <Poupular />
      <Offers />
      <NewCollection />
      <NewsLetter />
    </div>
  );
}

export default Shop;
