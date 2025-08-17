import {
    Home,
    Store,
    Box,
    Package,
    Tag,
    Layers,
    Truck,
    Megaphone,
    ChevronDown,
    ChevronUp,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from "motion/react";
import { useState } from 'react';
import { HiBars3BottomLeft } from "react-icons/hi2";

export default function Sidebar({ SemalHarder, togelHeader, open }) {
    const [show, setShow] = useState({
        store: false,
        orders: false,
        categories: false,
        delivery: false,
        marketing: false,
    });

    return (
        <motion.aside
            initial={{ x: -1000 }}
            exit={{ x: -1000 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className={`${SemalHarder ? "w-0 md:w-1/12" : "w-8/12 md:w-3/12"} 
                bg-white/90 backdrop-blur-md border-l border-gray-200 shadow-xl 
                flex flex-col z-[500] fixed top-0 right-0 h-full transition-all duration-300`}
        >
            {/* Toggle Button */}
            <button
                onClick={togelHeader}
                className={`${SemalHarder ? "w-9/12 mt-3 mx-auto" : "absolute top-3 left-3"} flex items-center justify-between px-4 py-2.5 rounded-lg cursor-pointer transition-all hover:bg-blue-50 hover:text-blue-600`}
            >
                <HiBars3BottomLeft className="w-5 h-5 text-gray-700" />
            </button>

            {/* Logo + alert */}
            {!SemalHarder && (
                <div className="px-6 py-6 text-center border-b border-gray-200">
                    <h1 className="font-extrabold text-xl text-gray-800">Raouf Soft</h1>
                    <span className="mt-3 inline-block bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full shadow-sm">
                        مغلق لعدم دفع الإشتراك
                    </span>
                </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 px-2 py-6 text-gray-700 text-sm space-y-1 overflow-y-auto">


                <NavItem icon={<Home className="w-5 h-5" />} label="الرئيسية" to="/" collapsed={SemalHarder} />

                <Dropdown
                    label="المتجر"
                    icon={<Store className="w-5 h-5" />}
                    open={show.store}
                    toggle={() => {

                        open()
                        setShow({ ...show, store: !show.store })
                    }
                    }
                    collapsed={SemalHarder}
                >
                    <NavItem side label="إعدادات المتجر" to="/modify-website" collapsed={SemalHarder} />
                </Dropdown>

                <Dropdown
                    label="الطلبات"
                    icon={<Box className="w-5 h-5" />}
                    open={show.orders}
                    toggle={() => {
                        open()
                        setShow({
                            ...show, orders: !show.orders
                        })
                    }}
                    collapsed={SemalHarder}
                >
                    <NavItem side label="كل الطلبات" to="/orders" collapsed={SemalHarder} />
                </Dropdown>

                <NavItem icon={<Tag className="w-5 h-5" />} label="المنتجات" to="/items" collapsed={SemalHarder} />



                <Dropdown
                    label="التصنيفات"
                    icon={<Layers className="w-5 h-5" />}
                    open={show.categories}
                    toggle={() => {
                        open()
                        setShow({ ...show, categories: !show.categories })
                    }}
                    collapsed={SemalHarder}
                >
                    <NavItem side label="كل التصنيفات" to="/modify-website" collapsed={SemalHarder} />
                </Dropdown>

                <Dropdown
                    label="التوصيل"
                    icon={<Truck className="w-5 h-5" />}
                    open={show.delivery}
                    toggle={() => {
                        open()
                        setShow({ ...show, delivery: !show.delivery })
                    }}
                    collapsed={SemalHarder}
                >
                    <NavItem side label="شركات التوصيل" to="/LivCompany" collapsed={SemalHarder} />
                </Dropdown>

                <NavItem icon={<Megaphone className="w-5 h-5" />} label="أدوات التسويق" to="/marketing" collapsed={SemalHarder} />
            </nav>
        </motion.aside>
    );
}

/* Reusable NavItem */
function NavItem({ icon, label, to, side, active, hot, collapsed }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium cursor-pointer transition-all duration-200
                 ${side ? "pl-10 text-gray-600" : ""}
                 ${active || isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`
            }
        >
            {icon}
            {!collapsed && (
                <span className="flex items-center gap-1">
                    {label} {hot && <span className="text-lg">🔥</span>}
                </span>
            )}
        </NavLink>
    );
}

/* Dropdown Component */
function Dropdown({ icon, label, open, toggle, children, collapsed }) {
    return (
        <div>
            <div
                onClick={toggle}
                className="flex items-center justify-between px-4 py-2.5 rounded-lg cursor-pointer transition-all hover:bg-blue-50 hover:text-blue-600"
            >
                <div className="flex items-center gap-3">
                    {icon}
                    {!collapsed && <span>{label}</span>}
                </div>
                {!collapsed && (open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
            </div>
            <AnimatePresence>
                {open && !collapsed && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="ml-4 mt-1 space-y-1 border-r-2 border-blue-200 pr-2"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
