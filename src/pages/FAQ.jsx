import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQ = () => {
    const OurFAQ = [
        {
            question: "Does Next-Commerce charge a commission on each order?",
            answer:
                "No, we do not charge any commission on your orders, this is the case and will always be the case.",
        },
        {
            question: "How do Next-Commerce subscriptions work?",
            answer:
                "With Next-Commerce plans, you can set your own subscription price, so you only pay for what you need. All you have to do is select the number of orders per month you're comfortable with, the number of Facebook pixels you need, the number of custom domains you need, and the number of store workers you want to add to work with you, and your price will be displayed.",
        },
        {
            question: "What happens if I receive new orders after my subscription expires?",
            answer:
                "Unlike other platforms that will delete your orders if you receive them after your subscription expires, Next-Commerce has come up with a new and unique solution. Instead of deleting your orders because your subscriptions have expired, we'll keep them on your behalf for two days so you can purchase all of them or just the orders you select.",
        },
        {
            question: "What payment methods are available to pay for my subscription?",
            answer:
                "Currently, you can pay for your subscription via CCP, BaridiMob or Wise account.",
        },
        {
            question: "Do I need coding or design skills to create my store on Next-Commerce?",
            answer:
                "No, you don't need to. In fact, Next-Commerce was designed for just that purpose: anyone can create a stylish and powerful online store, and we'll take care of all the programming.",
        },

    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full max-w-2xl mx-auto py-6">
            <h1 className="text-center text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
                Frequently Asked{" "}
                <span className="text-teal-500">Questions</span>
            </h1>

            <div className="space-y-3">
                {OurFAQ.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-xl shadow-sm bg-white py-2"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex justify-between items-center text-right px-4 py-3 text-neutral-800 font-medium"
                        >
                            {faq.question}
                            {openIndex === index ? (
                                <ChevronUp className="w-5 h-5 text-gray-500" />
                            ) : (
                                <ChevronDown className="w-5 h-5 text-gray-500" />
                            )}
                        </button>

                        {openIndex === index && (
                            <div className="px-4 pb-4 text-sm text-gray-600">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
