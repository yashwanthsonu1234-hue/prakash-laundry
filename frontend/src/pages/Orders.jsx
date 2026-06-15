import { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

useEffect(() => {
  const fetchOrders = () => {
    const token = localStorage.getItem("access");

    console.log("TOKEN:", token);

    axios
      .get(
        "http://127.0.0.1:8000/api/my-orders/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  fetchOrders();

  const interval = setInterval(
    fetchOrders,
    5000
  );

  return () => clearInterval(interval);
}, []);

  return (
    <div className="min-h-screen bg-blue-950 text-white p-4 md:p-10">
      <h1 className="text-5xl font-bold mb-10">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => {
          let services = [];

try {
  services =
    typeof order.services === "string"
      ? JSON.parse(order.services)
      : order.services || [];
} catch {
  services = [];
}

          return (
            <div
              key={order.id}
              className="bg-white/10 p-5 rounded-xl mb-6"
            >
              <h2 className="text-2xl font-bold mb-3">
                Order #{order.id}
              </h2>

              <p>
                <strong>Name:</strong> {order.customer_name}
              </p>

              <p>
                <strong>Phone:</strong> {order.phone}
              </p>

              <p>
                <strong>Address:</strong> {order.address}
              </p>

              <p>
                <strong>Pickup Date:</strong> {order.pickup_date}
              </p>

              <p>
                <strong>Total:</strong> ₹{order.total_amount}
              </p>



              {/* Status Badge */}
              <div className="mt-4">
                <span
                  className={`px-4 py-2 rounded-full font-semibold ${
                    order.status === "Delivered"
                      ? "bg-green-600 text-white"
                      : order.status === "Washing"
                      ? "bg-blue-600 text-white"
                      : order.status === "Out For Delivery"
                      ? "bg-purple-600 text-white"
                      : "bg-yellow-500 text-black"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Tracking Timeline */}
              <div className="mt-5 flex flex-wrap gap-3">
                <span
                  className={`px-3 py-2 rounded font-medium ${
                    [
                      "Pickup Scheduled",
                      "Washing",
                      "Out For Delivery",
                      "Delivered",
                    ].includes(order.status)
                      ? "bg-green-600 text-white"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  Pickup
                </span>

                <span
                  className={`px-3 py-2 rounded font-medium ${
                    [
                      "Washing",
                      "Out For Delivery",
                      "Delivered",
                    ].includes(order.status)
                      ? "bg-green-600 text-white"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  Washing
                </span>

                <span
                  className={`px-3 py-2 rounded font-medium ${
                    [
                      "Out For Delivery",
                      "Delivered",
                    ].includes(order.status)
                      ? "bg-green-600 text-white"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  Delivery
                </span>

                <span
                  className={`px-3 py-2 rounded font-medium ${
                    order.status === "Delivered"
                      ? "bg-green-600 text-white"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  Delivered
                </span>
              </div>

              {/* Services */}
              <div className="mt-5">
                <h3 className="font-bold text-lg mb-3">
                  Services
                </h3>

                {services.length === 0 ? (
                  <p>No service details available.</p>
                ) : (
                  services.map((service, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-600 py-2"
                    >
                      <p>
                        {service.title} × {service.quantity}
                      </p>

                      <p>
                        Amount: ₹{service.subtotal}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}