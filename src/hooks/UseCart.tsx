// Custom hook to use CartContext
import { useContext } from "react";
import { CartContextType } from "../utils/CartContext";
import { CartContext } from "../utils/CartContext";

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error("useCart must be used within a CartProvider");
    }
    return context;
  };