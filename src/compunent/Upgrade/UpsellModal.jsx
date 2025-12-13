import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const UpsellModal = ({ plan, onClose }) => {
    const router = useNavigate()
    const { t } = useTranslation("Account");

    const getDetails = () => {
        switch (plan) {
            case 'monthly':
                return {
                    offer: {
                        title: t("Double_Starter_Pack"),
                        price: "2,500",
                        term: t("2_Months"),
                        value: "2 m",
                        save: "1,300 DZD",
                        desc: t("Save_35%_by_grabbing_the_seasonal double_pack"),
                        tag: t("Recommended")
                    },
                    regular: {
                        title: t("Standard_Monthly"),
                        price: "1,900",
                        value: "1 m",
                        term: t("1_Month"),
                        desc: t("Pay_full_price_for_a_single_month")
                    },
                    scarcity: t("Seasonal_offer")
                };
            case 'quarterly':
                return {
                    offer: {
                        title: t("Quarterly_Plus"),
                        price: "4,900",
                        value: "4 m",
                        term: t("4_Months"),
                        save: t("1_Month_Free"),
                        desc: t("Get_1_extra_month_completely_free"),
                        tag: t("Best_Seller")
                    },
                    regular: {
                        title: t("Standard_Quarterly"),
                        price: "4,900",
                        value: "4 m",
                        term: t("3_Months"),
                        desc: t("Standard_3_months_access")
                    },
                    scarcity: t("Seasonal_offer")
                };
            case 'semi_annual':
                return {
                    offer: {
                        title: t("Yearly_Pro_Access"),
                        price: "9,000",
                        term: t("7_Months"),
                        value: "7 m",
                        save: t("Best_Value"),
                        desc: t("Get_7_months_for_the_price_of_6"),
                        tag: t("Rare_Deal")
                    },
                    regular: {
                        title: t("Standard_Semi-Annual"),
                        price: "9,000",
                        value: "6 m",
                        term: t("6_Months"),
                        desc: t("Standard_6_months_access")
                    },
                    scarcity: t("Seasonal_offer")
                };
            default:
                return null;
        }
    };

    const content = getDetails();
    if (!content) return null;

    // Handler for selection
    const handleSelect = (choiceType) => {
        console.log(plan.value);

        localStorage.setItem('selectedPlanOption', JSON.stringify({ plan, choiceType }));
        router('/checkout');

    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-gray-900/80 transition-opacity backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100 border border-gray-100">

                {/* 🔴 Scarcity Header */}
                <div className="bg-red-50 border-b border-red-100 px-4 py-2 text-center">
                    <p className="text-xs font-bold text-red-600 uppercase tracking-wider flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {content.scarcity}
                    </p>
                </div>

                {/* Close X */}
                <button
                    onClick={onClose}
                    className="absolute top-10 right-4 text-gray-300 hover:text-gray-500 z-10"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="p-6">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-900">{t("ChooseYourDeal")}</h3>
                        <p className="text-gray-500 text-sm mt-1">{t("Selectthebestoptionforyourbusiness")}</p>
                    </div>

                    <div className="space-y-4">

                        {/* ⭐ OPTION 1: THE MAGIC OFFER (Styled with Teal/Purple) */}
                        <div
                            onClick={() => handleSelect('offer')}
                            className="relative group cursor-pointer rounded-xl border-2 border-purple-500 bg-purple-50 p-1 shadow-lg transition-all hover:scale-[1.02] hover:shadow-purple-200"
                        >
                            {/* Recommended Badge */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-teal-500 to-purple-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
                                {content.offer.tag}
                            </div>

                            <div className="flex items-center justify-between rounded-lg bg-white/60 p-5">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-purple-900 text-lg">{content.offer.title}</h4>
                                        <span className="inline-block rounded bg-teal-100 px-2 py-0.5 text-[10px] font-bold text-teal-700 uppercase tracking-wide">
                                            {t("Save")} {content.offer.save}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm text-purple-700 font-medium">
                                        {content.offer.desc}
                                    </p>
                                </div>
                                <div className="text-right pl-4">
                                    <div className="text-2xl font-black text-purple-700">{content.offer.price}</div>
                                    <div className="text-xs font-bold text-teal-600 uppercase">{content.offer.term}</div>
                                </div>
                            </div>

                            {/* Visual Selection Indicator */}
                            <div className="absolute top-1/2 right-0 -mr-2 h-4 w-4 -translate-y-1/2 rotate-45 border-r-2 border-t-2 border-purple-500 bg-purple-50 opacity-0 group-hover:opacity-100"></div>
                        </div>


                        {/* ⚪ OPTION 2: THE REGULAR PLAN (Basic Styling) */}
                        <div
                            onClick={() => handleSelect('regular')}
                            className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-gray-300 hover:bg-gray-50"
                        >
                            <div className="flex items-center justify-between opacity-70 group-hover:opacity-100 transition-opacity">
                                <div>
                                    <h4 className="font-semibold text-gray-700">{content.regular.title}</h4>
                                    <p className="mt-1 text-sm text-gray-500">{content.regular.desc}</p>
                                </div>
                                <div className="text-right pl-4">
                                    <div className="text-xl font-bold text-gray-900">{content.regular.price}</div>
                                    <div className="text-xs text-gray-500 uppercase">{content.regular.term}</div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <p className="mt-6 text-center text-xs text-gray-400">
                        {t("You_can_upgrade_or_cancel_anytime_from_your_account_settings")}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UpsellModal;