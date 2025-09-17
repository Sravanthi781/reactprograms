// src/ProductDetails.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ProductDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  if (!product) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>❌ Product not found</h2>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{product.name}</h2>
      <img src={product.imageurl} alt={product.name} width="200" />
      <p>Price: ₹{product.price}</p>
      <p>Category: {product.category}</p>
      <button onClick={() => navigate(-1)}>⬅ Back</button>
    </div>
  );
}

export default ProductDetails;
