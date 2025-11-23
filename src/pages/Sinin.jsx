import React, { useState } from "react";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { Loader2, Globe } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import Model from "../CustomUi/Model";
import LanguagePanel from "../compunent/App/LanguagePanel";

// This is the main component for the two-step sign-up page
const App = () => {
    const { t, i18n } = useTranslation("auth");
    const currentLang = i18n.language; // detect active language

    const [step, setStep] = useState(1);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [domain, setDomain] = useState("");
    const [storeName, setStoreName] = useState("");
    const [language, setLanguage] = useState("arabic");
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [domainAvailable, setDomainAvailable] = useState(null);
    const [loading, setLoading] = useState(false)
    const [Checkloading, setCheckLoading] = useState(false)
    const [showPanels, setshowPanels] = useState(false)

    const hide = () => setshowPanels(false)

    // Validation and move to next step
    const handleNextStep = async () => {
        setCheckLoading(true)
        if (!name || !phone || !email || !password || !confirmPassword) {
            toast.error(t("Please"), { style: { border: "1px solid #ef4444" } });
            return;
        }
        if (password !== confirmPassword) {
            toast.error(t("Passwords"), { style: { border: "1px solid #ef4444" } });
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error(t("Pleaseenteravalidemailaddress"), { style: { border: "1px solid #ef4444" } });
            return;
        }
        try {
            const response = await axios.post(`https://true-fit-dz-api.vercel.app/user/check/emailphone`, {
                phone: phone,
                email: email
            });

            if (response.data.available) {
                toast.success(t("emailandphone"), { style: { border: "1px solid #10b981" } });
                setStep(2);
            } else {
                toast.error(`${response.data.message} 😔`, { style: { border: "1px solid #ef4444" } });
            }
        } catch (error) {
            console.log(error);
            toast.error(t("Connection"), { style: { border: "1px solid #ef4444" } });
        } finally {
            setCheckLoading(false)
        }
    };

    // Function to check if the entered domain is available
    const checkDomainAvailability = async () => {
        // Only check if a domain has been entered and is not already known to be unavailable
        if (domain.trim() === "" || domainAvailable === false) {
            setDomainAvailable(null);
            return;
        }
        try {
            const response = await axios.put(`https://true-fit-dz-api.vercel.app/user/check/domain`, { name: `${domain}-nc` });
            setDomainAvailable(response.data.available);
            if (response.data.available) {
                toast.success(t("Domainisavailable"), { style: { border: "1px solid #10b981" } });
            } else {
                toast.error(t("Domainisnotavailable"), { style: { border: "1px solid #ef4444" } });
            }
        } catch {
            setDomainAvailable(false);
            toast.error(t("Connection"), { style: { border: "1px solid #ef4444" } });
        }
    };

    // Final registration and API call
    const handleFinalRegister = async () => {
        if (!domain || !storeName) {
            toast.error(t("Please"), { style: { border: "1px solid #ef4444" } });
            return;
        }
        if (!agreedToTerms) {
            toast.error(t("Youmustagreetothetermsandconditions"), { style: { border: "1px solid #ef4444" } });
            return;
        }
        if (domainAvailable === false) {
            toast.error(t("Pleasechooseanavailabledomain"), { style: { border: "1px solid #ef4444" } });
            return;
        }

        const body = {
            name,
            phone,
            email,
            password,
            repoName: domain,
            store_name: storeName,
            language,
        };
        setLoading(true)
        try {
            const res = await axios.post("https://next-website-server.vercel.app", body);
            // NOTE: The API endpoint must be updated on the server to handle the new fields (domain, storeName, language).
            if (res.data?.success || res.data?._id) {
                toast.success(t("Accountcreatedsuccessfully"));
                window.location.replace("/login");
            } else {
                toast.error(t("Anerroroccurredpleasechecktheinformation"), {
                    style: { border: "1px solid #ef4444" },
                });
            }
        } catch {
            toast.error(t("Connection"), {
                style: { border: "1px solid #ef4444" },
            });
        } finally {
            setLoading(false)
        }
    };

    // Dynamic class for the domain input field
    const domainInputClass = `w-full rounded-xl border px-6 py-3 text-gray-800 placeholder-gray-400 shadow-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500
    ${domainAvailable === false ? 'border-red-500 text-red-500 focus:ring-red-500' : 'border-gray-300 bg-white'}`;


    return (
        <div
            dir={currentLang === "ar" ? "rtl" : "ltr"}

            className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 py-8 text-gray-800 md:flex-row md:gap-16">
            <Toaster position="top-center" />
            <div
                className={`fixed top-5 z-[10000000] ${currentLang === "ar" ? "right-5" : "left-5"} `}
                onClick={() => setshowPanels(true)}
            >
                <Globe size={30} className="text-teal-600" />
            </div>
            {showPanels && <Model
                onclose={hide}
            >
                <LanguagePanel hide={hide} />
            </Model>}
            {/* Mascot Container - only visible on medium screens and up */}
            <motion.div
                className="hidden max-w-sm md:block"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <img
                    src="/logo.png"
                    alt="Next Commerce Logo"
                    className="shadow-2xl rounded-full"
                    style={{ boxShadow: "0 0 40px rgba(139, 92, 246, 0.5)" }}
                />
            </motion.div>

            {/* Container for the sign-up form */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl md:mt-0"
            >
                {/* The mascot image is now only visible on small screens */}
                <motion.img
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.5,
                    }}
                    src="/logo.png"
                    alt="Next Commerce Logo"
                    className="mx-auto w-24 h-24 -mt-16 mb-6 block rounded-full drop-shadow-lg md:hidden"
                    style={{ boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)" }}
                />

                {/* Step Indicator with Animations */}
                <div className="flex items-center justify-center mb-8">
                    <div className="flex flex-col items-center">
                        <motion.div
                            // Add a pulsing animation to the active step
                            animate={step === 1 ? { scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 1, repeat: Infinity }}
                            className={`w-8 h-8 flex items-center justify-center rounded-full font-bold transition-colors duration-500 ${step >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-500'}`}
                        >
                            1
                        </motion.div>
                        <span className="mt-2 text-xs font-semibold text-center w-24">{t("AccountDetails")}</span>
                    </div>
                    <div className="flex-1 h-1 bg-gray-300 mx-2 rounded-full relative">
                        <motion.div
                            className="absolute left-0 top-0 h-full bg-purple-600 rounded-full"
                            // The `animate` prop now combines the width animation with an infinite pulsing shadow
                            animate={step === 2 ? {
                                width: "100%",
                                boxShadow: ["0 0 8px #a78bfa", "0 0 16px #a78bfa", "0 0 8px #a78bfa"],
                            } : {
                                width: "0%",
                            }}
                            // The transition is split to handle the width fill and the pulsing glow separately
                            transition={{
                                width: { duration: 0.5 },
                                boxShadow: {
                                    duration: 1,
                                    repeat: Infinity,
                                    repeatType: "mirror",
                                    ease: "easeInOut",
                                },
                            }}
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        <motion.div
                            // Add a pulsing animation to the active step
                            animate={step === 2 ? { scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 1, repeat: Infinity }}
                            className={`w-8 h-8 flex items-center justify-center rounded-full font-bold transition-colors duration-500 ${step === 2 ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-500'}`}
                        >
                            2
                        </motion.div>
                        <span className="mt-2 text-xs font-semibold text-center w-24">{t("StoreDetails")}</span>
                    </div>
                </div>

                {step === 1 ? (
                    <>
                        <h2 className="mb-2 text-center text-3xl font-extrabold text-purple-600 drop-shadow-md">
                            {t("CreateNewAccount")}
                        </h2>
                        <p className="mb-8 text-center text-sm text-gray-500">
                            {t("Enteryourpersonaldetailstogetstarted")}
                        </p>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="text"
                            placeholder={t("FullName")}
                            className="w-full mb-3 rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-800 placeholder-gray-400 shadow-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="tel"
                            placeholder={t("PhoneNumber")}
                            className="w-full mb-3 rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-800 placeholder-gray-400 shadow-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="email"
                            placeholder={t("Emailaddress")}
                            className="w-full mb-3 rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-800 placeholder-gray-400 shadow-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="relative mb-3">
                            <motion.input
                                whileFocus={{ scale: 1.02 }}
                                type="password"
                                placeholder={t("Password")}
                                className="w-full rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-800 placeholder-gray-400 shadow-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="password"
                            placeholder={t("ConfirmPassword")}
                            className="w-full mb-6 rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-800 placeholder-gray-400 shadow-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleNextStep}
                            className="w-full rounded-xl bg-purple-600 py-3 font-semibold text-white shadow-lg transition duration-300 hover:bg-purple-700"
                        >
                            {Checkloading ? <Loader2 className="animate-spin h-8 w-8 mx-auto" /> : t('Continue')}

                        </motion.button>
                    </>
                ) : (
                    <>
                        <h2 className="mb-2 text-center text-3xl font-extrabold text-purple-600 drop-shadow-md">
                            {t("StoreDetails")}
                        </h2>
                        <p className="mb-8 text-center text-sm text-gray-500">
                            {t("Tellusaboutyournewwebsiteandstore")}
                        </p>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="text"
                            placeholder="Website Domain (e.g., my-store)"
                            className={domainInputClass}
                            value={domain}
                            onBlur={checkDomainAvailability}
                            onChange={(e) => {
                                const value = e.target.value;

                                // Allow only letters (no spaces, no numbers, no symbols)
                                if (/^[A-Za-z]*$/.test(value)) {
                                    setDomain(value.toLowerCase());
                                }
                            }}
                        />
                        <p className="text-sm text-gray-400 mb-3 mt-1">
                            {t("Yourfuturedomain")}:{" "}
                            <span className="font-mono text-purple-600">
                                {domain ? `${domain}-nc` : "your-domain-name-nc"}
                            </span>
                        </p>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="text"
                            placeholder={t("StoreName")}
                            className="w-full mb-3 rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-800 placeholder-gray-400 shadow-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            value={storeName}
                            onChange={(e) => setStoreName(e.target.value)}
                        />
                        <label className="text-gray-600 mb-2 block">{t("WebsiteLanguage")}</label>
                        <select
                            className="w-full mb-3 rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-800 shadow-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                        >
                            <option value="ar">{t("Arabic")}</option>
                            <option value="fr">{t("French")}</option>
                        </select>
                        <div className="mb-6 flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="terms"
                                className="form-checkbox text-purple-600 focus:ring-purple-500"
                                checked={agreedToTerms}
                                onChange={(e) => setAgreedToTerms(e.target.checked)}
                            />
                            <label htmlFor="terms" className="text-gray-500 text-sm">
                                {t("Iagreetothe")}{" "}
                                <Link to="/terms"
                                    target="_blank" className="text-teal-500 hover:underline">
                                    {t("TermsandConditions")}
                                </Link>
                            </label>
                        </div>
                        <div className="flex justify-between">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setStep(1)}
                                className="rounded-xl border border-purple-600 py-3 px-6 font-semibold text-purple-600 transition duration-300 hover:bg-purple-100"
                            >
                                {t("Back")}
                            </motion.button>
                            <motion.button
                                disabled={loading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleFinalRegister}
                                className="rounded-xl bg-purple-600 py-3 px-6 font-semibold text-white shadow-lg transition duration-300 hover:bg-purple-700"
                            >
                                {loading ? <Loader2 className="animate-spin h-8 w-8 mx-auto" /> : t('CreateAccount')}

                            </motion.button>
                        </div>
                    </>
                )}

                <div className="mt-8 text-center text-sm text-gray-500">
                    <span className="mt-2 block">
                        {t("Alreadyhaveanaccount")}{" "}
                        <Link
                            to="/login"
                            className="text-teal-500 transition hover:underline"
                        >
                            {t("Login")}
                        </Link>
                    </span>
                </div>
            </motion.div>
        </div>
    );
};

export default App;
