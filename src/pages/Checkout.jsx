import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useOutletContext } from 'react-router-dom';
import PageContainer from '../CustomUi/PageContainer';
import handleImageUpload from '../utility/UploadImages';
import InputImg from '../CustomUi/InputImg';
import UseOffer from '../hooks/useOffer';

const Checkout = () => {
    const { t } = useTranslation("Account");
    const { postOffer } = UseOffer()
    const navigate = useNavigate();
    const [uploading, setUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false); // State for the final send button
    const [showConfirmModal, setShowConfirmModal] = useState(false); // State for the popup

    // 1. Retrieve User Data
    const user = useOutletContext();

    const [userInpho, setUserInfo] = useState({
        userId: user.id || "",
        price: 0, // Will be updated from orderDetails
        OfferTypeValue: "",
        offerTitle: "",
        PaymentImage: "",
        userName: user?.name || "",
        status: "pending", // Default status
        date: new Date(),
    });

    const [planOption, setPlanOption] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);
    const [copiedField, setCopiedField] = useState(null);

    // Image Upload Logic
    const ImageUpload = async (event) => {
        setUploading(true);
        try {
            const res = await handleImageUpload(event);
            // Update state with image
            setUserInfo((prev) => ({ ...prev, PaymentImage: res }));
            // Open the confirmation popup
            setShowConfirmModal(true);
        } catch (err) {
            console.error('Upload error:', err);
        } finally {
            setUploading(false);
        }
    };

    // Final Send Action
    const handleSendPayment = async () => {
        setSubmitting(true);

        // Construct the final payload ensuring data is accurate based on selection
        const finalPayload = {
            ...userInpho,
            price: parseInt(orderDetails.price.replace(/,/g, '')), // Remove commas for number format
            OfferTypeValue: orderDetails.term,
            offerTitle: orderDetails.title,
            // PaymentImage is already in userInpho
        };

        try {
            console.log("Sending Payment Data:", finalPayload);

            // TODO: Add your API call here
            // await axios.post('/api/subscriptions', finalPayload);

            // Simulate API delay for UX
            const res = await postOffer(finalPayload);
            if (res) {
                navigate('/subscriptions');
            }
        } catch (error) {
            console.error("Error sending payment:", error);
        } finally {
            setSubmitting(false);
            setShowConfirmModal(false);
        }
    };

    // Payment Info
    const paymentInfo = {
        ccp: "41545126 Clé 06",
        rip: "00799999004154512631",
        name: "Kerbadj Abdelbari",
        phone: "213698320894"
    };

    // 2. Plan Details Logic
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
                    price: "4,900",
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

    // 3. Check Data on Load
    useEffect(() => {
        try {
            const savedData = JSON.parse(localStorage.getItem('selectedPlanOption'));
            if (!savedData || !savedData.plan) {
                navigate('/upgrade');
                return;
            }
            setPlanOption(savedData);
            setUserInfo((prev) => ({ ...prev, price: savedData.price || 0, offerTitle: savedData.plan || "", OfferTypeValue: savedData.choiceType || "" }));
            const details = getPlanDetails(savedData.plan, savedData.choiceType);
            setOrderDetails(details);
        } catch (error) {
            console.error("Error parsing plan data", error);
            navigate('/upgrade');
        }
    }, [navigate, t]);

    const handleCopy = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    if (!orderDetails) return null;

    return (
        <PageContainer
            titel={t('checkout')}
            about={t("Secure_your_plan_via_CCP_or_Baridimob_transfer")}
        >
            <div className="max-w-6xl mx-auto px-4 py-8 relative">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* ---------------- LEFT COLUMN ---------------- */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* CCP Details Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-purple-100 overflow-hidden">
                            <div className="bg-purple-50 px-6 py-4 border-b border-purple-100 flex justify-between items-center">
                                <h3 className="font-bold text-purple-900 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                    {t("Payment_Information_(CCP / Baridimob)")}
                                </h3>
                                <span className="px-3 py-1 bg-white text-teal-600 text-xs font-bold rounded-full border border-teal-100 shadow-sm">
                                    {t("Manual_Verification")}
                                </span>
                            </div>

                            <div className="p-6 space-y-6">
                                <p className="text-sm text-gray-600">
                                    {t("Please_transfer_the_total_amount_to_the_account_below_using_Algérie_Poste_or_Baridimob_app")}
                                </p>

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

                                <div className="text-center">
                                    <span className="text-xs text-gray-400">{t("Account_Holder_Name")}: </span>
                                    <span className="font-bold text-gray-700">{paymentInfo.name}</span>
                                </div>
                            </div>
                        </div>

                        {/* Proof of Payment Section */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {t("Confirm_Your_Payment")}
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Option A: WhatsApp */}
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

                                {/* Option B: Upload File (Triggers Modal) */}
                                <div className="flex flex-col items-center justify-center border-gray-300 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all cursor-pointer">
                                    <InputImg className={"w-full min-h-full"} label={t("Upload_Screenshot")} uploading={uploading} ImageUpload={ImageUpload} />
                                    <input type="file" className="hidden" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ---------------- RIGHT COLUMN ---------------- */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 sticky top-8 overflow-hidden">
                            <div className="bg-gray-900 text-white p-5 text-center">
                                <h4 className="text-lg font-bold">{t("Order_Summary")}</h4>
                                <p className="text-xs text-gray-400 mt-1">{t("ID")}: #{Math.floor(Math.random() * 100000)}</p>
                            </div>

                            <div className="p-6">
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

                                <div className="border-t border-dashed border-gray-200 my-4"></div>

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

                                <div className="mt-6 bg-purple-50 rounded-xl p-4 flex justify-between items-center border border-purple-100">
                                    <span className="text-sm font-bold text-purple-900">{t("Total_to_Pay")}</span>
                                    <span className="text-2xl font-black text-purple-700">{orderDetails.price} <span className="text-xs font-normal text-gray-500">DZD</span></span>
                                </div>
                            </div>

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

            {/* --- Confirmation Modal --- */}
            {showConfirmModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all animate-scale-in">
                        <div className="p-6 text-center">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {t("Receipt Uploaded Successfully!")}
                            </h3>
                            <p className="text-sm text-gray-500 mb-6">
                                {t("We have received your payment proof. Click send to finalize your subscription request.")}
                            </p>

                            {/* Image Preview (Optional) */}
                            {userInpho.PaymentImage && (
                                <div className="mb-6 rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
                                    <img
                                        src={userInpho.PaymentImage}
                                        alt="Receipt Preview"
                                        className="w-full h-32 object-contain py-2"
                                    />
                                </div>
                            )}

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowConfirmModal(false)}
                                    className="flex-1 px-4 py-2.5 bg-white text-gray-700 font-medium border border-gray-300 rounded-xl hover:bg-gray-50 focus:outline-none transition-colors"
                                    disabled={submitting}
                                >
                                    {t("Cancel")}
                                </button>
                                <button
                                    onClick={handleSendPayment}
                                    disabled={submitting}
                                    className="flex-1 px-4 py-2.5 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 shadow-lg shadow-purple-200 focus:outline-none transition-all flex items-center justify-center gap-2"
                                >
                                    {submitting ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            {t("Sending...")}
                                        </>
                                    ) : (
                                        <>
                                            {t("Send & Finish")}
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </PageContainer>
    );
}

export default Checkout;