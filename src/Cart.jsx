// src/Cart.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
  addOrder,
} from "./store";
import { calculateDiscount, getCouponDiscount } from "./discountUtil";
import Confetti from "react-confetti";
import emailjs from "@emailjs/browser";
import "./App.css";
import Swal from "sweetalert2";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || item.Quantity || 1),
    0
  );

  const [couponCode, setCouponCode] = useState("");
  const [couponResult, setCouponResult] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleApplyCoupon = () => {
    const result = getCouponDiscount(couponCode, totalAmount);
    if (result.isValid) {
      setCouponResult(result);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    } else {
      setCouponResult(null);
    }
  };

  const resetCoupon = () => {
    setCouponCode("");
    setCouponResult(null);
  };

  const [discountPercent, setDiscountPercent] = useState(0);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const { discount: directDiscount } = calculateDiscount(totalAmount, discountPercent);

  const applyDiscount = (percent) => {
    setDiscountPercent(percent);
    setIsDiscountApplied(true);
  };

  const resetDiscount = () => {
    setDiscountPercent(0);
    setIsDiscountApplied(false);
  };

  const taxPercent = 3;
  const shipping = 5;

  const couponDiscount = couponResult ? couponResult.discountAmount : 0;
  const totalDiscount = couponDiscount + (isDiscountApplied ? directDiscount : 0);
  const finalAmount = totalAmount - totalDiscount;
  const taxAmount = (finalAmount * taxPercent) / 100;
  const finalPayable = finalAmount + taxAmount + shipping;

  useEffect(() => {
    if (couponResult) {
      const result = getCouponDiscount(couponCode, totalAmount);
      setCouponResult(result.isValid ? result : null);
    }
  }, [totalAmount]);

  const [customerEmail, setCustomerEmail] = useState("");
  const orderID = "ORDER" + Math.floor(Math.random() * 10000);

  const templateParams = {
    order_id: orderID,
    date: new Date().toLocaleString(),
    orders: cartItems.map((item) => {
      const quantity = item.quantity || item.Quantity || 1;
      return {
        name: item.name,
        price: (item.price * quantity).toFixed(2),
        units: quantity,
        image_url: item.imageurl,
      };
    }),
    cost: {
      shipping: shipping,
      tax: taxAmount.toFixed(2),
      totalprice: totalAmount.toFixed(2),
      coupon: couponDiscount.toFixed(2),
      discount: isDiscountApplied ? directDiscount.toFixed(2) : "0.00",
      total: finalPayable.toFixed(2),
    },
    email: customerEmail,
  };

  const handleSendEmail = () => {
    if (!customerEmail) {
      alert("Please enter your email address.");
      return;
    }

    emailjs
      .send(
        "service_4axcruh",
        "template_2o7csgp",
        templateParams,
        "QY9ph9koHJq6G5sn1"
      )
      .then(() => {
        alert("✅ Email sent successfully!");
      })
      .catch((error) => {
        alert("❌ Email sending failed: " + error);
      });
  };

  const handleCompletePurchase = () => {
    const orderData = {
      id: orderID,
      date: new Date().toLocaleString(),
      items: cartItems,
      total: finalPayable,
    };

    if (currentUser) {
      dispatch(addOrder(orderData));
      dispatch(clearCart());
      Swal.fire("✅ Order Placed!", "Your order has been placed successfully.", "success");
      navigate("/orders");
    } else {
      localStorage.setItem(
        "pendingOrder",
        JSON.stringify({
          cartItems,
          templateParams,
          finalPayable,
        })
      );
      Swal.fire("⚠️ Please Signup/Login", "You must login to complete your purchase.", "info");
      navigate("/signup");
    }
  };

  // -------------------- Payment Method State --------------------
  const [paymentMethod, setPaymentMethod] = useState(null);

  // Credit Card states
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // -------------------- NEW: UPI Timer --------------------
  const [upiTimer, setUpiTimer] = useState(0);

  useEffect(() => {
    let timer;
    if (paymentMethod === "upi" && upiTimer > 0) {
      timer = setInterval(() => {
        setUpiTimer((prev) => prev - 1);
      }, 1000);
    }
    if (upiTimer === 0 && paymentMethod === "upi") {
      setPaymentMethod(null); // hide QR when time runs out
    }
    return () => clearInterval(timer);
  }, [upiTimer, paymentMethod]);

  return (
    <div>
      {showConfetti && <Confetti />}
      <h2>🥳 Items Added! Continue Shopping or Proceed to Payment</h2>
      {cartItems.length === 0 ? (
        <h5>No items in cart</h5>
      ) : (
        <div className="cart-layout">
          {/* Left Side - Items */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image-section">
                  <img src={item.imageurl} alt={item.name} className="item-image" />
                  <div>
                    <button
                      className="cart-btn blue"
                      onClick={() => dispatch(incrementQuantity(item.id))}
                    >
                      +
                    </button>
                    <button
                      className="cart-btn blue"
                      onClick={() => dispatch(decrementQuantity(item.id))}
                    >
                      -
                    </button>
                    <button
                      className="cart-btn gray"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div>
                  <p>
                    <b>{item.name}</b> - ₹{item.price}
                  </p>
                  <p>
                    Quantity: {item.quantity || item.Quantity || 1} <br />
                    Total: ₹{item.price * (item.quantity || item.Quantity || 1)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Summary */}
          <div className="cart-summary">
            <div className="cart-container">
              <h3>🛒 Cart Summary</h3>
              <p>Total Amount: ₹{totalAmount.toFixed(2)}</p>

              {/* Coupon Section */}
              <h4>Apply Coupon</h4>
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="coupon-input"
              />
              {couponResult ? (
                <p>
                  🎉 Coupon "{couponCode}" Applied! {couponResult.discountPercent}% Off <br />
                  Discount: ₹{couponDiscount.toFixed(2)}
                </p>
              ) : (
                couponCode && <p style={{ color: "red" }}>❌ Invalid Coupon</p>
              )}
              <button className="cart-btn blue" onClick={handleApplyCoupon}>
                Apply Coupon
              </button>
              <button className="cart-btn gray" onClick={resetCoupon}>
                Reset
              </button>

              <hr />

              {/* Direct Discount Section */}
              <h4>Apply Direct Discount</h4>
              {isDiscountApplied && (
                <p>
                  🎉 Direct Discount {discountPercent}% Applied: ₹{directDiscount.toFixed(2)}
                </p>
              )}
              <div style={{ marginTop: "10px" }}>
                <button className="cart-btn blue" onClick={() => applyDiscount(10)}>
                  10%
                </button>
                <button className="cart-btn blue" onClick={() => applyDiscount(20)}>
                  20%
                </button>
                <button className="cart-btn blue" onClick={() => applyDiscount(30)}>
                  30%
                </button>
                <button className="cart-btn gray" onClick={resetDiscount}>
                  Reset
                </button>
              </div>

              <hr />

              {/* Final Amount */}
              <h5>💰 Final Amount Before Tax: ₹{finalAmount.toFixed(2)}</h5>
              <p>📊 Tax ({taxPercent}%): ₹{taxAmount.toFixed(2)}</p>
              <h5>✅ Final Amount to Pay: ₹{finalPayable.toFixed(2)}</h5>

              <hr />

              {/* Payment Methods */}
              <h4>💳 Select Payment Method</h4>

              {/* COD */}
              <button className="cart-btn green" onClick={() => setPaymentMethod("cod")}>
                🚚 Cash on Delivery
              </button>
              {paymentMethod === "cod" && (
                <p style={{ marginTop: "10px", fontWeight: "bold", color: "green" }}>
                  ✅ Cash on Delivery selected. Please click "Send Email" or "Complete Purchase".
                </p>
              )}

              {/* UPI */}
              <button
                className="cart-btn blue"
                onClick={() => {
                  setPaymentMethod("upi");
                  setUpiTimer(5); // 2 minute timer
                }}
              >
                📲 Online Payment (UPI QR)
              </button>
              {paymentMethod === "upi" && (
                <div style={{ marginTop: "15px", textAlign: "center" }}>
                  <QRCodeCanvas
                    value={`upi://pay?pa=9573508228-2@ybl&pn=sravanthi store&am=${finalPayable.toFixed(
                      2
                    )}&cu=INR&tn=Order%20Payment`}
                    size={180}
                    bgColor="#ffffff"
                    fgColor="#000000"
                  />
                  <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                    UPI ID: <span style={{ color: "#007bff" }}>9573508228-2@ybl</span>
                  </p>
                  <p>💸 Amount to Pay: ₹{finalPayable.toFixed(2)}</p>
                  <p style={{ color: "red", fontWeight: "bold" }}>
                    ⏳ QR expires in {upiTimer}s
                  </p>
                </div>
              )}

              {/* Credit Card */}
              <button className="cart-btn orange" onClick={() => setPaymentMethod("card")}>
                💳 Credit Card
              </button>

              {/* Credit Card Form */}
              {paymentMethod === "card" && (
                <div style={{ marginTop: "15px" }}>
                  <h5>💳 Enter Card Details</h5>
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="coupon-input"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    maxLength={16}
                  />
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="coupon-input"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    maxLength={5}
                  />
                  <input
                    type="password"
                    placeholder="CVV"
                    className="coupon-input"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    maxLength={3}
                  />
                  <button
                    className="cart-btn green"
                    onClick={() => {
                      if (
                        cardNumber.length !== 16 ||
                        !/^\d{16}$/.test(cardNumber) ||
                        !/^\d{2}\/\d{2}$/.test(expiry) ||
                        cvv.length !== 3 ||
                        !/^\d{3}$/.test(cvv)
                      ) {
                        Swal.fire("❌ Invalid Card Details", "Please check your card info.", "error");
                        return;
                      }
                      handleSendEmail();
                      handleCompletePurchase();
                    }}
                  >
                    ✅ Pay & Complete Purchase
                  </button>
                </div>
              )}

              <hr />

              {/* Email */}
              <label>📧 Enter your Gmail to receive order confirmation</label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="you@example.com"
                className="coupon-input"
              />

              <button className="cart-btn green" onClick={handleSendEmail}>
                ✅ Send Email Only
              </button>

              {/* Complete Purchase only works if method selected and not card */}
              <button
  className="cart-btn orange"
  onClick={() => {
    if (!paymentMethod) {
      Swal.fire("⚠️ Select Payment Method", "Please choose a payment method first.", "warning");
      return;
    }
    if (!customerEmail) {
      Swal.fire("⚠️ Email Required", "Please enter your email before completing purchase.", "warning");
      return;
    }
    if (paymentMethod === "card") {
      Swal.fire("⚠️ Card Payment", "Please use Pay & Complete Purchase inside card form.", "info");
      return;
    }

    // ✅ Send email before placing order
    handleSendEmail();
    handleCompletePurchase();
  }}
>
  🛍️ Complete Purchase
</button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
