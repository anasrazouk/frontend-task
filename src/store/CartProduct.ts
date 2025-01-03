// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// export type Product = {
//   id : number,
//   title: string;
//   images: string[];
//   description ?: string;
//   category?: string;
//   price: number;
//   rating ?: number;
//   amount ? : number;
// };
// type ProductCart = {
//   productsForCart: Product[];
//   addProductToCart: (product: Product) => void;
//   removeProductFromCart: (productId:number) => void;
// };
// export const useProductCart = create<ProductCart>()(
//     persist(
//       (set) => ({
//         productsForCart: [],
//         addProductToCart: (productToAdd) =>
//           set((state) => ({ productsForCart: [...state.productsForCart, productToAdd] })),
//         removeProductFromCart: (productId) =>
//           set((state) => ({
//             productsForCart: state.productsForCart.filter((item) => item.id !== productId),
//           })),
//       }),
//       {
//         name: "cart-storage", 
//       }
//     )
//   );
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Product = {
  id: number;
  title: string;
  images: string[];
  description?: string;
  category?: string;
  price: number;
  rating?: number;
  amount: number; 
};

type ProductCart = {
  productsForCart: Product[];
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
};

export const useProductCart = create<ProductCart>()(
  persist(
    (set) => ({
      productsForCart: [],
      addProductToCart: (productToAdd) =>
        set((state) => {
          const existingProduct = state.productsForCart.find(
            (item) => item.id === productToAdd.id
          );

          if (existingProduct) {
            return {
              productsForCart: state.productsForCart.map((item) =>
                item.id === productToAdd.id
                  ? { ...item, amount: (item.amount || 1) + 1 }
                  : item
              ),
            };
          } else {
            return {
              productsForCart: [
                ...state.productsForCart,
                { ...productToAdd, amount: 1 },
              ],
            };
          }
        }),
      removeProductFromCart: (productId) =>
        set((state) => ({
          productsForCart: state.productsForCart.filter(
            (item) => item.id !== productId
          ),
        })),
      increaseQuantity: (productId) =>
        set((state) => ({
          productsForCart: state.productsForCart.map((item) =>
            item.id === productId
              ? { ...item, amount: (item.amount || 1) + 1 }
              : item
          ),
        })),
      decreaseQuantity: (productId) =>
        set((state) => ({
          productsForCart: state.productsForCart.map((item) =>
            item.id === productId && (item.amount || 1) > 1
              ? { ...item, amount: item.amount! - 1 }
              : item
          ),
        })),
    }),
    {
      name: "cart-storage", // Key for localStorage
    }
  )
);
