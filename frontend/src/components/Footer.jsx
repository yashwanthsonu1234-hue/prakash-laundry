import { Link } from "react-router-dom";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-10">

        {/* Company */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Prakash Laundry
          </h2>

          <p className="text-gray-300">
            Professional washing, ironing,
            dry cleaning and doorstep pickup
            services in Hyderabad.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-4">
            Quick Links
          </h2>

          <div className="flex flex-col gap-2">
            <Link to="/">Home</Link>
            <Link to="/TrackOrder">Track Order</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/faq">FAQ</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xl font-bold mb-4">
            Contact
          </h2>

          <div className="space-y-3">

            <p className="flex items-center gap-2">
              <FaPhone />
              +91 7386419593
            </p>

            <p className="flex items-center gap-2">
              <FaEnvelope />
              koyalakondayashwanthkumar@gmail.com
            </p>

            <p className="flex items-center gap-2">
              <FaMapMarkerAlt />
              Karmanghat, Hyderabad
            </p>

          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5 text-2xl">

            <a
              href="https://wa.me/917386419593"
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebook />
            </a>

          </div>
        </div>

      </div>

      <div className="border-t border-gray-700 py-4 text-center">
        © 2026 Prakash Laundry. All Rights Reserved.
      </div>
    </footer>
  );
}