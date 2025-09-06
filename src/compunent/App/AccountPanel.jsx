import {
    Check,
    Settings,
    MessageCircle,
    HelpCircle,
    LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const AccountPanel = ({ user, hide }) => {
    const menu = [
        {
            link: "/Settings",
            label: "Store Owner Settings",
            icon: <Settings className="w-4 h-4 text-purple-600" />,
        },
        {
            link: "/ContactUs",
            label: "Contact Us",
            icon: <MessageCircle className="w-4 h-4 text-purple-600" />,
        },
        {
            link: "/FAQ",
            label: "FAQ",
            icon: <HelpCircle className="w-4 h-4 text-purple-600" />,
        },
        {
            link: "/login",
            label: "Log Out",
            icon: <LogOut className="w-4 h-4 text-purple-600" />,
        },
    ];

    return (
        <div className="px-5 py-4 w-full flex flex-col bg-white rounded-2xl shadow-lg">
            {/* Header */}
            <div className="w-full border-b border-b-gray-200 pb-3">
                <h2 className="font-bold text-xl text-center capitalize">
                    {user.name}
                </h2>
                <p className="text-gray-500 text-center flex justify-center text-sm items-center">
                    Store Owner
                    <Check className="mx-2 w-4 h-4 text-teal-500" />
                </p>
            </div>

            {/* Menu items */}
            <div className="w-full flex flex-col mt-4">
                {menu.map((item, idx) => (
                    <NavLink
                        onClick={() => {
                            hide()
                            if (item.link == "/login") {
                                window.localStorage.clear()
                            }
                        }}
                        to={item.link}
                        key={idx}
                        className={({ isActive }) =>
                            `flex items-center justify-between w-full px-3 py-3 rounded-lg text-sm transition ${isActive
                                ? "bg-purple-100 text-purple-600 font-medium"
                                : "hover:bg-gray-100 text-gray-700"
                            }`
                        }
                    >
                        <span>{item.label}</span>
                        {item.icon}
                    </NavLink>
                ))}
            </div>

            {/* Close button */}
            <button
                onClick={hide}
                className="ml-auto mt-4 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-xl transition-all shadow-md"
            >
                Close
            </button>
        </div>
    );
};

export default AccountPanel;
