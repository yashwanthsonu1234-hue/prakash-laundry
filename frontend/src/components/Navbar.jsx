import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useContext(CartContext);

  return (
    <nav className="sticky top-0 z-50 bg-blue-400 shadow-lg px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">
          Prakash Laundry
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/"
            className="text-white hover:text-yellow-300"
          >
            Home
          </Link>

          {/* <Link
            to="/track-order"
            className="text-white hover:text-yellow-300"
          >
            Track Order
          </Link> */}

          <Link
            to="/cart"
            className="text-white hover:text-yellow-300"
          >
            Cart ({cart.length})
          </Link>


          <Link to="/TrackOrder"
          className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold"
          >
            My Orders
          </Link>
          <Link to="/about"  className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold"
          >About</Link>

          <Link to="/contact"
          className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold"
          >Contact</Link>

          <Link to="/faq"
          className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold"
          >FAQ</Link>

          {/* <Link
  to="/analytics"
  className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold"
>
  Analytics
</Link> */}

<Link
  to="/Login"
  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold"
>
  Admin Login
</Link>
        </div>

      </div>
    </nav>
  );
}