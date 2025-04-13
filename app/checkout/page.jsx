"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);
  const [selectedPayment, setSelectedPayment] = useState("card");

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

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
        <div className="mb-6">
          {selectedPayment === "card" && (
            <div className="space-y-4">
              <h3 className="text-md font-medium">Card Details</h3>
              <input
                type="text"
                placeholder="Card Number"
                className="w-full border px-4 py-2 rounded-lg"
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-1/2 border px-4 py-2 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  className="w-1/2 border px-4 py-2 rounded-lg"
                />
              </div>
              <input
                type="text"
                placeholder="Name on Card"
                className="w-full border px-4 py-2 rounded-lg"
              />
            </div>
          )}

          {selectedPayment === "paypal" && (
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-md text-sm">
              You will be redirected to PayPal to complete your purchase.
            </div>
          )}

          {selectedPayment === "googlepay" && (
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md text-sm">
              Google Pay integration coming soon. You’ll be redirected to Google
              Pay when ready.
            </div>
          )}
        </div>

        {/* Proceed Button */}
        <div className="mt-6">
          <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition">
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
