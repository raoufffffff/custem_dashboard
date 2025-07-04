import {
    LayoutDashboard, Table,
    Bell, User,
    Package2,
    PackagePlus,
    CircleX,
    Code,
    LogOut,
} from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { motion } from "motion/react"

export default function Sidebar({ hide, AlartNotification, setNotificationsToDefult, NotificationsCurrentNumber, website }) {
    const logout = () => {
        localStorage.clear()
    }
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
                    <NavItem hide={hide} icon={<Bell />} label="Notifications" alart={AlartNotification} to="/notifications" numbernot={NotificationsCurrentNumber} onClick={setNotificationsToDefult} />
                    <NavItem hide={hide} icon={<User />} label="Profile" to="/profile" />
                    <NavItem hide={hide} icon={<Package2 />} label="Items" to="/items" />
                    <NavItem hide={hide} icon={<PackagePlus />} label="Add Items" to="/AddItems" />
                    <NavItem hide={hide} icon={<Code />} label="modify website" to="/modify-website" />
                    <NavItem
                        onClick={logout}
                        hide={hide} icon={<LogOut />} label="Log Out" to="/login" />
                </nav>
            </div>

            {/* Upgrade Button */}

            {website.link ? <div className="p-4">
                <Link
                    target='_blank'
                    to={`https://${website.link}`}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md text-sm uppercase">
                    VISIT YOUR WEBSITE
                </Link>
            </div> : <div className="p-4">
                <Link
                    onClick={hide}
                    to={'/create-website'}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md text-sm uppercase">
                    Create your website
                </Link>
            </div>}
        </motion.aside>
    );
}

// Reusable Nav Item Component with React Router
function NavItem({ icon, label, to, hide, alart, numbernot, onClick }) {
    return (
        <NavLink

            to={to}
            onClick={() => {
                hide()
                onClick()
            }
            }
            className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg cursor-pointer transition
                ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`
            }
        >
            <div className="w-5 h-5 mr-3">{icon}</div>
            <span>{label}</span>
            {alart && <span
                className='ml-auto text-blue-600 bg-white py-1 px-2 rounded-full text-[8px]'
            >{numbernot}</span>}
        </NavLink>
    );
}
