import React, { useContext } from "react";
import { ShopContext } from "../component/Context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrum from "../component/Breadcrums/Breadcrum";
import ProductDisplay from "../component/ProductDisplay/ProductDisplay";
import DescriptionBox from "../component/Description/DescriptionBox";
import RelatedProducts from "../component/RelatedProducts/RelatedProducts";
import './CSS/product.css'

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === Number(productId));
  return (
    <div className="product">
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
};

export default Product;
