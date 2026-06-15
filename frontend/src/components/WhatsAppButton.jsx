import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <>
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/917386419593?text=Hello%20Prakash%20Laundry"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-lg z-50"
      >
        <FaWhatsapp size={30} />
        <span className="hidden md:block">
          Chat With Us
        </span>
      </a>

      {/* Book Laundry Button */}
      <a
        href="https://wa.me/917386419593?text=Hello%20Prakash%20Laundry,%20I%20want%20to%20book%20a%20laundry%20pickup."
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-600 px-6 py-3 rounded-lg text-white"
      >
        Book Via WhatsApp
      </a>

      {/* Support Button */}
      <a
        href="https://wa.me/917386419593?text=Hello%20Prakash%20Laundry,%20I%20need%20help%20with%20my%20order."
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 px-6 py-3 rounded-lg text-white"
      >
        Need Help?
      </a>
    </>
  );
}