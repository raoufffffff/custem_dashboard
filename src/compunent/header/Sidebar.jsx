import {
    LayoutDashboard, Table,
    Bell,
    Package2,
    PackagePlus,
    CircleX,
    Code,
    LogOut,
    ChevronDown,
    ChevronUp,
    PackageCheck,
    Truck,
    Package,
    CircleDollarSign,
} from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { motion } from "motion/react"
import { useState } from 'react';

export default function Sidebar({ hide, AlartNotification, setNotificationsToDefult, NotificationsCurrentNumber, website, companyLiv }) {
    const logout = () => {
        localStorage.clear()
    }
    const [show, setshow] = useState({
        order: false,
        liv: false
    })
    return (
        <motion.aside
            initial={{ x: -1000 }}
            exit={{ x: -1000 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.9, type: "spring" }}
            className="w-64 fixed top-3 left-5 min-h-[95vh] max-h-[95vh] bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-y-scroll a flex flex-col justify-between z-[60] rounded-xl">

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


                    <div

                        onClick={() => {
                            setshow({ order: !show.order, liv: false })
                        }
                        }
                        className={
                            `flex items-center px-4 py-2 rounded-lg cursor-pointer transition
                text-gray-300 hover:bg-gray-700 hover:text-white`
                        }
                    >
                        <div className="w-5 h-5 mr-3 flex justify-between"><Table /></div>
                        <span>orders</span>

                        {show.order ? <ChevronUp className='ml-auto' />
                            : <ChevronDown className='ml-auto' />}
                    </div>
                    {show.order &&
                        <>
                            {companyLiv.name && <NavItem hide={hide} icon={<Truck />} label="Truck Orders" side={true} to="/TruckOrder" />}
                            <NavItem hide={hide} icon={<PackageCheck />} label="All Orders" side={true} to="/orders" />


                        </>

                    }
                    <div

                        onClick={() => {
                            setshow({ order: false, liv: !show.liv })
                        }
                        }
                        className={
                            `flex items-center px-4 py-2 rounded-lg cursor-pointer transition
                text-gray-300 hover:bg-gray-700 hover:text-white`
                        }
                    >
                        <div className="w-5 h-5 mr-3 flex justify-between"><Package /></div>
                        <span>livraison company</span>

                        {show.liv ? <ChevronUp className='ml-auto' />
                            : <ChevronDown className='ml-auto' />}
                    </div>
                    {show.liv &&
                        <>
                            <NavItem hide={hide} icon={<Truck />} label="delevry Company" side={true} to="/LivCompany" />
                            <NavItem hide={hide} icon={<CircleDollarSign />} label="Delivery Price" side={true} to="/LivrisionPrice" />
                        </>

                    }
                    <NavItem hide={hide} icon={<Bell />} label="Notifications" alart={AlartNotification} to="/notifications" numbernot={NotificationsCurrentNumber} onClick={setNotificationsToDefult} />

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
function NavItem({ icon, side, label, to, hide, alart, numbernot, onClick }) {
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
                ${side && "scale-[0.85]"}
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
