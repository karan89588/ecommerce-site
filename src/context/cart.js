import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [Cart, setCart] = useState([]);
  useEffect(() => {
    const data = localStorage.getItem("cart");
    if (data) {
      const parseData = JSON.parse(data);
      setCart(parseData);
    }
    //eslint-disable-next-line
  }, []);
  return (
    <CartContext.Provider value={[Cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);
export { useCart, CartProvider };
