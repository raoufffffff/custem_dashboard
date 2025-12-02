import {
    Home, Store, Box, Tag, Layers, Truck, Megaphone,
    ChevronDown, Eye, Zap
} from 'lucide-react';
import { FaFacebook, FaTiktok } from "react-icons/fa";
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from 'react';
import { HiBars3BottomLeft } from "react-icons/hi2";
import { useTranslation } from 'react-i18next';
import { FaSheetPlastic } from "react-icons/fa6";
import { IoIosMore } from "react-icons/io";
import UpgradBanner from './UpgradBanner';

export default function Sidebar({ SemalHarder, toggleHeader, name, link, isPaid, orders }) {
    const { i18n, t } = useTranslation("constanst");
    const currentLang = i18n.language;
    const location = useLocation();

    const [show, setShow] = useState({
        store: false,
        orders: false,
        products: false,
        categories: false,
        delivery: false,
        marketing: false,
        more: false,
    });

    useEffect(() => {
        const path = location.pathname;
        if (path.includes('/orders')) setShow(s => ({ ...s, orders: true }));
        if (path.includes('/items') || path.includes('/additems')) setShow(s => ({ ...s, products: true }));
    }, [location.pathname]);

    const handleToggle = (key) => {
        // If sidebar is mini (SemalHarder is true), allow opening dropdowns but maybe expand sidebar first?
        // For now, we assume user clicks expand button to see details, or we just toggle.
        setShow({ ...show, [key]: !show[key] });
    };

    return (
        <motion.aside
            initial={{ x: currentLang === "ar" ? 1000 : -1000 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`
                fixed top-0 z-[500] h-full flex flex-col
                ${currentLang === "ar" ? "right-0 border-l" : "left-0 border-r"}
                bg-white/95 backdrop-blur-xl border-gray-100 shadow-2xl
                transition-all duration-300 ease-in-out overflow-hidden
                
                ${/* --- RESPONSIVE WIDTH LOGIC --- */ ""}
                ${SemalHarder
                    ? "w-0 md:w-[80px]"  // Mobile: Hidden (0px) | Desktop: Mini (80px)
                    : "w-[85%] md:w-[280px]" // Mobile: Open (85%) | Desktop: Full (280px)
                }
            `}
        >
            {/* --- Header Section --- */}
            <div className={`flex items-center ${SemalHarder ? "justify-center px-0" : "justify-between px-5"} py-6 transition-all shrink-0`}>
                {!SemalHarder && (
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="font-black text-2xl bg-gradient-to-r from-teal-500 to-purple-600 bg-clip-text text-transparent truncate"
                    >
                        {name || "NextStore"}
                    </motion.h1>
                )}

                {/* Close Button (Mobile Only) / Toggle Button (Desktop) */}
                <button
                    onClick={toggleHeader}
                    className="p-2 rounded-xl text-gray-500 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                >
                    <HiBars3BottomLeft className="w-6 h-6" />
                </button>
            </div>

            {/* --- Visit Website Button --- */}
            <div className={`mb-4 shrink-0 transition-all ${SemalHarder ? 'px-2 flex justify-center' : 'px-4'}`}>
                <a
                    href={`https://${link}`}
                    target="_blank"
                    rel="noreferrer"
                    className={`
                        group flex items-center justify-center rounded-xl transition-all duration-300 shadow-sm border
                        ${SemalHarder
                            ? "w-10 h-10 bg-white border-gray-200 text-teal-600 hover:bg-teal-50"
                            : "gap-3 px-4 py-3 bg-gradient-to-r from-teal-500 to-purple-600 text-white border-transparent hover:shadow-lg hover:shadow-purple-200 hover:-translate-y-0.5"
                        }
                    `}
                >
                    <Eye className="w-5 h-5 flex-shrink-0" />
                    {!SemalHarder && <span className="font-bold text-sm tracking-wide">{t("yourWebsite")}</span>}
                </a>
            </div>

            {/* --- Navigation Scroll Area --- */}
            <nav className={`flex-1 overflow-y-auto pb-4 space-y-1 scrollbar-hide ${SemalHarder ? "px-2" : "px-4"}`}>

                <SectionLabel label={t("Dashboard")} collapsed={SemalHarder} />
                <NavItem
                    onClick={toggleHeader}
                    icon={<Home className="w-5 h-5" />} label={t("Home")} to="/" collapsed={SemalHarder} />

                <SectionLabel label={t("Management")} collapsed={SemalHarder} />

                <Dropdown label={t("Store")} icon={<Store className="w-5 h-5" />} open={show.store} toggle={() => handleToggle('store')} collapsed={SemalHarder} active={location.pathname.includes('/update')}>
                    <NavItem
                        onClick={toggleHeader}
                        side label={t("Logo")} to="/update/logo" />
                    <NavItem
                        onClick={toggleHeader}
                        side label={t("Theme")} to="/update/theme" />
                    <NavItem
                        onClick={toggleHeader}
                        side label={t("Contactinformation")} to="/update/Contact-information" />
                    <NavItem
                        onClick={toggleHeader}
                        side label={t("Faqspage")} to="/update/faqs" />
                    <NavItem
                        onClick={toggleHeader}
                        side label={t("Storesettings")} to="/update/settings" />
                </Dropdown>

                <Dropdown label={t("Orders")} icon={<Box className="w-5 h-5" />} open={show.orders} toggle={() => handleToggle('orders')} collapsed={SemalHarder} active={location.pathname.includes('/orders')}>
                    <NavItem
                        onClick={toggleHeader}
                        side label={t("AllOrders")} to="/orders" />
                </Dropdown>

                <Dropdown label={t("Products")} icon={<Tag className="w-5 h-5" />} open={show.products} toggle={() => handleToggle('products')} collapsed={SemalHarder} active={location.pathname.includes('/items')}>
                    <NavItem
                        onClick={toggleHeader}
                        side label={t("Products")} to="/items" />
                    <NavItem
                        onClick={toggleHeader}
                        side label={t("AddProducts")} to="/additems" hot />
                </Dropdown>

                <Dropdown label={t("Categories")} icon={<Layers className="w-5 h-5" />} open={show.categories} toggle={() => handleToggle('categories')} collapsed={SemalHarder} active={location.pathname.includes('/Categories')}>
                    <NavItem
                        onClick={toggleHeader}
                        side label={t("Categories")} to="/Categories" />
                    <NavItem
                        onClick={toggleHeader}
                        side label={t("AddCategories")} to="/AddCategories" />
                </Dropdown>

                <Dropdown label={t("Delivery")} icon={<Truck className="w-5 h-5" />} open={show.delivery} toggle={() => handleToggle('delivery')} collapsed={SemalHarder} active={location.pathname.includes('/Liv')}>
                    <NavItem
                        onClick={toggleHeader}
                        side label={t("DeliveryCompanies")} to="/LivCompany" />
                    <NavItem
                        onClick={toggleHeader}
                        side label={t("DeliveryPrices")} to="/LivrisionPrice" />
                </Dropdown>

                <SectionLabel label={t("Growth")} collapsed={SemalHarder} />

                <Dropdown label={t("marketingTools")} icon={<Megaphone className="w-5 h-5" />} open={show.marketing} toggle={() => handleToggle('marketing')} collapsed={SemalHarder} active={location.pathname.includes('Pixel')}>
                    <NavItem
                        onClick={toggleHeader}
                        side icon={<FaFacebook className="w-4 h-4 text-blue-600" />} label={t("facebookPixals")} to="/AddFacebookPixel" />
                    <NavItem
                        onClick={toggleHeader}
                        side icon={<FaTiktok className="w-4 h-4 text-black" />} label={t("TiktokPixals")} to="/AddTiktokPixel" />
                </Dropdown>

                <Dropdown label={t("others")} icon={<IoIosMore className="w-5 h-5" />} open={show.more} toggle={() => handleToggle('more')} collapsed={SemalHarder}>
                    <NavItem
                        onClick={toggleHeader}
                        side icon={<FaSheetPlastic className="w-4 h-4 text-green-600" />} label={t("googlesheet")} to="/sheet" />
                </Dropdown>

            </nav>
            {/* upgrade banner */}
            {!SemalHarder && (
                <UpgradBanner
                    isPaid={isPaid}
                    orders={orders}
                    toggleHeader={toggleHeader} />
            )}

            {/* --- User/Profile Footer --- */}
            {!SemalHarder && (
                <div className="p-4 border-t border-gray-100 bg-gray-50/80 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-teal-400 to-purple-500 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white">
                            {name ? name.charAt(0).toUpperCase() : "A"}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold text-gray-700 truncate">{name}</p>
                            <p className="text-xs text-gray-500 truncate">{t("StoreOwner")}</p>
                        </div>
                    </div>
                </div>
            )}
        </motion.aside>
    );
}

/* --- Helper Components (Same as before) --- */

function SectionLabel({ label, collapsed }) {
    if (collapsed) return <div className="h-4" />;
    return (
        <div className="px-4 mt-6 mb-2">
            <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">{label}</p>
        </div>
    );
}

function NavItem({ icon, label, to, side, hot, collapsed, onClick }) {
    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) =>
                `relative flex items-center transition-all duration-200 group my-0.5 rounded-xl
                ${collapsed
                    ? "justify-center w-10 h-10 mx-auto px-0 py-0"
                    : `gap-3 px-3 py-2.5 w-full ${side ? "ml-4" : ""}`
                }
                ${isActive
                    ? "bg-purple-50 text-purple-700 shadow-sm ring-1 ring-purple-100"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }
                `
            }
        >
            {({ isActive }) => (
                <>
                    {isActive && !collapsed && (
                        <motion.div layoutId="active-pill" className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-purple-600 rounded-r-full" />
                    )}
                    <span className={`flex-shrink-0 transition-colors ${isActive ? "text-purple-600" : "text-gray-500 group-hover:text-teal-500"}`}>{icon}</span>
                    {!collapsed && (
                        <span className="text-sm flex-1 truncate flex items-center justify-between">
                            {label}
                            {hot && <span className="px-1.5 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full uppercase tracking-wide">New</span>}
                        </span>
                    )}
                </>
            )}
        </NavLink>
    );
}

