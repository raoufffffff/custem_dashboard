import { Globe, User, Menu, Crown } from 'lucide-react';
import { motion } from "motion/react";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';


export default function Header({ toggleHeader, openLanguagePanel,
    openAccountPanel, isPaid }) {
    const { i18n } = useTranslation("constanst");
    const currentLang = i18n.language; // detect active language

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="sticky top-0 left-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-gray-100 shadow-sm px-4 sm:px-6 h-20 flex items-center justify-between"
        >
            <div className='flex items-center gap-1'>
                {/* Mobile Menu Button */}
                <button
                    onClick={toggleHeader}
                    className={`flex md:hidden items-center justify-center p-2 rounded-lg cursor-pointer transition-all hover:bg-gray-100 text-gray-700`}
                >
                    <Menu className="w-6 h-6" />
                </button>

                {/* Logo */}
                <a href="/" className="flex items-center gap-2">
                    {/* Replaced img with a placeholder icon for the demo */}
                    <div className="h-16 w-16 rounded-xl flex items-center justify-center">
                        <img

                            src="/logo.png" // replace with your logo (FLEX)

                            alt="Next commerce"

                            className="h-16 w-auto object-contain"

                        />
                    </div>
                    <span className="text-xl font-bold text-gray-900 hidden sm:block">Next Commerce</span>
                </a>
            </div>

            {/* Right side icons */}
            <div className="flex items-center gap-4 sm:gap-6">
                <Link
                    to={'/upgrade'}
                    className=" items-center">
                    {isPaid ? (
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-teal-50 text-teal-700 rounded-full border border-teal-200 shadow-sm">
                            <Crown size={14} className="fill-teal-500 text-teal-600" />
                            <span className="text-xs font-bold tracking-wide">PRO</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-600 rounded-full border border-gray-200">
                            <span className="text-xs font-semibold">FREE</span>
                        </div>
                    )}
                </Link>

                {/* Language */}
                <button
                    onClick={openLanguagePanel}
                    className="flex items-center gap-1.5 text-gray-600 hover:text-blue-600 transition-colors px-2 py-1.5 rounded-md hover:bg-blue-50"
                >
                    <Globe className="w-5 h-5" />
                    <span className="text-sm font-medium uppercase">{currentLang === "ar" ? "AR" : currentLang === "fr" ? "FR" : "EN"}</span>
                </button>

                {/* User */}
                <button
                    onClick={openAccountPanel}
                    className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all border border-transparent hover:border-blue-100"
                >
                    <User className="w-5 h-5" />
                    {/* Optional: Add a notification dot or similar here if needed */}
                </button>
            </div>

        </motion.header>
    );
}
