import React, { useState } from "react";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { Loader2, Globe } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import Model from "../CustomUi/Model";
import LanguagePanel from "../compunent/App/LanguagePanel";
import ReactPixel from 'react-facebook-pixel';
// This is the main component for the login page
const App = () => {
    const [loading, setLoading] = useState(false)
    const [showPanels, setshowPanels] = useState(false)
    const { t, i18n } = useTranslation("auth");
    const currentLang = i18n.language; // detect active language

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const hide = () => setshowPanels(false)

    const handleLogin = async () => {
        // Check if fields are empty
        if (!email || !password) {
            toast.error(t("Please"), {
                style: { border: "1px solid #ef4444" },
            });
            return;
        }
        setLoading(true)
        try {
            // Make the POST request to the API for the user role
            const res = await axios.post("https://true-fit-dz-api.vercel.app/user/auth", { email, password });

            // Handle successful login
            if (res.data?.result) {
                localStorage.setItem("user", JSON.stringify(res.data.result));
                toast.success(t("Loginmessage"));
                window.location.replace("/");
                handlePixalClick()
            } else {
                // Handle incorrect credentials
                toast.error(t("Incorrect"), {
                    style: { border: "1px solid #ef4444" },
                });
            }
        } catch (e) {
            // Handle server connection errors
            console.error(e);
            toast.error(t("Connection"), {
                style: { border: "1px solid #ef4444" },
            });
        } finally {
            setLoading(false)
        }
    };

    const handlePixalClick = () => {
        ReactPixel.track('StartTrial', {
            value: '0.00',
            currency: 'USD',
            predicted_ltv: '29.99' // Optional: Predicted Lifetime Value
        });
    };
    return (
        // The main container now uses flexbox.
        // It's a column on small screens and a row on medium screens and up.
        <div
            dir={currentLang === "ar" ? "rtl" : "ltr"}

            className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 py-8 text-gray-800 md:flex-row md:gap-16 ">
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
                    alt="Next Commerce Mascot"
                    className="rounded-full shadow-2xl"
                    style={{ boxShadow: "0 0 40px rgba(139, 92, 246, 0.5)" }}
                />
            </motion.div>

            {/* Container for the login form */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl mt-5 md:mt-0"
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
                    alt="Next Commerce Mascot"
                    className="mx-auto w-24 h-24 -mt-16 mb-6 block rounded-full drop-shadow-lg md:hidden"
                    style={{ boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)" }}
                />

                {/* Title of the login form */}
                <h2 className="mb-2 text-center text-4xl font-extrabold text-purple-600 drop-shadow-md">
                    {t("Login")}
                </h2>
                <p className="mb-8 text-center text-sm text-gray-500">
                    {t("Welcome")}
                </p>

                {/* Input fields */}
                <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="email"
                    placeholder={t("Emailaddress")}
                    className="w-full mb-4 rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-800 placeholder-gray-400 shadow-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="password"
                    placeholder={t("Password")}
                    className="w-full mb-6 rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-800 placeholder-gray-400 shadow-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* Login button with animation */}
                <motion.button
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogin}
                    className="w-full rounded-xl bg-purple-600 py-3 font-semibold text-white shadow-lg transition duration-300 hover:bg-purple-700"
                >
                    {loading ? <Loader2 className="animate-spin h-8 w-8 mx-auto" /> : t('Login')}

                </motion.button>

                {/* Links for password reset and sign up */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <Link
                        to="/forgot-password"
                        className="text-teal-500 transition hover:underline"
                    >
                        {t("Forgot")}
                    </Link>
                    <br />
                    <span className="mt-2 block">
                        {t("Dont")}{" "}
                        <Link
                            to="/sinin"
                            className="text-teal-500 transition hover:underline"
                        >
                            {t("Signup")}
                        </Link>
                    </span>
                </div>
            </motion.div>
        </div>
    );
};

export default App;
