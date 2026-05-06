import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

const faqsData = [
  {
    question: "How long does delivery usually take?",
    answer:
      "Delivery times depend on distance and traffic, but most orders within the city are completed within 30–90 minutes.",
  },
  {
    question: "Can I schedule a delivery in advance?",
    answer:
      "Yes, you can schedule deliveries ahead of time and choose a convenient pickup and drop-off window.",
  },
  {
    question: "What if I’m moving to a new city?",
    answer:
      "Our service helps you transport personal items, groceries, and essentials easily as you settle into your new city.",
  },
  {
    question: "Are my items safe during delivery?",
    answer:
      "All deliveries are handled by verified riders, and we provide tracking so you can monitor your items in real time.",
  },
  {
    question: "Do you deliver large or bulky items?",
    answer:
      "Yes, depending on availability, we support larger deliveries using vehicles suited for bulk transportation.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number| null>(null);
  const [search, setSearch] = useState("");

  const toggleFAQ = (index:number|null) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const filteredFAQs = faqsData.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 px-4 py-3 mb-15 xs:mb-none">
        {/* Title */}
        <div className="flex items-center gap-x-2 mb-6">
          <h1 className="font-medium md:text-2xl sm:text-xl text-lg text-gray-800">
            FAQs
          </h1>
          <div className="p-2 rounded-full bg-yellow-100">
            <HelpCircle className="text-yellow-500 w-6 h-6" size={25} />
          </div>
        </div>
      <div className="max-w-3xl mx-auto">


        {/* Search */}
        <input
          type="text"
          placeholder="Search delivery questions..."
          className="w-full p-3 mb-8 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* FAQ Cards */}
        <div className="space-y-5">
          {filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="font-semibold text-gray-800">
                  {faq.question}
                </span>

                <ChevronDown
                  className={`transition-transform duration-300 ${
                    activeIndex === index
                      ? "rotate-180 text-yellow-500"
                      : "text-gray-400"
                  }`}
                />
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 px-5 ${
                  activeIndex === index ? "max-h-40 pb-5" : "max-h-0"
                }`}
              >
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredFAQs.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No matching questions found.
          </p>
        )}

        {/* CTA */}
        <div className="mt-10 text-center">
          <p className="text-gray-600 mb-3">
            Still need help?
          </p>
          <button className="px-6 py-3 bg-yellow-500 text-white rounded-xl shadow-md hover:bg-yellow-600 transition">
            Contact Support
          </button>
        </div>

      </div>
    </div>
  );
}
export default FAQ 