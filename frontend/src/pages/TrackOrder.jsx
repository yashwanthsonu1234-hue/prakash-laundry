import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TrackOrder() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState([]);

  const searchOrders = async () => {
    try {
      const response = await axios.get(
        `https://prakash-laundry.onrender.com/api/track-order/?phone=${phone}`
      );

      setOrders(response.data);
    } catch (error) {
      console.error(error);
      alert("No Orders Found");
    }
  };

  const leaveReview = (orderId) => {
  navigate(`/review/${orderId}`);
};

  return (
    <div className="min-h-screen bg-white/90 text-black p-10">

      <h1 className="text-5xl font-bold mb-8">
        Track Order
      </h1>

     <div className="flex flex-col md:flex-row gap-4 mb-10">

        <input
          type="text"
          placeholder="Enter Mobile Number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          className="w-full p-3 rounded text-black mb-5"
        />

        <button
          onClick={searchOrders}
          className="bg-green-600 px-6 py-3 rounded"
        >
          Search
        </button>

      </div>

      {orders.length === 0 ? (
        <p>No Orders Found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white/10 p-5 rounded-xl mb-6"
          >
            <h2 className="text-2xl font-bold">
              Order #{order.id}
            </h2>

            <p>Name: {order.customer_name}</p>
            <p>Phone: {order.phone}</p>
            <p>Address: {order.address}</p>
            <p>Pickup Date: {order.pickup_date}</p>
            <p>Total: ₹{order.total_amount}</p>

            <div className="mt-3">
              <span className="bg-green-600 px-4 py-2 rounded">
                {order.status}
              </span>
            </div>


            {order.services && (
              <div className="mt-4">
                <h3 className="font-bold">
                  Services
                </h3>

                {JSON.parse(order.services).map(
                  (service, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-600 py-2"
                    >
                      <p>
                        {service.title} ×{" "}
                        {service.quantity}
                      </p>

                      <p>
                        Amount: ₹
                        {service.subtotal}
                      </p>
                    </div>
                  )
                )}
              </div>
            )}

<div className="flex flex-wrap gap-3 mt-4">
            <button className="bg-yellow-600 px-4 py-2 rounded"
  onClick={() =>
    window.open(
      `https://prakash-laundry.onrender.com/api/invoice/${order.id}/`,
      "_blank"
    )
  }
>
  Download Invoice
</button>
<a
  href={`https://wa.me/917386419593?text=Hello%20Prakash%20Laundry,%20I%20have%20a%20question%20about%20Order%20%23${order.id}`}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
>
  WhatsApp About This Order
</a>

            {order.status === "Delivered" && (
              <button
                onClick={() =>
                  leaveReview(order.id)
                }
                className="bg-yellow-500 text-black px-4 py-2 rounded">
              
                Leave Review
              </button>
            )}
</div>
          </div>
        ))
      )}

    </div>
  );
}