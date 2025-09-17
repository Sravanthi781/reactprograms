import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from "./store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NonVeg() {
  let nonVegProducts = useSelector((globalState) => globalState.products.NonVeg);
  let dispatch = useDispatch();

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // ✅ Slice products for current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = nonVegProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // ✅ Total Pages
  const totalPages = Math.ceil(nonVegProducts.length / productsPerPage);

  // ✅ Offers List for Non-Veg
  const offers = [
    {
      message: "🍗 Buy 1 Get 1 Free on Chicken!",
      image: "https://img.icons8.com/color/48/chicken.png",
      endDate: "2025-09-30"
    },
    {
      message: "🥩 20% Off on Mutton!",
      image: "https://img.icons8.com/color/48/mutton.png",
      endDate: "2025-09-28"
    },
    {
      message: "🐟 Special Discount on Fish!",
      image: "https://img.icons8.com/color/48/fish.png",
      endDate: "2025-09-25"
    }
  ];

  return (
    <div className="nonveg-page mt-4 position-relative">

      {/* 🔹 Festival Offer Banner */}
      <div className="festival-banner d-flex justify-content-between align-items-center mb-4 p-2 rounded position-relative" style={{ backgroundColor: "#ff5722" }}>
        
        {/* 🔹 Scrolling Messages */}
        <div className="offer-marquee flex-grow-1 overflow-hidden">
          <div className="marquee-content d-flex align-items-center">
            {offers.map((offer, index) => (
              <div key={index} className="d-flex align-items-center me-5">
                <img src={offer.image} alt="offer" style={{ width: "30px", height: "30px", marginRight: "6px" }} />
                <span style={{ color: "#fff", fontWeight: "bold" }}>
                  {offer.message} (Ends on: {offer.endDate})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 🔹 Small Square Box at Top Right */}
        <div className="offer-box text-center ms-3">
          🎉 Offers
        </div>
      </div>

      <h2 className="text-center mb-4">🥩 Enjoy the Best Non-Veg Dishes for Food Lovers</h2>

      {/* 🔹 Scrolling Images */}
      <div className="scroll-carousel mb-5 p-4 rounded">
        <div className="scroll-track">
          {nonVegProducts.map((product) => (
            <div key={product.id} className="scroll-item text-center">
              <img src={product.imageurl} alt={product.name} className="scroll-img" />
              <h5 className="mt-2">{product.name}</h5>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Product Cards */}
      <div className="row">
        {currentProducts.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100 w-100 shadow-sm">
              <img
                src={product.imageurl}
                alt={product.name}
                height="200px"
                className="card-img-top"
              />
              <div className="card-body text-center">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Price: ₹{product.price}</p>
                <button
                  className="btn-add-to-cart"
                  onClick={() => {
                    dispatch(addToCart(product));
                    toast.success(`${product.name} added to cart!`);
                  }}
                >
                  🛒 Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Modern Numbered Pagination */}
      <div className="pagination-bar d-flex justify-content-center align-items-center mt-4 flex-wrap">
        <button
          className="pagination-btn me-2"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          ⬅️ Prev
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const pageNum = index + 1;
          return (
            <button
              key={pageNum}
              className={`pagination-btn mx-1 ${currentPage === pageNum ? "active-page" : ""}`}
              onClick={() => setCurrentPage(pageNum)}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          className="pagination-btn ms-2"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next ➡️
        </button>
      </div>

      {/* ✅ Toast Container */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default NonVeg;
