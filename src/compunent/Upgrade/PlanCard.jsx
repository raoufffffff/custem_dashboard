import React from 'react';

const PlanCard = ({
    name,
    price,
    currency,
    term,
    features = [],
    badge,
    isPopular,
    buttonText,
    onClick
}) => {
    return (
        <div
            className={`relative flex flex-col w-full bg-white rounded-2xl transition-all duration-300
            ${isPopular
                    ? 'border-2 border-purple-600 shadow-xl scale-100 md:scale-105 z-10'
                    : 'border border-gray-200 shadow-sm hover:shadow-purple-200 hover:border-purple-300'
                }`}
        >
            {/* Badge */}
            {badge && (
                <div className="absolute top-0 translate-y-[-50%] w-full flex justify-center">
                    <span className={`px-4 py-1 text-xs font-bold tracking-wide text-center text-white  uppercase rounded-full shadow-xs ${isPopular ? 'bg-purple-600' : 'bg-teal-500'
                        }`}>
                        {badge}
                    </span>
                </div>
            )}

            <div className="p-6 flex-1">
                <h3 className="text-sm font-bold text-teal-600 uppercase tracking-wider mb-4">{name}</h3>

                <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-extrabold text-gray-900 tracking-tight">{price}</span>
                    <span className="ml-2 text-lg font-medium text-gray-500">{currency}</span>
                    <span className="ml-1 text-sm text-gray-400">{term}</span>
                </div>

                {/* Features List with Teal SVG */}
                <ul className="space-y-4 mb-8">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                            <div className="flex-shrink-0">
                                {/* Teal Check Icon */}
                                <svg className="h-5 w-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p className="ml-3 text-sm text-gray-600 leading-5">{feature}</p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Action Button */}
            <div className="p-6 bg-gray-50 rounded-b-2xl mt-auto">
                <button
                    onClick={onClick}
                    className={`w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-bold rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${isPopular
                        ? 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500 shadow-lg hover:shadow-xl'
                        : 'bg-teal-50 text-teal-700 hover:bg-teal-100 focus:ring-teal-500'
                        }`}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default PlanCard;