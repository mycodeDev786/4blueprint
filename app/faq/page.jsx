"use client";
import { useState } from "react";

export default function FAQ() {
  const faqs = [
    {
      question: "How can I purchase a recipe?",
      answer:
        "You can purchase a recipe by creating an account, browsing our available recipes, and adding your desired ones to the cart. After completing the payment, you'll get full access to the recipe details.",
    },
    {
      question: "Are the recipes suitable for beginners?",
      answer:
        "Absolutely! Our recipes include step-by-step instructions, making them easy to follow for beginners while still offering depth for experienced cooks.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major credit cards, PayPal, and other secure online payment methods to ensure a smooth purchasing experience.",
    },
    {
      question: "Can I access my purchased recipes from multiple devices?",
      answer:
        "Yes, once you purchase a recipe, you can access it anytime from any device by logging into your account.",
    },
    {
      question: "Do you offer refunds if I’m not satisfied?",
      answer:
        "Due to the digital nature of our recipes, we do not offer refunds. However, if you have concerns, feel free to contact our support team for assistance.",
    },
    {
      question: "Are the ingredients locally available?",
      answer:
        "Most recipes use common ingredients available in grocery stores. If any special ingredients are required, they will be mentioned in the recipe details.",
    },
    {
      question: "Can I request custom recipes?",
      answer:
        "Yes! We welcome requests for specific recipes. You can reach out to our team, and we’ll do our best to create something tailored to your needs.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-gray-900">Frequently Asked Questions</h1>
      <p className="text-gray-600 mt-3 text-center">
        Find answers to the most common questions about our recipes and services.
      </p>
      <div className="mt-8 space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-300 pb-4">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left flex justify-between items-center text-lg font-medium text-gray-800 py-3 focus:outline-none transition-all"
            >
              {faq.question}
              <span className="text-gray-500 text-xl">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            <div
              className={`overflow-hidden transition-max-height duration-300 ${
                openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-gray-600 mt-2">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
