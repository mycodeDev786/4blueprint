"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import API_ENDPOINTS from "../utils/api";
import { clearCart } from "../store/cartSlice";

export default function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const userId = user?.id;
  const dispatch = useDispatch();

  const stripe = useStripe();
  const elements = useElements();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    setError(null);

    try {
      // STEP 1: Call your backend to create a PaymentIntent and get client_secret
      const paymentResponse = await fetch(
        API_ENDPOINTS.PAYMENT.CREATE_PAYMENT,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: Math.round(totalPrice * 100) }),
        }
      );

      const { clientSecret } = await paymentResponse.json();

      // STEP 2: Confirm the card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          try {
            // STEP 3: Save all recipes in the cart as purchases in a single request
            const recipeIds = cartItems.map((item) => item.id);

            const purchaseResponse = await fetch(
              API_ENDPOINTS.PURCHASES.SAVE_PURCHASE,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  // Authorization: `Bearer ${userToken}`, // Pass user authentication token
                },
                body: JSON.stringify({ recipeIds, userId }), // Send all recipe IDs in a single request
              }
            );

            const purchaseData = await purchaseResponse.json();

            if (!purchaseResponse.ok) {
              console.error(
                "Failed to save purchases:",
                purchaseData.message || "Unknown error"
              );
              setError(
                purchaseData.message ||
                  "Failed to save purchases. Please try again."
              );
            } else {
              console.log("Purchases saved successfully:", purchaseData);
              dispatch(clearCart());
              setSuccess(true);
            }
          } catch (purchaseError) {
            setError("Error saving purchases. Please try again.");
          }
        }
      }
    } catch (err) {
      setError("Payment failed. Try again.");
    }

    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Order Summary */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between border-b pb-2 text-sm"
              >
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-base font-semibold">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Selection */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-4">Select Payment Method</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={selectedPayment === "card"}
                onChange={() => setSelectedPayment("card")}
              />
              <span>Credit / Debit Card</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="payment"
                value="paypal"
                checked={selectedPayment === "paypal"}
                onChange={() => setSelectedPayment("paypal")}
              />
              <span>PayPal</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="payment"
                value="googlepay"
                checked={selectedPayment === "googlepay"}
                onChange={() => setSelectedPayment("googlepay")}
              />
              <span>Google Pay</span>
            </label>
          </div>
        </div>

        {/* Payment Details */}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            {selectedPayment === "card" && (
              <div className="space-y-4">
                <h3 className="text-md font-medium">Card Details</h3>
                <div className="border p-3 rounded-lg">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#32325d",
                          "::placeholder": { color: "#a0aec0" },
                        },
                        invalid: { color: "#fa755a" },
                      },
                    }}
                  />
                </div>
              </div>
            )}

            {selectedPayment === "paypal" && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-md text-sm">
                You will be redirected to PayPal to complete your purchase.
              </div>
            )}

            {selectedPayment === "googlepay" && (
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md text-sm">
                Google Pay integration coming soon. You’ll be redirected to
                Google Pay when ready.
              </div>
            )}
          </div>

          {/* Error / Success Message */}
          {error && (
            <div className="text-red-600 mb-4 text-sm font-medium">{error}</div>
          )}
          {success && (
            <div className="text-green-600 mb-4 text-sm font-medium">
              Payment successful!
            </div>
          )}

          {/* Proceed Button */}
          {selectedPayment === "card" && (
            <div className="mt-6">
              <button
                type="submit"
                disabled={!stripe || isProcessing}
                className={`w-full ${
                  isProcessing
                    ? "bg-gray-400"
                    : "bg-purple-600 hover:bg-purple-700"
                } text-white py-3 rounded-lg transition`}
              >
                {isProcessing ? "Processing..." : "Proceed to Payment"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
