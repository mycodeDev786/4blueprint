"use client";

import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../store/cartSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    } else {
      handleRemove(id);
    }
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
    // Implement actual checkout logic
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="w-full md:max-w-xl mx-0 md:mx-auto p-4  min-h-screen border border-gray-300 rounded-lg shadow-sm">
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col w-full md:flex-row items-center gap-4 bg-white p-4 shadow-md rounded-lg border border-gray-200"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={100}
                height={100}
                className="rounded-lg object-cover"
              />
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-700">${item.price.toFixed(2)}</p>
                <div className="flex items-center justify-center md:justify-start gap-2 mt-3">
                  <label htmlFor={`quantity-${item.id}`} className="text-sm">
                    Qty:
                  </label>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <input
                      id={`quantity-${item.id}`}
                      type="number"
                      value={item.quantity}
                      min="1"
                      readOnly
                      className="w-12 border rounded p-1 text-center"
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-600 hover:text-red-800 transition"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total Price & Checkout */}
          <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-bold mb-4 md:mb-0">
              Total: ${totalPrice.toFixed(2)}
            </h2>
            <button
              onClick={handleCheckout}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
