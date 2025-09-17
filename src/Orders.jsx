// src/Orders.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearOrders } from "./store";
import "./app.css";

function Orders() {
  const orders = useSelector((state) => state.orders) || [];
  const dispatch = useDispatch();
  const [expandedOrders, setExpandedOrders] = useState({});

  const handleClearOrders = () => {
    dispatch(clearOrders());
  };

  const toggleOrder = (orderId) => {
    setExpandedOrders((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h2>📦 Your Orders</h2>
        {orders.length > 0 && (
          <button className="clear-orders-btn" onClick={handleClearOrders}>
            🗑️ Clear Orders
          </button>
        )}
      </div>

      {orders.length === 0 ? (
        <p className="empty-orders">No orders placed yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order, index) => {
            const isExpanded = expandedOrders[order.id];
            const items = order.items || [];

            // Render items only
            const itemRows = items.map((item, idx) => {
              const quantity = Number(item.quantity || item.Quantity || 1);
              const price = Number(item.price || 0);
              const totalItem = price * quantity;

              return (
                <div key={idx} className="item-mini">
                  {item.imageurl ? (
                    <img
                      src={item.imageurl}
                      alt={item.name}
                      className="item-mini-img"
                    />
                  ) : (
                    <div className="item-mini-img placeholder">🛒</div>
                  )}
                  <span>
                    {item.name} — ₹{price.toFixed(2)} ×{" "}
                    <strong>{quantity}</strong> = ₹{totalItem.toFixed(2)}
                  </span>
                </div>
              );
            });

            const allRows = [...itemRows];
            const visibleRows = isExpanded ? allRows : allRows.slice(0, 3);

            return (
              <div key={index} className="order-card">
                <div className="order-summary">
                  <h4>🧾 {order.id || `Order #${index + 1}`}</h4>
                  <p>{order.date || "Date not recorded"}</p>
                </div>

                <div className="order-content">{visibleRows}</div>

                {/* ✅ Always show toggle button */}
                {allRows.length > 0 && (
                  <button
                    className="toggle-order-btn"
                    onClick={() => toggleOrder(order.id)}
                  >
                    {isExpanded ? "Show Less" : "Show More"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Orders;
