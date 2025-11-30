import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'; // Assuming react-router-dom v6
import PageContainer from '../CustomUi/PageContainer';

const Checkout = () => {
    const { t } = useTranslation("Account");
    const navigate = useNavigate();

    // 1. استرجاع البيانات من التخزين المحلي
    const [planOption, setPlanOption] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);
    const [copiedField, setCopiedField] = useState(null); // لتتبع الحقل الذي تم نسخه

    // بيانات CCP الخاصة بك (استبدل هذه بالبيانات الحقيقية)
    // بيانات الدفع الحقيقية (تم التحديث)
    const paymentInfo = {
        ccp: "41545126 Clé 06",
        rip: "00799999004154512631",
        name: "Kerbadj Abdelbari",
        phone: "213776966468"
    };

    // 2. منطق إعادة بناء تفاصيل الخطة (نفس المنطق من المودال لضمان تطابق السعر)
    const getPlanDetails = (plan, choiceType) => {
        const isOffer = choiceType === 'offer';

        switch (plan) {
            case 'monthly':
                return {
                    title: isOffer ? t("Double_Starter_Pack") : t("Standard_Monthly"),
                    price: isOffer ? "2,500" : "1,900",
                    term: isOffer ? t("2_Months") : t("1_Month"),
                    savings: isOffer ? "1,300 DZD" : null,
                    desc: isOffer ? t("Special_Seasonal_Offer") : t("Regular_Monthly_Plan")
                };
            case 'quarterly':
                return {
                    title: isOffer ? t("Quarterly_Plus") : t("Standard_Quarterly"),
                    price: "4,900", // السعر ثابت في الحالتين لكن المدة تزيد
                    term: isOffer ? t("4_Months") : t("3_Months"),
                    savings: isOffer ? t("1_Month_Free") : null,
                    desc: isOffer ? t("Limited_Time_Upgrade") : t("Regular_Quarterly_Plan")
                };
            case 'semi_annual':
                return {
                    title: isOffer ? t("Yearly_Pro_Access") : t("Standard_Semi-Annual"),
                    price: "9,000",
                    term: isOffer ? t("7_Months") : t("6_Months"),
                    savings: isOffer ? t("Best_Value") : null,
                    desc: isOffer ? t("VIP_Deal") : t("Regular_6_Months_Plan")
                };
            default:
                return null;
        }
    };

    // 3. التحقق من البيانات عند التحميل
    useEffect(() => {
        try {
            const savedData = JSON.parse(localStorage.getItem('selectedPlanOption'));
            if (!savedData || !savedData.plan) {
                // إذا لم توجد بيانات، أعده لصفحة العروض
                navigate('/upgrade');
                return;
            }
            setPlanOption(savedData);

            // توليد التفاصيل النهائية للعرض
            const details = getPlanDetails(savedData.plan, savedData.choiceType);
            setOrderDetails(details);

        } catch (error) {
            console.error("Error parsing plan data", error);
            navigate('/upgrade');
        }
    }, [navigate, t]);

    // دالة النسخ
    const handleCopy = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000); // إعادة تعيين بعد ثانيتين
    };

    if (!orderDetails) return null; // أو عرض Loading spinner

    return (
        <PageContainer
            titel={t('checkout')}
            about={t("Secure_your_plan_via_CCP_or_Baridimob_transfer")}
        >
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* ---------------- LEFT COLUMN: PAYMENT INSTRUCTIONS (2/3 width) ---------------- */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* 1. CCP Details Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-purple-100 overflow-hidden">
                            <div className="bg-purple-50 px-6 py-4 border-b border-purple-100 flex justify-between items-center">
                                <h3 className="font-bold text-purple-900 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                    {t("Payment_Information_(CCP / Baridimob)")}
                                </h3>
                                {/* Trust Badge */}
                                <span className="px-3 py-1 bg-white text-teal-600 text-xs font-bold rounded-full border border-teal-100 shadow-sm">
                                    {t("Manual_Verification")}
                                </span>
                            </div>

                            <div className="p-6 space-y-6">
                                <p className="text-sm text-gray-600">
                                    {t("Please_transfer_the_total_amount_to_the_account_below_using_Algérie_Poste_or_Baridimob_app")}
                                </p>

                                {/* CCP & RIP Boxes */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* CCP Box */}
                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative group hover:border-purple-300 transition-colors">
                                        <span className="text-xs font-bold text-gray-400 uppercase">{t("CCP_Number")}</span>
                                        <div className="text-lg font-mono font-bold text-gray-800 mt-1 tracking-wider">{paymentInfo.ccp}</div>
                                        <button
                                            onClick={() => handleCopy(paymentInfo.ccp, 'ccp')}
                                            className="absolute top-4 right-4 text-purple-600 hover:text-purple-800"
                                        >
                                            {copiedField === 'ccp' ? (
                                                <span className="text-xs font-bold text-teal-500 flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                    {t("Copied")}
                                                </span>
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                            )}
                                        </button>
                                    </div>

                                    {/* RIP Box */}
                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative group hover:border-purple-300 transition-colors">
                                        <span className="text-xs font-bold text-gray-400 uppercase">{t("RIP_Number_(For Bank Transfer)")}</span>
                                        <div className="text-sm font-mono font-bold text-gray-800 mt-2 break-all">{paymentInfo.rip}</div>
                                        <button
                                            onClick={() => handleCopy(paymentInfo.rip, 'rip')}
                                            className="absolute top-4 right-4 text-purple-600 hover:text-purple-800"
                                        >
                                            {copiedField === 'rip' ? (
                                                <span className="text-xs font-bold text-teal-500 flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                    {t("Copied")}
                                                </span>
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Account Name */}
                                <div className="text-center">
                                    <span className="text-xs text-gray-400">{t("Account_Holder_Name")}: </span>
                                    <span className="font-bold text-gray-700">{paymentInfo.name}</span>
                                </div>
                            </div>
                        </div>

                        {/* 2. Proof of Payment Section */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {t("Confirm_Your_Payment")}
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Option A: WhatsApp (Preferred in DZ) */}
                                <a
                                    href={`https://wa.me/${paymentInfo.phone}?text=${encodeURIComponent(`Hello, I paid ${orderDetails.price} DZD for the ${orderDetails.title}. Here is the receipt.`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-green-200 rounded-xl bg-green-50 hover:bg-green-100 transition-all cursor-pointer group"
                                >
                                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white mb-3 shadow-lg group-hover:scale-110 transition-transform">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
                                    </div>
                                    <span className="font-bold text-gray-800">{t("Send Receipt_via_WhatsApp")}</span>
                                    <span className="text-xs text-gray-500 mt-1 text-center">{t("Fastest_activation_(Recommended)")}</span>
                                </a>

                                {/* Option B: Upload File (Traditional) */}
                                <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all cursor-pointer">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-3">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                    </div>
                                    <span className="font-bold text-gray-700">{t("Upload_Screenshot")}</span>
                                    <span className="text-xs text-gray-400 mt-1">{t("JPG, PNG or PDF")}</span>
                                    <input type="file" className="hidden" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ---------------- RIGHT COLUMN: ORDER SUMMARY (1/3 width) ---------------- */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 sticky top-8 overflow-hidden">
                            {/* Header */}
                            <div className="bg-gray-900 text-white p-5 text-center">
                                <h4 className="text-lg font-bold">{t("Order_Summary")}</h4>
                                <p className="text-xs text-gray-400 mt-1">{t("ID")}: #{Math.floor(Math.random() * 100000)}</p>
                            </div>

                            <div className="p-6">
                                {/* Plan Title */}
                                <div className="mb-6 text-center">
                                    <p className="text-sm text-gray-500 mb-1">{t("SelectedPlan")}</p>
                                    <h2 className="text-xl font-extrabold text-purple-700 leading-tight">
                                        {orderDetails.title}
                                    </h2>
                                    {orderDetails.savings && (
                                        <span className="inline-block mt-2 px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded-full border border-teal-100">
                                            {t("You_Saved")} {orderDetails.savings}
                                        </span>
                                    )}
                                </div>

                                {/* Divider */}
                                <div className="border-t border-dashed border-gray-200 my-4"></div>

                                {/* Price Details */}
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>{t("Billing_Cycle")}</span>
                                        <span className="font-medium text-gray-900">{orderDetails.term}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>{t("Features")}</span>
                                        <span className="font-medium text-gray-900">{t("All_Premium_Features")}</span>
                                    </div>
                                </div>

                                {/* Total Price */}
                                <div className="mt-6 bg-purple-50 rounded-xl p-4 flex justify-between items-center border border-purple-100">
                                    <span className="text-sm font-bold text-purple-900">{t("Total_to_Pay")}</span>
                                    <span className="text-2xl font-black text-purple-700">{orderDetails.price} <span className="text-xs font-normal text-gray-500">DZD</span></span>
                                </div>

                                {/* Urgency Timer (Fake) */}

                            </div>

                            {/* Footer / Guarantee */}
                            <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
                                <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                                    <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                    {t("Secure_Payment_&_Fast_Activation")}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </PageContainer>
    );
}

export default Checkout;