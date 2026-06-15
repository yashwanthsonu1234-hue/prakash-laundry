import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    cartTotal,
  } = useContext(CartContext);

  return (
    <div className="min-h-screen bg-blue-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-xl">
          No services selected.
        </p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              key={index}
              className="bg-white/10 rounded-xl p-5 mb-4 flex justify-between items-center"
            >
              <div>
                <h2 className="text-2xl font-semibold">
                  {item.title}
                </h2>

<p>
  Quantity: {item.quantity}
</p>

<p>
  Amount: ₹{item.subtotal}
</p>
                

              </div>

              <button
                onClick={() => removeFromCart(index)}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-10">
            <h2 className="text-3xl font-bold">
              Total: ₹{cartTotal}
            </h2>
          </div>

          <Link
            to="/booking"
            className="inline-block mt-6 bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl"
          >
            Proceed to Checkout
          </Link>
        </>
      )}
    </div>
  );
}