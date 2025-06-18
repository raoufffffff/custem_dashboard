import {
    LayoutDashboard, Table,
    Bell, User,
    Package2,
    PackagePlus,
    CircleX,
    Code,
    LogOut,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion } from "motion/react"

export default function Sidebar({ hide }) {
    return (
        <motion.aside
            initial={{ x: -1000 }}
            exit={{ x: -1000 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.9, type: "spring" }}
            className="w-64 fixed top-3 left-5 min-h-[95vh] bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col justify-between z-[60] rounded-xl">

            {/* Logo and Close */}
            <div>
                <div className="flex items-center justify-between px-4 py-5 border-b border-gray-700">
                    <div className="flex items-center space-x-2">
                        <LayoutDashboard
                            className="w-6 h-6 text-white" />
                        <span className="font-semibold text-sm">Material Dashboard 2</span>
                    </div>
                    <CircleX onClick={hide}
                    />
                </div>

                {/* Navigation Items */}
                <nav className="mt-4 px-2 space-y-1 text-sm">
                    <NavItem hide={hide} icon={<LayoutDashboard />} label="Dashboard" to="/" />
                    <NavItem hide={hide} icon={<Table />} label="Orders" to="/orders" />
                    <NavItem hide={hide} icon={<Bell />} label="Notifications" to="/notifications" />
                    <NavItem hide={hide} icon={<User />} label="Profile" to="/profile" />
                    <NavItem hide={hide} icon={<Package2 />} label="Items" to="/items" />
                    <NavItem hide={hide} icon={<PackagePlus />} label="Add Items" to="/AddItems" />
                    <NavItem hide={hide} icon={<Code />} label="modefi website" to="/items/new" />
                    <NavItem hide={hide} icon={<LogOut />} label="Log Out" to="/items/new" />
                </nav>
            </div>

            {/* Upgrade Button */}

            <div className="p-4">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md text-sm">
                    VISIT YOUR WEBSITE
                </button>
            </div>
        </motion.aside>
    );
}

// Reusable Nav Item Component with React Router
function NavItem({ icon, label, to, hide }) {
    return (
        <NavLink
            to={to}
            onClick={hide}
            className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg cursor-pointer transition
                ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`
            }
        >
            <div className="w-5 h-5 mr-3">{icon}</div>
            <span>{label}</span>
        </NavLink>
    );
}
