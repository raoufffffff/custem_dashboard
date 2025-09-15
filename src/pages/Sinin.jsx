import React, { useState } from "react";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { Loader2 } from "lucide-react";

// This is the main component for the two-step sign-up page
const App = () => {
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
const [Loading, setLoading] = useState(false)

    // Validation and move to next step
    const handleNextStep = () => {
        if (!name || !phone || !email || !password || !confirmPassword) {
            toast.error("Please fill in all fields", { style: { border: "1px solid #ef4444" } });
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match", { style: { border: "1px solid #ef4444" } });
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address", { style: { border: "1px solid #ef4444" } });
            return;
        }
        setStep(2);
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
                toast.success("Domain is available! ✅", { style: { border: "1px solid #10b981" } });
            } else {
                toast.error("Domain is not available. 😔", { style: { border: "1px solid #ef4444" } });
            }
        } catch {
            setDomainAvailable(false);
            toast.error("Connection to domain check failed.", { style: { border: "1px solid #ef4444" } });
        }
    };

    // Final registration and API call
    const handleFinalRegister = async () => {
        if (!domain || !storeName) {
            toast.error("Please fill in all fields", { style: { border: "1px solid #ef4444" } });
            return;
        }
        if (!agreedToTerms) {
            toast.error("You must agree to the terms and conditions", { style: { border: "1px solid #ef4444" } });
            return;
        }
        if (domainAvailable === false) {
            toast.error("Please choose an available domain.", { style: { border: "1px solid #ef4444" } });
            return;
        }

        const body = {
            name,
            phone,
            email,
            password,
            repoName: domain,
            storeName,
            language,
        };
setLoading(true)
        try {
            const res = await axios.post("https://next-website-server.vercel.app", body);
            // NOTE: The API endpoint must be updated on the server to handle the new fields (domain, storeName, language).
            if (res.data?.success || res.data?._id) {
                toast.success("Account created successfully ✅");
                window.location.replace("/login");
            } else {
                toast.error("An error occurred, please check the information.", {
                    style: { border: "1px solid #ef4444" },
                });
            }
        } catch {
            toast.error("Connection to server failed.", {
                style: { border: "1px solid #ef4444" },
            });
        }finally{
            setLoading(false)
        }
    };

    // Dynamic class for the domain input field
    const domainInputClass = `w-full rounded-xl border px-6 py-3 text-gray-800 placeholder-gray-400 shadow-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500
    ${domainAvailable === false ? 'border-red-500 text-red-500 focus:ring-red-500' : 'border-gray-300 bg-white'}`;


    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 py-8 text-gray-800 md:flex-row md:gap-16">
            <Toaster position="top-center" />

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
                    src="https://storage.googleapis.com/gcn-files/NF3fP5WHYqDNWWx37B_5e-1721729360528.jpg"
                    alt="Next Commerce Logo"
                    className="mx-auto -mt-24 mb-6 block rounded-full drop-shadow-lg md:hidden"
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
                        <span className="mt-2 text-xs font-semibold text-center w-24">Account Details</span>
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
                        <span className="mt-2 text-xs font-semibold text-center w-24">Store Details</span>
                    </div>
                </div>

                {step === 1 ? (
                    <>
                        <h2 className="mb-2 text-center text-3xl font-extrabold text-purple-600 drop-shadow-md">
                            Create New Account
                        </h2>
                        <p className="mb-8 text-center text-sm text-gray-500">
                            Enter your personal details to get started.
                        </p>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="text"
                            placeholder="Full Name"
                            className="w-full mb-3 rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-800 placeholder-gray-400 shadow-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="tel"
                            placeholder="Phone Number"
                            className="w-full mb-3 rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-800 placeholder-gray-400 shadow-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="email"
                            placeholder="Email Address"
                            className="w-full mb-3 rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-800 placeholder-gray-400 shadow-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="relative mb-3">
                            <motion.input
                                whileFocus={{ scale: 1.02 }}
                                type="password"
                                placeholder="Password"
                                className="w-full rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-800 placeholder-gray-400 shadow-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="password"
                            placeholder="Confirm Password"
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
                            Continue
                        </motion.button>
                    </>
                ) : (
                    <>
                        <h2 className="mb-2 text-center text-3xl font-extrabold text-purple-600 drop-shadow-md">
                            Store Details
                        </h2>
                        <p className="mb-8 text-center text-sm text-gray-500">
                            Tell us about your new website and store.
                        </p>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="text"
                            placeholder="Website Domain (e.g., my-store)"
                            className={domainInputClass}
                            value={domain}
                            onBlur={checkDomainAvailability}
                            onChange={(e) => setDomain(e.target.value.toLowerCase())}
                        />
                        <p className="text-sm text-gray-400 mb-3 mt-1">
                            Your future domain:{" "}
                            <span className="font-mono text-purple-600">
                                {domain ? `${domain}-nc` : "your-domain-name-nc"}
                            </span>
                        </p>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="text"
                            placeholder="Store Name"
                            className="w-full mb-3 rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-800 placeholder-gray-400 shadow-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            value={storeName}
                            onChange={(e) => setStoreName(e.target.value)}
                        />
                        <label className="text-gray-600 mb-2 block">Website Language</label>
                        <select
                            className="w-full mb-3 rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-800 shadow-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                        >
                            <option value="arabic">Arabic</option>
                            <option value="french">French</option>
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
                                I agree to the{" "}
                                <a href="/terms" className="text-teal-500 hover:underline" onClick={(e) => e.preventDefault()}>
                                    Terms and Conditions
                                </a>
                            </label>
                        </div>
                        <div className="flex justify-between">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setStep(1)}
                                className="rounded-xl border border-purple-600 py-3 px-6 font-semibold text-purple-600 transition duration-300 hover:bg-purple-100"
                            >
                                Back
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleFinalRegister}
                                className="rounded-xl bg-purple-600 py-3 px-6 font-semibold text-white shadow-lg transition duration-300 hover:bg-purple-700"
                            >
                                 { Loading ?  <Loader2 className="mx-auto animate-spin h-8 w-8 " /> :"Create Account"}
                               
                            </motion.button>
                        </div>
                    </>
                )}

                <div className="mt-8 text-center text-sm text-gray-500">
                    <span className="mt-2 block">
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="text-teal-500 transition hover:underline"
                        >
                            Login
                        </a>
                    </span>
                </div>
            </motion.div>
        </div>
    );
};

export default App;
