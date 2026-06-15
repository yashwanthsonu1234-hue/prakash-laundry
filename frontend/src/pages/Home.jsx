import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";
import { CartContext } from "../context/CartContext";

export default function Home() {
  const navigate = useNavigate();

  const [averageRating, setAverageRating] =
  useState(0);

  const { addToCart } = useContext(CartContext);

  const [reviews, setReviews] = useState([]);

useEffect(() => {
  axios
    .get("http://127.0.0.1:8000/api/reviews/")
    .then((res) => {

      setReviews(res.data.slice(0, 3));

      const total =
        res.data.reduce(
          (sum, review) =>
            sum + review.rating,
          0
        );

      const avg =
        res.data.length > 0
          ? (
              total /
              res.data.length
            ).toFixed(1)
          : 0;

      setAverageRating(avg);
    });
}, []);

const services = [
  {
    id: 1,
    title: "Wash & Fold",
    price: 50,
    icon: "🧺",
    description: "Professional washing and folding service",
  },
  {
    id: 2,
    title: "Dry Cleaning",
    price: 100,
    icon: "👔",
    description: "Premium garment care and stain removal",
  },
  {
    id: 3,
    title: "Ironing (Shirts & Pants)",
    price: 15,
    icon: "🧼",
    description: "Perfect steam ironing and finishing",
  },
  {
    id: 4,
    title: "Blanket Cleaning",
    price: 200,
    icon: "🛏️",
    description: "Deep cleaning for blankets and comforters",
  },
  {
    id: 5,
    title: "Curtain Cleaning",
    price: 300,
    icon: "🪟",
    description: "Professional curtain washing service",
  },
  {
    id: 6,
    title: "Saree Ironing",
    price: 40,
    icon: "🥻",
    description: "Professional ironing for sarees",
  },
  {
    id: 7,
    title: "Fancy Saree Ironing",
    price: 50,
    icon: "✨",
    description: "Special care ironing for fancy sarees",
  },
  {
    id: 8,
    title: "Ironing (Kids Wear)",
    price: 8,
    icon: "👕",
    description: "Gentle ironing for children's clothes",
  },
  {
    id: 9,
    title: "Fancy Dress Ironing (Women Wear)",
    price: 25,
    icon: "👗",
    description: "Professional ironing for women's fancy wear",
  },
  {
    id: 10,
    title: "Ironing (Starched Clothes)",
    price: 20,
    icon: "👔",
    description: "Ironing for starched garments",
  },
  {
    id: 11,
    title: "Applying Starch & Ironing",
    price: 50,
    icon: "🧺",
    description: "Complete Applying Starch and ironing service for starched garments",
  },
  {
  id: 12,
  title: "Carpet Cleaning",
  price: 500,
  icon: "🏠",
  description: "Deep cleaning for carpets and rugs",
},
];


  const handleSelect = (service) => {
    addToCart(service);
  };

  const scrollToServices = () => {
    document
      .getElementById("services")
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-300 text-black">
      <Navbar />

      {/* Hero Section */}
      <div className="mt-4 text-red-600 text-xl">
  ⭐ {averageRating}/5 Customer Rating
</div>
      <div className="flex flex-col items-center justify-center text-center px-6 mt-20 md:mt-32">
        <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold">
          Professional Laundry <br />
          Services at Your Doorstep
        </h2>

        <p className="text-black-400 text-lg md:text-2xl mt-6">
          Fast • Clean • Reliable
        </p>

        <button
          onClick={scrollToServices}
          className="mt-10 bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-2xl text-lg md:text-xl font-semibold transition"
        >
          Book Service
        </button>
      </div>

      {/* Services */}
      <div
        id="services"
        className="mt-28 px-6 md:px-16 pb-20"
      >
        <h3 className="text-3xl md:text-5xl font-bold text-center mb-14">
          Our Services
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              price={service.price}
              icon={service.icon}
              description={service.description}
              onSelect={handleSelect}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/cart")}
            className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-xl text-white font-semibold"
          >
            Proceed to Cart
          </button>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/track-order")}
            className="bg-yellow-500 hover:bg-yellow-600 px-8 py-4 rounded-xl text-black font-semibold"
          >
            Track Order
          </button>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="px-6 md:px-16 py-20">
        <h3 className="text-4xl font-bold text-center mb-12">
          Why Choose Us?
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/10 p-6 rounded-xl">
            <h4 className="text-2xl font-bold mb-3">
              🚚 Free Pickup
            </h4>

            <p>
              Doorstep pickup without any hassle.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-xl">
            <h4 className="text-2xl font-bold mb-3">
              ⚡ Fast Delivery
            </h4>

            <p>
              Quick turnaround and timely delivery.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-xl">
            <h4 className="text-2xl font-bold mb-3">
              ⭐ Premium Quality
            </h4>

            <p>
              Professional garment care and cleaning.
            </p>
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="px-6 md:px-16 py-20">
        <h2 className="text-4xl font-bold text-center mb-10">
          Customer Reviews
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white/10 p-6 rounded-xl"
              >
                <h3 className="font-bold text-xl">
                  {review.customer_name}
                </h3>

                <p className="text-yellow-400 text-lg mt-2">
                  {"⭐".repeat(review.rating)}
                </p>

                <p className="mt-4">
                  {review.comment}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3">
              No reviews yet.
            </p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}