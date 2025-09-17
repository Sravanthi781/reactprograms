import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("📨 Message sent successfully!", {
      position: "top-center",
      autoClose: 3000,
    });
    e.target.reset();
  };

  return (
    <div className="contact-page-full">
      {/* Header */}
      <header className="contact-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Reach out for support, feedback, or collaboration.</p>
      </header>

      {/* Body */}
      <main className="contact-body">
        <div className="contact-wrapper">
          {/* Left Panel: Image & Info */}
          <div className="contact-left">
            <img
              src="https://t3.ftcdn.net/jpg/05/89/92/50/360_F_589925063_ecQvtkwNAEnB7Nd9ad3hM7GOP0lae694.jpg"
              alt="Contact"
              className="contact-banner"
            />
            <div className="contact-info">
              <h2>📍 Visit Us</h2>
              <p>Ameerpet, Hyderabad, Telangana</p>

              <h2>📧 Email</h2>
              <p>sravanthichalla006@gmail.com</p>

              <h2>📱 Call</h2>
              <p>+91 95735 08228</p>

              <h2>🕒 Hours</h2>
              <p>Mon–Sat: 9am to 6pm</p>
            </div>
          </div>

          {/* Right Panel: Form */}
          <div className="contact-right">
            <h2>💬 Send Us a Message</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Your Message" rows="6" required />
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="contact-footer">
        <p>&copy; {new Date().getFullYear()} FreshNest. All rights reserved.</p>
        <p>Contact us: support@freshnest.com | +91 95735 08228</p>
      </footer>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default Contact;
