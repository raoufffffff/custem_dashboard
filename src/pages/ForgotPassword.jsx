import React, { useState } from "react";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { Loader2, Mail, Lock, CheckCircle, Smartphone } from "lucide-react";

// The main component for the 3-Step Forgot Password page
const App = () => {
    // Step 1: Enter Email (Request Code)
    // Step 2: Enter Code (Verify Code)
    // Step 3: Enter New Password (Set Password)
    // Step 4: Success Confirmation
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [id, setid] = useState("");
    const [newPassword, setNewPassword] = useState("");

    // Internal state to hold the mock code for testing purposes
    // NOTE: This MUST be removed when connecting to a real backend.
    const [mockCode, setMockCode] = useState("");

    // --- Step 1: Request Code ---
    const handleRequestCode = async () => {
        if (!email || !email.includes('@') || !email.includes('.')) {
            toast.error("Please enter a valid email address.", {
                style: { border: "1px solid #ef4444" },
            });
            return;
        }

        setLoading(true);

        try {
            // Placeholder API endpoint for sending a code
            const apiUrl = "https://true-fit-dz-api.vercel.app/user/send-reset-code";

            // --- START Mock Success (Remove in production) ---
            const res = await axios.post(apiUrl, { email: email })
            toast.success(`Code sent to email!`);
            setMockCode(res.data.code)
            setid(res.data.id)
            setStep(2);
        } catch (e) {
            console.error(e.message);
            toast.error(`An error occurred during code request. Please try again. ${e.message}`, {
                style: { border: "1px solid #ef4444" },
            });
        } finally {
            setLoading(false);
        }
    };

    // --- Step 2: Verify Code ---
    const handleVerifyCode = async () => {

        try {
            if (code !== mockCode) {
                toast.error("The entered code is incorrect.");
                setLoading(false);
                return;
            }
            toast.success("Code verified! You can now set a new password. ✅");
            setStep(3); // Move to the new password step
        } catch (e) {
            console.error(e);
            toast.error("An error occurred during code verification. Please try again.", {
                style: { border: "1px solid #ef4444" },
            });
        } finally {
            setLoading(false);
        }
    };

    // --- Step 3: Set New Password ---
    const handleSetNewPassword = async () => {
        if (!newPassword || newPassword.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }

        setLoading(true);

        try {
            const apiUrl = `https://true-fit-dz-api.vercel.app/user/${id}`;

            // --- START Mock Success (Remove in production) ---
            await axios.put(apiUrl, { password: newPassword })
            toast.success("Password successfully reset! 🎉");
            setStep(4);
        } catch (e) {
            console.error(e);
            toast.error("An error occurred during password reset. Please try again.", {
                style: { border: "1px solid #ef4444" },
            });
        } finally {
            setLoading(false);
        }
    };

    const renderFormContent = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <h2 className="mb-2 text-center text-4xl font-extrabold text-purple-600 drop-shadow-md">
                            Step 1: Get Code
                        </h2>
                        <p className="mb-8 text-center text-sm text-gray-500">
                            Enter your email to receive a password reset code.
                        </p>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="email"
                            placeholder="Your email address"
                            className="w-full mb-6 rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-800 placeholder-gray-400 shadow-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />

                        <motion.button
                            disabled={loading}
                            whileHover={{ scale: loading ? 1 : 1.02 }}
                            whileTap={{ scale: loading ? 1 : 0.98 }}
                            onClick={handleRequestCode}
                            className={`w-full rounded-xl py-3 font-semibold text-white shadow-lg transition duration-300 
                                ${loading ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
                        >
                            {loading ? (
                                <Loader2 className="animate-spin h-6 w-6 mx-auto" />
                            ) : (
                                'Request Reset Code'
                            )}
                        </motion.button>
                    </>
                );

            case 2:
                return (
                    <>
                        <h2 className="mb-2 text-center text-4xl font-extrabold text-teal-600 drop-shadow-md">
                            Step 2: Verify Code
                        </h2>
                        <p className="mb-6 text-center text-sm text-gray-500">
                            Enter the 6-digit code sent to **{email}** to proceed.
                        </p>

                        {/* Code Input */}
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="text"
                            placeholder="Enter 6-digit Code"
                            className="w-full mb-6 rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-800 placeholder-gray-400 shadow-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            value={code}
                            onChange={(e) => setCode(e.target.value.substring(0, 6))}
                            disabled={loading}
                            maxLength={6}
                        />

                        {/* Verify Button */}
                        <motion.button
                            disabled={loading}
                            whileHover={{ scale: loading ? 1 : 1.02 }}
                            whileTap={{ scale: loading ? 1 : 0.98 }}
                            onClick={handleVerifyCode}
                            className={`w-full rounded-xl py-3 font-semibold text-white shadow-lg transition duration-300 
                                ${loading ? 'bg-teal-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'}`}
                        >
                            {loading ? (
                                <Loader2 className="animate-spin h-6 w-6 mx-auto" />
                            ) : (
                                'Verify Code'
                            )}
                        </motion.button>

                        <div className="mt-4 text-center">
                            <button
                                onClick={() => setStep(1)}
                                className="text-xs text-gray-500 hover:text-purple-500 transition hover:underline"
                                disabled={loading}
                            >
                                Not {email}? Change Email
                            </button>
                        </div>
                    </>
                );

            case 3:
                return (
                    <>
                        <h2 className="mb-2 text-center text-4xl font-extrabold text-indigo-600 drop-shadow-md">
                            Step 3: New Password
                        </h2>
                        <p className="mb-6 text-center text-sm text-gray-500">
                            Code verified successfully! Enter your new password below.
                        </p>

                        {/* New Password Input */}
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="password"
                            placeholder="New Password (min 6 chars)"
                            className="w-full mb-6 rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-800 placeholder-gray-400 shadow-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            disabled={loading}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleSetNewPassword();
                                }
                            }}
                        />

                        {/* Reset Button */}
                        <motion.button
                            disabled={loading}
                            whileHover={{ scale: loading ? 1 : 1.02 }}
                            whileTap={{ scale: loading ? 1 : 0.98 }}
                            onClick={handleSetNewPassword}
                            className={`w-full rounded-xl py-3 font-semibold text-white shadow-lg transition duration-300 
                                ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                        >
                            {loading ? (
                                <Loader2 className="animate-spin h-6 w-6 mx-auto" />
                            ) : (
                                'Set New Password'
                            )}
                        </motion.button>

                        <div className="mt-4 text-center">
                            <button
                                onClick={() => setStep(1)}
                                className="text-xs text-gray-500 hover:text-purple-500 transition hover:underline"
                                disabled={loading}
                            >
                                Need to restart?
                            </button>
                        </div>
                    </>
                );

            case 4:
                return (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-8 bg-green-50 text-center rounded-2xl border-4 border-green-300 text-green-700 shadow-inner"
                    >
                        <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
                        <p className="text-2xl font-bold mb-2">Success!</p>
                        <p className="text-md">Your password has been successfully updated. You can now log in with your new credentials.</p>
                        <motion.a
                            href="/login"
                            className="mt-6 inline-block rounded-xl bg-green-600 px-6 py-3 font-semibold text-white shadow-lg transition duration-300 hover:bg-green-700"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Go to Login
                        </motion.a>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-8 text-gray-800 md:flex-row md:gap-16">
            <Toaster position="top-center" />

            {/* Decorative Mascot/Illustration Container - only visible on medium screens and up */}
            <motion.div
                className="hidden max-w-sm md:block"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Placeholder Image - replace with your actual logo or illustration */}
                <img
                    src="https://placehold.co/400x400/8b5cf6/ffffff?text=Secure+Code"
                    alt="Secure Code Illustration Placeholder"
                    className="rounded-3xl shadow-2xl"
                    style={{ boxShadow: "0 0 40px rgba(139, 92, 246, 0.5)" }}
                />
            </motion.div>

            {/* Container for the Forgot Password Form */}
            <motion.div
                key={step} // Key change ensures step transition re-runs animations
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl mt-5 md:mt-0 min-h-[400px] flex flex-col justify-center"
            >
                {/* Dynamic Content Rendering */}
                {renderFormContent()}

                {/* Links for navigation (only visible on steps 1, 2, and 3) */}
                {(step >= 1 && step <= 3) && (
                    <div className="mt-8 text-center text-sm text-gray-500">
                        <a
                            href="/login"
                            className="text-purple-500 transition hover:underline"
                        >
                            &larr; Back to Login
                        </a>
                        <br />
                        <span className="mt-2 block">
                            Don't have an account?{" "}
                            <a
                                href="/signup"
                                className="text-teal-500 transition hover:underline"
                            >
                                Sign up
                            </a>
                        </span>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default App;