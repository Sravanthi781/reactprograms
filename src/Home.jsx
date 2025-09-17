// src/Home.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const carouselItems = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Fresh Vegetables",
    description: "Get the best quality organic veggies delivered fresh.",
    link: "/veg",
  },
  {
    id: 2,
    image: "https://wallpapercave.com/wp/wp8329822.jpg",
    title: "Delicious Non-Veg",
    description: "Premium meat & seafood for your perfect meal.",
    link: "/nonveg",
  },
  {
    id: 3,
    image:
      "https://wallpapers.com/images/hd/milk-background-nn4uqvyma4v02ltr.jpg",
    title: "Milk products",
    description:
      "Fresh, natural, and full of essential nutrients like calcium and protein.",
    link: "/milk",
  },
  {
    id: 4,
    image:
      "https://i5.walmartimages.com/asr/2cd4ecfe-451c-4072-a07f-ee8331656e20_1.e08dbdbea98e0947a7c19910eff4dcdd.jpeg",
    title: "Chocolate Products",
    description:
      "✨ Chocolate is a universal delight, available in endless varieties to suit every taste.",
    link: "/chocolates",
  },
];

const stats = [
  { id: 1, label: "Happy Customers", value: "5000+" },
  { id: 2, label: "Products", value: "200+" },
  { id: 3, label: "24/7 Delivery", value: "Yes" },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAvatar, setShowAvatar] = useState(true);
  const navigate = useNavigate();

  // Auto carousel (3s)
  useEffect(() => {
    if (carouselItems.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % carouselItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Avatar screen for 4s, then show homepage
  useEffect(() => {
    const timer = setTimeout(() => setShowAvatar(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  // 👉 If avatar is visible, only show avatar
  // 👉 If avatar is visible, only show avatar
if (showAvatar) {
  return (
    <div className="welcome-avatar">
      <div className="avatar-wrapper">
        <video
          src="/videos/hi.mp4"   // <-- Your avatar video path
          autoPlay
          loop
          muted
          playsInline
          className="avatar-video"
        />
        <div className="speech-bubble">👋 Hi, Welcome To Home Page!</div>
      </div>
    </div>
  );
}


  // 👉 Main Home page
  return (
    <div className="home-container">
      {/* 🔹 Video Scroll Section (Top) */}
      <section className="video-scroll">
        <div className="video-card" onClick={() => navigate("/veg")}>
          <video src="/videos/veg.mp4" autoPlay loop muted playsInline />
          <h3>Vegetables</h3>
        </div>

        <div className="video-card" onClick={() => navigate("/nonveg")}>
          <video src="/videos/chiken.mp4" autoPlay loop muted playsInline />
          <h3>Non-Veg</h3>
        </div>

        <div className="video-card" onClick={() => navigate("/milk")}>
          <video src="/videos/milk.mp4" autoPlay loop muted playsInline />
          <h3>Milk</h3>
        </div>

        <div className="video-card" onClick={() => navigate("/chocolates")}>
          <video src="/videos/chocolate.mp4" autoPlay loop muted playsInline />
          <h3>Chocolates</h3>
        </div>
      </section>

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>Welcome to FreshNest 🍴</h1>
          <p>
            Your one-stop destination for delicious food, snacks and desserts.
            Order online and get your favorites delivered right to your door 🚀
          </p>
          <div className="hero-actions">
            <button
              className="explore-btn"
              onClick={() => {
                const section = document.querySelector(".products-section");
                if (section) section.scrollIntoView({ behavior: "smooth" });
                else navigate("/veg");
              }}
            >
              Explore Menu
            </button>
            <button
              className="secondary-btn"
              onClick={() => navigate("/contact")}
            >
              Contact Us
            </button>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://media.istockphoto.com/id/1220959686/photo/indian-delivery-man-in-red-uniform-stock-photo.jpg?s=612x612&w=0&k=20&c=tUXryX0_uiJRAQtmx9sxpb2qVjV6hlF8Th3DJQb2GnE="
            alt="Food banner"
          />
        </div>
      </section>

      {/* Carousel (with safety check) */}
      {carouselItems.length > 0 && (
        <section className="carousel-section">
          <div className="carousel-card">
            <img
              src={carouselItems[currentIndex].image}
              alt={carouselItems[currentIndex].title}
              className="carousel-image"
            />
            <div className="carousel-content">
              <h2>{carouselItems[currentIndex].title}</h2>
              <p>{carouselItems[currentIndex].description}</p>
              <div className="carousel-actions">
                <button
                  className="shop-now-btn"
                  onClick={() => navigate(carouselItems[currentIndex].link)}
                >
                  Shop Now
                </button>

                <div className="dots">
                  {carouselItems.map((_, i) => (
                    <button
                      key={i}
                      className={`dot ${i === currentIndex ? "active" : ""}`}
                      onClick={() => setCurrentIndex(i)}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="stats-section">
        {stats.map((s) => (
          <div key={s.id} className="stat-box">
            <h3>{s.value}</h3>
            <p>{s.label}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h2>FreshNest</h2>
            <p>Delicious food delivered fresh to your door.</p>
            <div className="newsletter">
              <input type="email" placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li onClick={() => navigate("/")}>Home</li>
              <li onClick={() => navigate("/veg")}>Veg Items</li>
              <li onClick={() => navigate("/nonveg")}>Non-Veg</li>
              <li onClick={() => navigate("/milk")}>Milk</li>
              <li onClick={() => navigate("/chocolates")}>Chocolates</li>
            </ul>
          </div>

          <div className="footer-support">
            <h4>Customer Service</h4>
            <ul>
              <li onClick={() => navigate("/contact")}>Contact Us</li>
              <li onClick={() => navigate("/faq")}>FAQ</li>
              <li onClick={() => navigate("/privacy")}>Privacy Policy</li>
            </ul>
          </div>

          <div className="footer-social">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="#" aria-label="facebook">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="instagram">
                <FaInstagram />
              </a>
              <a href="#" aria-label="twitter">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} FreshNest. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
