import { useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Booking() {
  const { cart, cartTotal, clearCart } =
    useContext(CartContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://prakash-laundry.onrender.com/api/orders/",
        {
          customer_name: formData.name,
          phone: formData.phone,
          address: formData.address,
          pickup_date: formData.date,
          pickup_time: formData.time,
          total_amount: cartTotal,
          services: JSON.stringify(cart),
          status: "Pickup Scheduled",
        }
      );

      console.log(response.data);

      clearCart();

      alert("Order Created Successfully");

      navigate("/track-order");
    } catch (error) {
      console.log(error.response?.data);
      alert("Failed to create order");
    }
  };

  return (
    <div className="min-h-screen bg-white p-10">
      <h1 className="text-4xl font-bold mb-8">
        Schedule Pickup
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl space-y-5"
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Mobile Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <textarea
          name="address"
          placeholder="Pickup Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <div className="bg-gray-100 p-3 rounded">
          Total Amount: ₹{cartTotal}
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}