function Dropdown({ icon, label, open, toggle, children, collapsed, active }) {
    return (
        <div className="mb-1">
            <div
                onClick={toggle}
                className={`
                    group flex items-center transition-all duration-200 select-none rounded-xl cursor-pointer
                    ${collapsed ? "justify-center w-10 h-10 mx-auto px-0" : "justify-between px-3 py-2.5 w-full"}
                    ${active ? "text-purple-700 font-semibold bg-purple-50/50" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}
                `}
            >
                <div className={`flex items-center ${collapsed ? "justify-center w-full" : "gap-3"} overflow-hidden`}>
                    <span className={`flex-shrink-0 ${active ? "text-purple-600" : "text-gray-400 group-hover:text-teal-500"} transition-colors`}>{icon}</span>
                    {!collapsed && <span className="text-sm truncate">{label}</span>}
                </div>
                {!collapsed && (
                    <span className={`text-gray-400 transition-transform duration-300 flex-shrink-0 ${open ? "rotate-180 text-purple-500" : ""}`}>
                        <ChevronDown className="w-4 h-4" />
                    </span>
                )}
            </div>
            <AnimatePresence initial={false}>
                {open && !collapsed && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <div className="relative mt-1 mb-2 ml-2">
                            <div className="absolute left-[13px] top-0 bottom-0 w-px bg-gray-200"></div>
                            <div className="pl-2">{children}</div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}