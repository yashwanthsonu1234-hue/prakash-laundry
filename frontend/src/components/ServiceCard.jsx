import { useState } from "react";

export default function ServiceCard({
  title,
  price,
  onSelect,
}) {
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    onSelect({
      title,
      price,
      quantity,
      subtotal: price * quantity,
    });
  };

  return (
    <div className="bg-white/10 p-6 rounded-2xl">
      <h2 className="text-2xl font-bold mb-3">
        {title}
      </h2>

      <p className="mb-4">
        ₹{price} per cloth
      </p>

      <label className="block mb-2">
        Quantity
      </label>

      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) =>
          setQuantity(Number(e.target.value))
        }
        className="mt-4 bg-blue-400 hover:bg-black-600 px-5 py-2 rounded-xl w-full"
      />

      <button
        onClick={handleAdd}
        className="mt-4 bg-blue-400 hover:bg-black-600 px-5 py-2 rounded-xl w-full"
      >
        Add Service
      </button>
    </div>
  );
}