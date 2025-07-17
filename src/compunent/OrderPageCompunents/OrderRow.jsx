import { motion } from "framer-motion";
import { format } from 'date-fns';
import { useState } from "react";
import {
    CheckCircle,
    Clock,
    XCircle,
    WifiOff,
    AlertCircle,
    Circle,
    Home,
    Store,
    Pencil,
    NotebookPen,
    Truck
} from 'lucide-react';

const OrderRow = ({ order, index, edite, EdetAllOrder, sendtoLiv, fetchOrders }) => {
    const [myorder, setMyOrder] = useState(order);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [showNote, setShowNote] = useState({ show: false, status: "" });
    const [note, setNote] = useState(order?.note || "");

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

    const statusColors = {
        confirmed: { bg: 'bg-green-50 hover:bg-green-100', badge: 'bg-green-100 text-green-800' },
        pending: { bg: 'bg-yellow-50 hover:bg-yellow-100', badge: 'bg-yellow-100 text-yellow-800' },
        cancelled: { bg: 'bg-red-50 hover:bg-red-100', badge: 'bg-red-100 text-red-800' },
        'Connection failed 1': { bg: 'bg-purple-50 hover:bg-purple-100', badge: 'bg-purple-100 text-purple-800' },
        'Connection failed 2': { bg: 'bg-purple-50 hover:bg-purple-100', badge: 'bg-purple-100 text-purple-800' },
        failed: { bg: 'bg-red-50 hover:bg-red-100', badge: 'bg-red-100 text-red-800' }
    };

    const handleStatusChange = (newStatus) => {
        const updatedOrder = {
            ...myorder,
            status: newStatus,
        };
        setMyOrder(updatedOrder);
        setShowStatusDropdown(false);
        edite(order._id, newStatus, note);
    };


    return (
        <motion.tr
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`hover:bg-opacity-80 ${statusColors[myorder.status]?.bg || 'bg-gray-50 hover:bg-gray-100'}`}
        >
            {showStatusDropdown && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm" />
                    <div className="fixed inset-0 flex items-center justify-center z-[51]">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-4 max-h-[80vh] overflow-y-auto">
                            <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                                <h3 className="text-lg font-medium text-gray-900">Change Order Status</h3>
                            </div>
                            <div className="p-4 space-y-2">
                                {statusOptions.map(option => (
                                    <div
                                        key={option}
                                        className={`px-4 py-3 text-sm cursor-pointer rounded hover:bg-gray-100 flex items-center justify-between transition-colors ${myorder.status === option ? 'bg-gray-100 font-medium' : ''}`}
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
            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">#{order._id.slice(-6)}</td>

            <td className="px-6 py-4 whitespace-nowrap border-l-2 border-l-[#fff] overflow-hidden">
                <div className="flex items-center">
                    <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={myorder.item.imgs[0]}
                        alt={myorder.item.name}
                    />
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{myorder.item.name}</div>
                        <div className="text-sm text-gray-500">Size: {myorder.size}</div>
                    </div>
                </div>
            </td>

            <td className="px-6 py-4 whitespace-nowrap  border-l-2 border-l-[#fff]">
                <div className="text-sm text-gray-900">{myorder.name}</div>
                <div className="text-sm text-gray-500">{myorder.phone}</div>
            </td>

            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap  border-l-2 border-l-[#fff]">
                {myorder.state}<br />{myorder.city}
            </td>

            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap  border-l-2 border-l-[#fff]">
                <span className="flex items-center">
                    {myorder.home ? <>home <Home size={20} className="mx-3" /></> : <>brue <Store size={20} className="mx-3" /></>}
                </span>
            </td>

            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap  border-l-2 border-l-[#fff]">
                {format(new Date(myorder.date), 'MMM dd, yyyy')}
            </td>

            <td onClick={() => setShowStatusDropdown(true)} className="px-6 py-4 relative whitespace-nowrap cursor-pointer  border-l-2 border-l-[#fff]">
                <div className={`px-2 inline-flex items-center text-xs font-semibold rounded-full ${statusColors[myorder.status]?.badge || 'bg-gray-100 text-gray-800'}`}>
                    {statusIcons[myorder.status] || <Circle className="w-4 h-4 mr-2" />}
                    {myorder.status}
                </div>


            </td>

            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap  border-l-2 border-l-[#fff]">DZD {myorder.price + myorder.ride}</td>
            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap  border-l-2 border-l-[#fff]">DZD {myorder.price}</td>
            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap  border-l-2 border-l-[#fff]">DZD {myorder.ride}</td>
            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap  border-l-2 border-l-[#fff]">{myorder.not || "no note"}</td>

            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900  border-l-2 border-l-[#fff] ">
                <div className="flex">
                    <Pencil
                        onClick={() => setShowNote({ show: true, status: myorder.status })}
                        className="text-yellow-950 mx-2 cursor-pointer hover:scale-105"
                    />
                    <NotebookPen
                        onClick={() => EdetAllOrder(myorder._id)}
                        className="text-blue-950 mx-2 cursor-pointer hover:scale-105"
                    />
                    {myorder.status === "confirmed" && (
                        <Truck
                            onClick={() => {
                                sendtoLiv([order]);
                                setTimeout(() => {
                                    fetchOrders();
                                }, 5000); // Waits 5 seconds before refreshing
                            }}
                            className="text-green-950 mx-2 cursor-pointer hover:scale-105 transition-transform duration-200"
                        />
                    )}

                </div>
            </td>

            {showNote.show && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm" />
                    <div className="fixed inset-0 flex items-center justify-center z-[51]">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-4">
                            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                                <h3 className="text-lg font-medium text-gray-900">Add note for {showNote.status}</h3>
                            </div>
                            <div className="p-4">
                                <textarea
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={4}
                                    placeholder="Enter your note here..."
                                />
                            </div>
                            <div className="p-4 border-t border-gray-200 flex justify-end space-x-2">
                                <button
                                    onClick={() => setShowNote({ show: false, status: "" })}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        edite(order._id, (showNote.status || myorder.status), note);
                                        setShowNote({ show: false, status: "" });
                                    }}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                >
                                    Save Note
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </motion.tr>
    );
};

export default OrderRow;
