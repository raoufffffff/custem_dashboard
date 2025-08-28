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
import useUser from '../../hooks/useUser';

export default function Sidebar({ SemalHarder, togelHeader, open }) {
    const [show, setShow] = useState({
        store: false,
        orders: false,
        categories: false,
        delivery: false,
        marketing: false,
    });
    const { loading, name, website } = useUser()

    return (
        <motion.aside
            initial={{ x: -1000 }}
            exit={{ x: -1000 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.2, type: "spring" }}
            className={`${SemalHarder ? "w-0 overflow-hidden md:w-[9%]  lg:w-[5%]" : "w-8/12 md:w-3/12"} 
                bg-white/90 backdrop-blur-md border-l border-gray-200 shadow-xl 
                flex flex-col z-[500] fixed top-0 left-0 h-full transition-all duration-300`}
        >
            {/* Toggle Button */}
            <button
                onClick={togelHeader}
                className={`${SemalHarder ? "w-9/12 mt-3 mx-auto" : "absolute top-3 right-3"} flex items-center justify-between px-4 py-2.5 rounded-lg cursor-pointer transition-all hover:bg-blue-50 hover:text-blue-600`}
            >
                <HiBars3BottomLeft className="w-5 h-5 text-gray-700" />
            </button>

            {/* Logo + Alert */}
            {loading ? (
                <div className={` ${SemalHarder && "hidden"} px-6 py-6 text-center border-b border-gray-200 animate-pulse`}>
                    <div className="h-6 w-32 mx-auto rounded bg-gray-200" />
                    <div className="mt-3 h-5 w-24 mx-auto rounded-full bg-gray-300" />
                </div>
            ) : (
                <div className={` ${SemalHarder && "hidden"} px-6 py-6 text-center border-b border-gray-200`}>
                    <h1 className="font-extrabold text-xl text-gray-800">{name}</h1>
                    <a
                        target='_blank'
                        href={`https://${website.link}`}
                        className="mt-3 inline-block bg-green-600 text-xs text-white px-3 py-1 rounded-full shadow-sm">
                        your website
                    </a>
                </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 px-2 py-6 text-gray-700 text-sm space-y-1 overflow-y-auto">

                <NavItem togelHeader={togelHeader} icon={<Home className="w-5 h-5" />} label="Home" to="/" collapsed={SemalHarder} />

                <Dropdown
                    label="Store"
                    icon={<Store className="w-5 h-5" />}
                    open={show.store}
                    toggle={() => {
                        open()
                        setShow({ ...show, store: !show.store })
                    }}
                    collapsed={SemalHarder}
                >
                    <NavItem togelHeader={togelHeader} side label="Logo" to="/update/logo" collapsed={SemalHarder} />
                </Dropdown>

                <Dropdown
                    label="Orders"
                    icon={<Box className="w-5 h-5" />}
                    open={show.orders}
                    toggle={() => {
                        open()
                        setShow({ ...show, orders: !show.orders })
                    }}
                    collapsed={SemalHarder}
                >
                    <NavItem togelHeader={togelHeader} side label="All Orders" to="/orders" collapsed={SemalHarder} />
                </Dropdown>
                <Dropdown
                    label="Products"
                    icon={<Tag className="w-5 h-5" />}
                    open={show.orders}
                    toggle={() => {
                        open()
                        setShow({ ...show, orders: !show.orders })
                    }}
                    collapsed={SemalHarder}
                >
                    <NavItem togelHeader={togelHeader} side label="Products" to="/items" collapsed={SemalHarder} />
                    <NavItem togelHeader={togelHeader} side label="Add Products" to="/additems" collapsed={SemalHarder} />
                </Dropdown>


                <Dropdown
                    label="Categories"
                    icon={<Layers className="w-5 h-5" />}
                    open={show.categories}
                    toggle={() => {
                        open()
                        setShow({ ...show, categories: !show.categories })
                    }}
                    collapsed={SemalHarder}
                >
                    <NavItem togelHeader={togelHeader} side label="All Categories" to="/modify-website" collapsed={SemalHarder} />
                </Dropdown>

                <Dropdown
                    label="Delivery"
                    icon={<Truck className="w-5 h-5" />}
                    open={show.delivery}
                    toggle={() => {
                        open()
                        setShow({ ...show, delivery: !show.delivery })
                    }}
                    collapsed={SemalHarder}
                >
                    <NavItem togelHeader={togelHeader} side label="Delivery Companies" to="/LivCompany" collapsed={SemalHarder} />
                </Dropdown>

                <NavItem togelHeader={togelHeader} icon={<Megaphone className="w-5 h-5" />} label="Marketing Tools" to="/marketing" collapsed={SemalHarder} />
            </nav>
        </motion.aside>
    );
}

/* Reusable NavItem */
function NavItem({ icon, label, to, side, active, hot, collapsed, togelHeader }) {
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
            onClick={togelHeader}
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
