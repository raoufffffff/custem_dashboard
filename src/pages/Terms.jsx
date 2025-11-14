import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

// The main component for the Terms and Conditions page
const App = () => {
    // Defines animation variants for the main container
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: 0.1,
                when: "beforeChildren",
                staggerChildren: 0.1,
            },
        },
    };

    // Defines animation variants for content sections
    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex justify-center">
            <motion.div
                className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-6 sm:p-10 lg:p-12 my-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header */}
                <motion.div variants={itemVariants} className="flex items-center justify-center mb-8 border-b pb-4">
                    <FileText className="w-8 h-8 text-purple-600 mr-3" />
                    <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight text-center">
                        Terms and Conditions
                    </h1>
                </motion.div>

                {/* Last Updated Date */}
                <motion.p variants={itemVariants} className="text-sm text-gray-500 mb-6 text-center">
                    Last Updated: November 14, 2025
                </motion.p>

                {/* Introduction */}
                <motion.section variants={itemVariants} className="mb-8">
                    <h2 className="text-2xl font-bold text-purple-600 mb-3">1. Acceptance of Terms</h2>
                    <p className="text-gray-700 leading-relaxed">
                        By accessing or using our services (the "Service"), you agree to be bound by these Terms and Conditions ("Terms"). If you disagree with any part of the terms, then you may not access the Service. These Terms apply to all visitors, users, and others who access or use the Service.
                    </p>
                </motion.section>

                {/* User Accounts */}
                <motion.section variants={itemVariants} className="mb-8">
                    <h2 className="text-2xl font-bold text-purple-600 mb-3">2. User Accounts</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                    </p>
                    <ul className="list-disc list-inside space-y-2 pl-4 text-gray-600">
                        <li>You are responsible for safeguarding the password that you use to access the Service.</li>
                        <li>You agree not to disclose your password to any third party.</li>
                        <li>You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</li>
                    </ul>
                </motion.section>

                {/* Intellectual Property */}
                <motion.section variants={itemVariants} className="mb-8">
                    <h2 className="text-2xl font-bold text-purple-600 mb-3">3. Intellectual Property</h2>
                    <p className="text-gray-700 leading-relaxed">
                        The Service and its original content, features, and functionality are and will remain the exclusive property of [Your Company Name] and its licensors. The Service is protected by copyright, trademark, and other laws of both the [Your Jurisdiction] and foreign countries. Our trademarks may not be used in connection with any product or service without the prior written consent of [Your Company Name].
                    </p>
                </motion.section>

                {/* Termination */}
                <motion.section variants={itemVariants} className="mb-8">
                    <h2 className="text-2xl font-bold text-purple-600 mb-3">4. Termination</h2>
                    <p className="text-gray-700 leading-relaxed">
                        We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
                    </p>
                </motion.section>

                {/* Governing Law */}
                <motion.section variants={itemVariants} className="mb-8">
                    <h2 className="text-2xl font-bold text-purple-600 mb-3">5. Governing Law</h2>
                    <p className="text-gray-700 leading-relaxed">
                        These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
                    </p>
                </motion.section>

                {/* Contact Information */}
                <motion.section variants={itemVariants} className="pt-4 border-t">
                    <h2 className="text-xl font-bold text-purple-600 mb-3">Contact Us</h2>
                    <p className="text-gray-700 leading-relaxed">
                        If you have any questions about these Terms, please contact us at <a href="mailto:next.commerce.help@gmail.com" className="text-teal-500 hover:text-teal-600 transition underline">next.commerce.help@gmail.com</a>.
                    </p>
                </motion.section>

                {/* Back to Home Link */}
                <motion.div variants={itemVariants} className="mt-10 text-center">
                    <motion.a
                        href="/"
                        className="inline-block rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition duration-300 hover:bg-purple-700"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Go Back to Home
                    </motion.a>
                </motion.div>

            </motion.div>
        </div>
    );
};

export default App;