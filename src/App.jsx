import React, { useState } from 'react';
import { NavLink, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import {
  FaHome, FaCarrot, FaDrumstickBite, FaGlassWhiskey,
  FaShoppingCart, FaInfoCircle, FaEnvelope, FaClipboardList, FaUserPlus
} from 'react-icons/fa';
import { GiChocolateBar } from 'react-icons/gi';
import { FaBasketShopping } from 'react-icons/fa6';

import Home from './Home';
import Veg from './veg';
import NonVeg from './NonVeg';
import Chacolate from './Chacolate';
import Milk from './Milk';
import Signup from './SignUp';
import Cart from './Cart';
import Orders from './Orders';
import About from './About';
import Contact from './Contact';
import Login from './Login';

import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from './store';

function App() {
  const cartItems = useSelector((globalState) => globalState.cart);
  const cartCount = cartItems.reduce((sum, item) => sum + item.Quantity, 0);

  const currentUser = useSelector((state) => state.users.currentUser);
  const products = useSelector((state) => state.products); // ✅ All products
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  // ✅ Handle Search
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query) {
      setSearchResults([]);
      return;
    }

    // 🔍 Search across categories
    let results = [];
    Object.keys(products).forEach((category) => {
      products[category].forEach((item) => {
        if (item.name.toLowerCase().includes(query)) {
          results.push({ ...item, category });
        }
      });
    });

    setSearchResults(results);
  };

  // ✅ When user clicks result → go to category page with that product
  const handleResultClick = (product) => {
    setSearchQuery("");
    setSearchResults([]);

    navigate(`/${product.category.toLowerCase()}`, {
      state: { selectedProduct: product },   // ✅ pass product to category page
    });
  };

  return (
    <div>
      <header className="navbar">
        {/* ✅ Top Row: Store name + Search + Cart/Signup/Login */}
        <div className="top-bar">
          <div className="search-wrapper">
            <div className="store-name">
              <FaBasketShopping className="logo-icon" />
              <span>FreshNest</span>
            </div>

            <div className="search-box">
              <input
                type="text"
                placeholder="Search products..."
                className="search-input"
                value={searchQuery}
                onChange={handleSearchChange}
              />

              {/* 🔹 Search Dropdown */}
              {searchResults.length > 0 && (
                <div className="search-results">
                  {searchResults.map((item) => (
                    <div
                      key={item.id}
                      className="search-item"
                      onClick={() => handleResultClick(item)}
                    >
                      <img src={item.imageurl} alt={item.name} width="40" height="40" />
                      <span>{item.name} ({item.category})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="action-icons">
            <NavLink to="/cart" className="action-link">
              <FaShoppingCart className="action-icon" />
              <span>Cart ({cartCount})</span>
            </NavLink>

            {currentUser ? (
              <>
                <span className="welcome-text">Welcome, {currentUser.name} 🎉</span>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </>
            ) : (
              <>
                <NavLink to="/signup" className="action-link">
                  <FaUserPlus className="action-icon" />
                  <span>Signup</span>
                </NavLink>
                <NavLink to="/login" className="action-link">
                  Login
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* ✅ Bottom Row: Navigation Menu */}
        <nav className="nav-links">
          <NavLink to="/home"><FaHome /> Home</NavLink>
          <NavLink to="/veg"><FaCarrot /> Veg</NavLink>
          <NavLink to="/nonveg"><FaDrumstickBite /> NonVeg</NavLink>
          <NavLink to="/milk"><FaGlassWhiskey /> Milk</NavLink>
          <NavLink to="/chacolate"><GiChocolateBar /> Chocolate</NavLink>
          <NavLink to="/orders"><FaClipboardList /> Orders</NavLink>
          <NavLink to="/about"><FaInfoCircle /> About</NavLink>
          <NavLink to="/contact"><FaEnvelope /> Contact</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/veg" element={<Veg />} />
          <Route path="/nonveg" element={<NonVeg />} />
          <Route path="/milk" element={<Milk />} />
          <Route path="/chacolate" element={<Chacolate />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<h2 style={{ textAlign: 'center', marginTop: '50px' }}>404 - Page Not Found</h2>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
