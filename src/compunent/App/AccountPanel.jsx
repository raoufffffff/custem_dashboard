import {
    Check,
    Settings,
    MessageCircle,
    HelpCircle,
    LogOut,
} from "lucide-react";

const AccountPanel = ({ user, hide }) => {
    const menu = [

        {
            label: "Store Owner Settings",
            icon: <Settings className="w-4 h-4 text-purple-600" />,
        },

        {
            label: "Contact Us",
            icon: <MessageCircle className="w-4 h-4 text-purple-600" />,
        },
        {
            label: "FAQ",
            icon: <HelpCircle className="w-4 h-4 text-purple-600" />,
        },
        {
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

            {/* Info (like "nnn" + eye icon from screenshot) */}


            {/* Menu items */}
            <div className="w-full flex flex-col mt-4">
                {menu.map((item, idx) => (
                    <button
                        key={idx}
                        className={`flex items-center justify-between w-full px-3 py-3 rounded-lg text-sm transition ${item.highlight
                            ? "bg-pink-100 text-pink-600 font-medium"
                            : "hover:bg-gray-100 text-gray-700"
                            }`}
                    >
                        <span>{item.label}</span>
                        {item.icon}
                    </button>
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
