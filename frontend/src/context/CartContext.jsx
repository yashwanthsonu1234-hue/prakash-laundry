import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {

  const clearCart = () => {
  setCart([]);
};

  const [cart, setCart] = useState([]);

  const addToCart = (service) => {
    console.log("Adding:", service);
    setCart((prev) => [...prev, service]);
  };

  const removeFromCart = (index) => {
    setCart((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const cartTotal = cart.reduce(
    (total, item) =>
      total + (item.subtotal || 0),
    0
  );

  return (
<CartContext.Provider
  value={{
    cart,
    addToCart,
    removeFromCart,
    cartTotal,
    clearCart,
  }}
>
      {children}
    </CartContext.Provider>
  );
}