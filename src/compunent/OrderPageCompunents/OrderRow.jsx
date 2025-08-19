import { motion } from "framer-motion";
import { format, differenceInMinutes, differenceInHours, differenceInDays, differenceInWeeks, differenceInMonths, differenceInYears } from 'date-fns';
import { useState } from "react";
import {
    Bell, XCircle, CheckCircle2, Package, Clock, PhoneOff, Ban,
    CheckCircle,
    WifiOff,
    AlertCircle,
    Circle,
    Pencil,
    NotebookPen,
    Truck,
    Building2,
    HomeIcon,
    Trash,
} from 'lucide-react';
import ShowNoteC from "./OrderRow/showNote";
import ShowdeleteC from "./OrderRow/ShowdeleteC";
const OrderRow = ({ order, index, edite, EdetAllOrder, sendtoLiv, fetchOrders, deleteOrder }) => {
    const [myorder, setMyOrder] = useState(order);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [showdelete, setshowdelete] = useState(false);
    const [showNote, setShowNote] = useState({ show: false, status: "" });
    const [note, setNote] = useState(order?.note || "");
    const changenote = (e) => setNote(e)
    const statusOptions = [
        'confirmed',
        'pending',
        'cancelled',
        'Connection failed 1',
        'Connection failed 2',
        'failed'
    ];

    const statusIcons = {
        confirmed: <CheckCircle className="w-4 h-4 mr-2" />,
        pending: <Clock className="w-4 h-4 mr-2" />,
        cancelled: <XCircle className="w-4 h-4 mr-2" />,
        'Connection failed 1': <WifiOff className="w-4 h-4 mr-2" />,
        'Connection failed 2': <WifiOff className="w-4 h-4 mr-2" />,
        failed: <AlertCircle className="w-4 h-4 mr-2" />
    };
    const statuses = [
        { key: "pending", label: "Pending", color: "bg-blue-100 text-blue-500 ring-blue-200", icon: <Bell className="w-4 h-4" /> },
        { key: "Connection failed 1", label: "Connection failed 1", color: "bg-yellow-100 text-yellow-500 ring-yellow-200", icon: <PhoneOff className="w-4 h-4" /> },
        { key: "Connection failed 2", label: "Connection failed 2", color: "bg-yellow-100 text-yellow-500 ring-yellow-200", icon: <PhoneOff className="w-4 h-4" /> },
        { key: "Connection failed 3", label: "Connection failed 3", color: "bg-yellow-100 text-yellow-500 ring-yellow-200", icon: <PhoneOff className="w-4 h-4" /> },
        { key: "confirmed", label: "Confirmed", color: "bg-green-100 text-green-500 ring-green-200", icon: <CheckCircle2 className="w-4 h-4" /> },
        { key: "ready", label: "Ready", color: "bg-emerald-100 text-emerald-500 ring-emerald-200", icon: <Package className="w-4 h-4" /> },
        { key: "Postponed", label: "Postponed", color: "bg-purple-100 text-purple-500 ring-purple-200", icon: <Clock className="w-4 h-4" /> },
        { key: "cancelled", label: "Cancelled", color: "bg-gray-100 text-gray-500 ring-gray-200", icon: <XCircle className="w-4 h-4" /> },
        { key: "failed", label: "Failed", color: "bg-red-100 text-red-500 ring-red-200", icon: <Ban className="w-4 h-4" /> },
    ]
    const statusColors = {
        confirmed: { bg: 'bg-green-500', badge: 'bg-green-100 text-green-800' },
        pending: { bg: 'bg-yellow-500', badge: 'bg-yellow-100 text-yellow-800' },
        cancelled: { bg: 'bg-red-500', badge: 'bg-red-100 text-red-800' },
        'Connection failed 1': { bg: 'bg-purple-500', badge: 'bg-purple-100 text-purple-800' },
        'Connection failed 2': { bg: 'bg-purple-500', badge: 'bg-purple-100 text-purple-800' },
        failed: { bg: 'bg-red-500', badge: 'bg-red-100 text-red-800' }
    };
    const hide = () => {
        setshowdelete(false)
        setShowStatusDropdown(false)
        setShowNote({ show: false, status: "" })
    }
    const handleStatusChange = (newStatus) => {
        const updatedOrder = {
            ...myorder,
            status: newStatus,
        };
        setMyOrder(updatedOrder);
        setShowStatusDropdown(false);
        edite(order._id, newStatus, note);
    };
    const getSocialTime = (date) => {
        const now = new Date();
        const past = new Date(date);

        const minutes = differenceInMinutes(now, past);
        if (minutes < 60) return `${minutes}m`;

        const hours = differenceInHours(now, past);
        if (hours < 24) return `${hours}h`;

        const days = differenceInDays(now, past);
        if (days < 7) return `${days}d`;

        const weeks = differenceInWeeks(now, past);
        if (weeks < 4) return `${weeks}w`;

        const months = differenceInMonths(now, past);
        if (months < 12) return `${months}mo`;

        const years = differenceInYears(now, past);
        return `${years}y`;
    };

    return (
        <>
            {showStatusDropdown && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm" />
                    <div className="fixed inset-0 flex items-center justify-center z-[51]">
                        <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4 max-h-[80vh] overflow-y-auto">
                            <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                                <h3 className="text-lg font-semibold text-gray-900">Change Order Status</h3>
                            </div>
                            <div className="p-4 space-y-2">
                                {statusOptions.map(option => (
                                    <div
                                        key={option}
                                        className={`px-4 py-3 text-sm cursor-pointer rounded-lg hover:bg-gray-100 flex items-center justify-between transition-colors ${myorder.status === option ? 'bg-gray-100 font-semibold' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleStatusChange(option);
                                        }}
                                    >
                                        <div className="flex items-center">
                                            {statusIcons[option] || <Circle className="w-4 h-4 mr-2" />}
                                            {option}
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setShowNote({ show: true, status: option });
                                            }}
                                            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 border-t border-gray-200 sticky bottom-0 bg-white flex justify-end">
                                <button
                                    onClick={() => setShowStatusDropdown(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <motion.tr
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl border-b border-[#eee]"
            >


                <td className={`w-2 ${statusColors[myorder.status]?.bg}`} />
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">#{order._id.slice(-6)}</td>

                <td className="px-6 py-4 whitespace-nowrap border-l-2 border-l-white overflow-hidden">
                    <div className="flex items-center">
                        <img
                            className="h-10 w-10 rounded-full object-cover shadow-md"
                            src={myorder.item.imgs[0]}
                            alt={myorder.item.name}
                        />
                        <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-900">{myorder.item.name}</div>
                        </div>
                    </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap border-l-2 border-l-white">
                    <div className="text-sm text-gray-900 font-medium">{myorder.name}</div>
                    <div className="text-xs text-gray-500">{myorder.phone}</div>
                </td>

                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap border-l-2 border-l-white">
                    {myorder.state}<br />{myorder.city}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap border-l-2 border-l-white">
                    <span className="flex items-center">
                        {myorder.home ? <>Home <HomeIcon size={20} className="ml-2" /></> : <>Office <Building2 size={20} className="ml-2" /></>}
                    </span>
                </td>

                <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap border-l-2 border-l-white">
                    {format(new Date(myorder.date), 'MMM dd, yyyy ')}
                    {format(new Date(myorder.date), ' HH:mm')}
                </td>
                <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap border-l-2 border-l-white">
                    {getSocialTime(myorder.date)}
                    {/* {minutesPassed} */}
                </td>

                {/* Status */}
                <td
                    onClick={() => setShowStatusDropdown(true)}
                    className="px-4 py-2">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full border ${statuses.find(e => e.key == myorder.status).color || 'bg-gray-100 text-gray-800'} ring-2 ring-offset-2`}>
                        {statuses.find(e => e.key == myorder.status).icon}
                        {statuses.find(e => e.key == myorder.status).label}
                    </span>
                </td>



                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border-l-2 border-l-white">DZD {myorder.price + myorder.ride}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border-l-2 border-l-white">DZD {myorder.price}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border-l-2 border-l-white">DZD {myorder.ride}</td>
                <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap border-l-2 border-l-white">{myorder.note || "No note"}</td>

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-l-2 border-l-white">
                    <div className="flex space-x-2">
                        <button
                            className="rounded-full hover:bg-yellow-200 p-2"
                            onClick={() => setShowNote({ show: true, status: myorder.status })}
                        >
                            <Pencil
                                className="text-yellow-600 cursor-pointer hover:scale-110 transition-transform"
                            />
                        </button>
                        <button
                            onClick={() => EdetAllOrder(myorder._id)}
                            className="rounded-full hover:bg-blue-200 p-2"
                        >
                            <NotebookPen
                                className="text-blue-600 cursor-pointer hover:scale-110 transition-transform"
                            />
                        </button>
                        {myorder.status === "confirmed" && (
                            <button
                                className="rounded-full hover:bg-green-200 p-2"
                                onClick={() => {
                                    sendtoLiv([order]);
                                    setTimeout(() => {
                                        fetchOrders();
                                    }, 5000);
                                }}
                            >
                                <Truck

                                    className="text-green-600 cursor-pointer hover:scale-110 transition-transform"
                                />

                            </button>

                        )}
                        <button
                            className="rounded-full hover:bg-red-200 p-2"
                            onClick={() => setshowdelete(true)}
                        >

                            <Trash className="text-red-600" />
                        </button>
                    </div>
                </td>
                {showdelete && <ShowdeleteC
                    deleteOrder={deleteOrder}
                    hide={hide}
                    myorder={myorder}

                />}
                {showNote.show && <ShowNoteC
                    note={note}
                    changenote={changenote}
                    edite={edite}
                    myorder={myorder}
                    showNote={showNote}
                    hide={hide}
                />}
            </motion.tr>
        </>

    );
};

export default OrderRow;
