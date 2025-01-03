// // src/pages/CartPage.js
// import React from "react";
// import { useProductCart } from "../store/CartProduct";
// import CustomButton from "./CustomButton";
// const CartPage = () => {
//     const products = useProductCart((state) => state.productsForCart);
//     const removeFromCart = useProductCart((state) => state.removeProductFromCart);
// console.log("products is" , products);

//   return (
//     <div>
//       <h1>Cart</h1>
//       {products.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         products.map((product) => (
//           <div key={product.id} style={{ marginBottom: "16px" }}>
//             <img src={product.images[0]} width="300px"/>
//             <h2>{product.title}</h2>
//             <p>Price: ${product.price}</p>
//             <CustomButton
//               onClick={() => removeFromCart(product.id)}
//               color="secondary"
//               size="small"
//             >
//               Remove
//             </CustomButton>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default CartPage;
import React from "react";
import { useProductCart } from "../store/CartProduct";
import CustomButton from "./CustomButton";

const CartPage = () => {
  const products = useProductCart((state) => state.productsForCart);
  const removeFromCart = useProductCart((state) => state.removeProductFromCart);
  const increaseQuantity = useProductCart((state) => state.increaseQuantity);
  const decreaseQuantity = useProductCart((state) => state.decreaseQuantity);
  console.log("products is", products);

  // Calculate the total price
  const totalPrice = products.reduce(
    (total, product) => total + product.price * (product.amount ?? 1),
    0
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Cart</h1>
      {products.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                marginBottom: "16px",
                border: "1px solid #c6c7c8",
                borderRadius: "8px",
                padding: "20px",
              }}
            >
              <img src={product.images[0]} width="300px" alt={product.title} />
              <h2>{product.title}</h2>
              <p>
                Price: ${(product.price * (product.amount ?? 1)).toFixed(2)}
              </p>
              <p>Quantity: {product.amount ?? 1}</p>
              <div style={{ display: "flex", gap: "8px" }}>
                <CustomButton
                  onClick={() => increaseQuantity(product.id)}
                  color="primary"
                  size="small"
                >
                  Increase
                </CustomButton>
                <CustomButton
                  onClick={() => decreaseQuantity(product.id)}
                  color="secondary"
                  size="small"
                >
                  Decrease
                </CustomButton>
                <CustomButton
                  onClick={() => removeFromCart(product.id)}
                  color="secondary"
                  size="small"
                >
                  Remove
                </CustomButton>
              </div>
            </div>
          ))}
          {/* Show the total price */}
          <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
        </>
      )}
    </div>
  );
};

export default CartPage;
