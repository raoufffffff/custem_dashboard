import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";
import { useState } from "react";

const Notifications = () => {
    const { Notifications, loading } = useUser();
    const [selectedIndex, setSelectedIndex] = useState(null);

    if (loading) {
        return (
            <div className="space-y-4 p-4">
                {Array(5).fill(0).map((_, i) => (
                    <div key={i} className="animate-pulse bg-gray-100 rounded-xl p-4 shadow-sm">
                        <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                        <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (!Notifications || Notifications.length === 0) {
        return (
            <div className="p-4 text-center text-gray-500">لا توجد إشعارات حالياً.</div>
        );
    }

    return (
        <div className="p-4 space-y-4">
            {Notifications.map((notif, index) => (
                <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition-all cursor-pointer"
                    onClick={() => setSelectedIndex(selectedIndex === index ? null : index)}
                >
                    <div className="p-4">
                        <h2 className="text-lg font-semibold text-gray-800">{notif.title}</h2>
                        <p className="text-sm text-gray-600">{notif.subtitle}</p>
                    </div>

                    {selectedIndex === index && (
                        <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl flex justify-center">
                            {notif.des && (
                                <p className="text-sm text-gray-700 mb-2">{notif.des}</p>
                            )}
                            {notif.link && (
                                <Link
                                    to={notif.link}
                                    rel="noopener noreferrer"
                                    className="inline-block bg-blue-600 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-700 transition mx-auto"
                                >
                                    visit the docs
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Notifications;
