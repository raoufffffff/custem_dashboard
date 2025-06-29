import { Home, User, Bell, Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from "motion/react"
import Sidebar from './Sidebar';
import { Link, useLocation } from 'react-router-dom';
import useUser from '../../hooks/useUser';
export default function Header() {
    const location = useLocation()
    const pageName = location.pathname.replace("/", "");
    const {
        website,
        AlartNotification,
        NotificationsCurrentNumber,
        setNotificationsToDefult
    } = useUser()
    const [backgroundStyle, setBackgroundStyle] = useState('bg-[#f0f2f5]');
    const [show, setshow] = useState(false)
    const hide = () => setshow(false)
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY === 0) {
                setBackgroundStyle('bg-[#f0f2f5]');
            } else {
                setBackgroundStyle('bg-white/90  backdrop-blur-xs shadow');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>

            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={`fixed w-full  md:w-11/12  top-5 left-[50%] -translate-x-[50%] px-6 py-4 md:px-4 md:py-2 rounded-2xl flex items-center justify-between transition-colors duration-300 z-50  ${backgroundStyle}`}
            >
                {/* Breadcrumb and title */}
                <div className="flex items-center  space-x-2">
                    <Link
                        to={'/'}
                    >
                        <Home className="text-gray-500 w-4 h-4" />
                    </Link>
                    <span className="text-sm text-gray-500">/</span>


                    <h1
                        className="text-lg capitalize text-blue-500 font-semibold ml-2"
                    >
                        {pageName == "" ? "DashBoard" : pageName}
                    </h1>
                </div>

                {/* Search and icons */}
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        placeholder="Search here"
                        className="hidden md:block px-4 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                    <User className="w-5 h-5 text-gray-700 hover:scale-110" />
                    <Link
                        onClick={setNotificationsToDefult}
                        className='relative'
                        to='/Notifications'
                    >
                        {AlartNotification && <span
                            className='absolute text-[6px] bg-red-700 text-white rounded-full py-0.5 px-1 -bottom-1.5 right-0'
                        >{NotificationsCurrentNumber}</span>}
                        <Bell className={`"w-5 h-5 ${AlartNotification ? "text-red-300" : "text-gray-700"} hover:scale-110"`} />
                    </Link>

                    <Menu
                        onClick={() => setshow(p => !p)}
                        className="w-5 h-5 text-gray-700  hover:scale-110" />
                </div>
            </motion.header>
            <AnimatePresence>

                {show && <Sidebar
                    setNotificationsToDefult={setNotificationsToDefult}
                    hide={hide}
                    website={website}
                    NotificationsCurrentNumber={NotificationsCurrentNumber}
                    AlartNotification={AlartNotification}
                />}
            </AnimatePresence>
        </>
    );
}
