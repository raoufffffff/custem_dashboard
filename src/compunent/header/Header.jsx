import { Globe } from 'lucide-react';
import { motion } from "motion/react";
import { Link } from 'react-router-dom';
import { FaRegCircleUser } from "react-icons/fa6";
import { HiBars3BottomLeft } from 'react-icons/hi2';

export default function Header({ togelHeader }) {
    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="sticky top-0 left-0 z-50 w-full bg-white shadow-sm px-6 py-3 flex items-center justify-between"
        >
            <div
                className='flex items-center'
            >
                <Link to="/">
                    <img
                        src="/logo.png" // replace with your logo (FLEX)
                        alt="FLEX"
                        className="h-6 w-auto object-contain"
                    />
                </Link>
                <button
                    onClick={togelHeader}
                    className={` flex md:hidden items-center justify-between px-4 py-2.5 rounded-lg cursor-pointer transition-all hover:bg-blue-50 hover:text-blue-600`}
                >
                    <HiBars3BottomLeft className="w-5 h-5 text-gray-700" />
                </button>
            </div>
            {/* Left side icons */}
            <div className="flex items-center gap-6">
                {/* User */}
                <button className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors">
                    <FaRegCircleUser className="w-5 h-5" />
                </button>

                {/* Language */}
                <button className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors">
                    <Globe className="w-5 h-5" />
                    <span className="text-sm">english</span>
                </button>

            </div>

            {/* Right side logo */}

        </motion.header>
    );
}
