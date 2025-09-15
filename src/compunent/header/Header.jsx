import { Globe, User, Menu } from 'lucide-react';
import { motion } from "motion/react";
import { Link } from 'react-router-dom';


export default function Header({ toggleHeader, openLanguagePanel,
    openAccountPanel }) {
    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="sticky top-0 left-0 z-50 w-full backdrop-blur-md bg-white/70 shadow-sm px-6 flex items-center justify-between"
        >
            <div
                className='flex items-center'
            >
                <Link to="/">
                    <img
                        src="/logo.png" // replace with your logo (FLEX)
                        alt="FLEX"
                        className="h-16 w-auto object-contain"
                    />
                </Link>
                <button
                    onClick={toggleHeader}
                    className={` flex md:hidden items-center justify-between px-4 py-2.5 rounded-lg cursor-pointer transition-all hover:bg-blue-50 hover:text-blue-600`}
                >
                    <Menu className="w-5 h-5 text-gray-700" />
                </button>
            </div>
            {/* Left side icons */}
            <div className="flex items-center gap-6">
                {/* User */}
                <button
                    onClick={openAccountPanel}
                    className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors">
                    <User className="w-5 h-5" />
                </button>

                {/* Language */}
                <button
                    onClick={openLanguagePanel}
                    className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors">
                    <Globe className="w-5 h-5" />
                    <span className="text-sm">english</span>
                </button>

            </div>

            {/* Right side logo */}

        </motion.header>
    );
}
