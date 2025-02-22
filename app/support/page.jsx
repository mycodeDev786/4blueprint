"use client";

export default function Support() {
  const supportOptions = [
    {
      title: "Email Support",
      description: "Reach out to us via email, and we'll respond within 24 hours.",
      icon: "📧",
      contact: "support@example.com",
    },
    {
      title: "Phone Support",
      description: "Call us for immediate assistance during working hours.",
      icon: "📞",
      contact: "+1 (555) 123-4567",
    },
    {
      title: "Live Chat",
      description: "Chat with our support team for real-time assistance.",
      icon: "💬",
      contact: "Start Live Chat",
    },
    {
      title: "Help Center",
      description: "Find answers to common questions in our FAQ section.",
      icon: "❓",
      contact: "Visit FAQ",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto py-12 px-6 text-center">
      <h1 className="text-4xl font-bold text-gray-900">Customer Support</h1>
      <p className="text-gray-600 mt-3">
        Need help? Contact our support team through any of the options below.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {supportOptions.map((option, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-5 shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="text-3xl">{option.icon}</div>
            <h2 className="text-xl font-semibold mt-3">{option.title}</h2>
            <p className="text-gray-600 mt-2">{option.description}</p>
            <p className="text-blue-600 font-medium mt-2 cursor-pointer hover:underline">
              {option.contact}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
