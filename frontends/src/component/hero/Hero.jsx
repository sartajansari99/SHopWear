import React from "react";
import hero from "../assets/product_1.png";
import "./Hero.css";
function Hero() {
  return (
    <div className="hero">
      <div className="content-left">
        {" "}
        <div className="head-content">
          <h1>
            <span className="thin">Are You Ready To</span>
            <br />
            <span className="bold"> Lead The Way</span>
          </h1>
          <div className="text-content">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias
              obcaecati aliquid laborum maxime deleniti maiores eaque labore,
              architecto velit atque saepe? Minima quam maxime est assumenda
              facilis doloribus ducimus accusamus?
            </p>
          </div>
        </div>
        <div className="btn">
          <div className="button">
            Buy Now
          </div>
        </div>
      </div>
      <div className="content-right">
        <div className="herologo">
          <img src={hero} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
