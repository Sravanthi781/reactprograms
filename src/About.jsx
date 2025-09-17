import React from "react";
import { FaLeaf, FaTruck, FaSmile } from "react-icons/fa";
import "./App.css";

function About() {
  return (
    <div className="about-page-modern">
      {/* Hero Header */}
      <header className="hero-header">
        <div className="hero-overlay">
          <h1>Welcome to FreshNest</h1>
          <p>Freshness delivered to your doorstep 🌱</p>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-cards">
          <div className="feature-card">
            <FaLeaf className="feature-icon" />
            <h3>Fresh Products</h3>
            <p>We deliver fresh vegetables, fruits, dairy, chocolates, and more, every day.</p>
          </div>
          <div className="feature-card">
            <FaTruck className="feature-icon" />
            <h3>Fast Delivery</h3>
            <p>Quick and safe delivery straight to your doorstep with minimal delay.</p>
          </div>
          <div className="feature-card">
            <FaSmile className="feature-icon" />
            <h3>Customer Satisfaction</h3>
            <p>We prioritize our customers and ensure the best quality service and products.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-cards">
          <div className="team-card">
            <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Team Member" />
            <h3>Priya Sharma</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-card">
            <img src="https://randomuser.me/api/portraits/men/72.jpg" alt="Team Member" />
            <h3>Rahul Verma</h3>
            <p>Operations Manager</p>
          </div>
          <div className="team-card">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Team Member" />
            <h3>Anjali Singh</h3>
            <p>Customer Support</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="about-footer-modern">
        <p>&copy; {new Date().getFullYear()} FreshNest. All rights reserved.</p>
        <p>Contact: support@freshnest.com | +91 95735 08228</p>
      </footer>
    </div>
  );
}

export default About;
