import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import DatePicker from 'react-datepicker';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { FiFilter, FiX, FiCalendar, FiCheck } from 'react-icons/fi';

const Order = () => {
    const [order, setOrder] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [about, setAbout] = useState("all");
    const [date, setDate] = useState({
        name: "",
        spe: false,
        startDate: null,
        endDate: null
    });
    const [status, setStatus] = useState("all");
    const [loading, setLoading] = useState(true);
    const [showDate, setShowDate] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);

    useEffect(() => {
        const getOrder = async () => {
            try {
                const res = await axios.get(`https://true-fit-dz-api.vercel.app/order`);
                setOrder(res.data.result);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        getOrder();
    }, []);

    useEffect(() => {
        // Apply filters whenever any filter value changes
        const filtered = order.filter(item => {
            const itemMatch = about === "all" || item.item.name === about;
            const statusMatch = status === "all" || item.status === status;

            let dateMatch = true;

            if (date.spe && date.startDate && date.endDate) {
                const orderDate = new Date(item.date);
                if (isNaN(orderDate)) {
                    // Invalid date format, skip this item
                    return false;
                }

                dateMatch = isWithinInterval(orderDate, {
                    start: date.startDate,
                    end: date.endDate
                });
            }

            return itemMatch && statusMatch && dateMatch;
        });
        setFilteredOrders(filtered);
    }, [order, about, status, date]);

    const handleDateRangeChange = (dates) => {
        const [start, end] = dates;

        setDate(prev => ({
            ...prev,
            startDate: start,
            endDate: end,
            spe: start && end ? true : false // only enable filter when both dates are selected
        }));
    };

    const applyDatePreset = (presetName) => {
        const today = new Date();
        let start, end;

        switch (presetName) {
            case 'today':
                start = today;
                end = today;
                break;
            case 'week':
                start = startOfWeek(today);
                end = endOfWeek(today);
                break;
            case 'months':
                start = startOfMonth(today);
                end = endOfMonth(today);
                break;
            default:
                start = null;
                end = null;
        }

        setDate({
            name: presetName,
            spe: true,
            startDate: start,
            endDate: end
        });
    };

    const resetDates = () => {
        setDate({
            name: "",
            spe: false,
            startDate: null,
            endDate: null
        });
    };

    const clearFilters = () => {
        setAbout("all");
        setStatus("all");
        resetDates();
    };

    const getUniqueItems = () => {
        const uniqueItems = [];
        const seen = new Set();

        for (const orderItem of order) {
            const item = orderItem.item;
            if (!seen.has(item._id)) {
                seen.add(item._id);
                uniqueItems.push({
                    id: item._id,
                    name: item.name
                });
            }
        }
        return uniqueItems;
    };

    if (loading) return <div>Loading...</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="p-6 max-w-7xl mx-auto"
        >
            <div className="flex justify-between items-center mb-6">
                <motion.h1
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    className="text-2xl font-bold text-gray-800"
                >
                    Orders
                </motion.h1>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilterOpen(!filterOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors"
                >
                    <FiFilter className="h-4 w-4" />
                    <span>Filters</span>
                </motion.button>
            </div>

            {/* Filters Panel */}
            {filterOpen && <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-white rounded-lg shadow-md border border-gray-200"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Item</label>
                        <select
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Items</option>
                            {getUniqueItems().map(e => (
                                <option key={e.id} value={e.name}>{e.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="confirmed">Confirmed</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                        <button
                            onClick={() => setShowDate(true)}
                            className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            <span>
                                {date.spe ?
                                    `${format(date.startDate, 'MMM dd')} - ${format(date.endDate, 'MMM dd, yyyy')}` :
                                    'Select date range'}
                            </span>
                            <FiCalendar className="h-4 w-4 text-gray-500" />
                        </button>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={clearFilters}
                        className="px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100 flex items-center gap-2"
                    >
                        <FiX className="h-4 w-4" />
                        Clear All
                    </motion.button>
                </div>
            </motion.div>}

            {/* Orders Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredOrders.map((item, index) => (
                                <motion.tr
                                    key={item._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{item._id.slice(-6)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.item.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {format(new Date(item.date), 'MMM dd, yyyy')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${item.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                                item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        DZD {item.price}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Date Picker Modal */}
            {showDate && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-lg shadow-xl w-full max-w-md"
                    >
                        <div className="w-11/12 flex mx-auto p-4 border-b">
                            {['today', 'week', 'months'].map(preset => (
                                <motion.span
                                    key={preset}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => applyDatePreset(preset)}
                                    className={`${date.name === preset ? "text-white bg-blue-600" : "bg-gray-100"} 
                                        flex mr-2 p-2 capitalize rounded-xl border border-gray-300 text-xs cursor-pointer`}
                                >
                                    {preset === 'today' ? 'Today' :
                                        preset === 'week' ? 'This Week' : 'This Month'}
                                </motion.span>
                            ))}
                        </div>

                        <div className="p-4 flex justify-center">
                            <DatePicker
                                selected={date.startDate}
                                onChange={handleDateRangeChange}
                                startDate={date.startDate}
                                endDate={date.endDate}
                                selectsRange
                                inline
                                className="border-none"
                            />
                        </div>

                        <div className="p-4 border-t flex justify-between">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={resetDates}
                                className="px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100 flex items-center gap-2"
                            >
                                <FiX className="h-4 w-4" />
                                Reset
                            </motion.button>
                            <div className="flex gap-2">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setShowDate(false)}
                                    className="px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100 flex items-center gap-2"
                                >
                                    <FiX className="h-4 w-4" />
                                    Cancel
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setShowDate(false)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2"
                                >
                                    <FiCheck className="h-4 w-4" />
                                    Apply
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
};

export default Order;