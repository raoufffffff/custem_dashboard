import { motion } from "framer-motion";
import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiX, FiCheck } from 'react-icons/fi';

const DatePickerModal = ({
    dateRange,
    onApply,
    onReset,
    onCancel
}) => {
    const [localDates, setLocalDates] = useState({
        start: dateRange.start,
        end: dateRange.end
    });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-lg shadow-xl w-full max-w-md"
            >
                <div className="p-4 border-b">
                    <h3 className="text-lg font-medium text-center">Select Date Range</h3>
                    <p className="text-sm text-gray-500 text-center mt-1">
                        Choose start and end dates
                    </p>
                </div>

                <div className="p-4 flex justify-center">
                    <DatePicker
                        selected={localDates.start}
                        onChange={(dates) => {
                            const [start, end] = dates;
                            setLocalDates({
                                start,
                                end: end || null // Allow null end date for partial selection
                            });
                        }}
                        startDate={localDates.start}
                        endDate={localDates.end}
                        selectsRange
                        inline
                        className="border-none"
                    />
                </div>

                <div className="p-4 border-t flex justify-between">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                            onReset();
                            setLocalDates({ start: null, end: null });
                        }}
                        className="px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100 flex items-center gap-2"
                    >
                        <FiX className="h-4 w-4" />
                        Reset
                    </motion.button>
                    <div className="flex gap-2">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onCancel}
                            className="px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100 flex items-center gap-2"
                        >
                            <FiX className="h-4 w-4" />
                            Cancel
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                                if (localDates.start && localDates.end) {
                                    onApply({
                                        start: localDates.start,
                                        end: localDates.end
                                    });
                                    onCancel();
                                }
                            }}
                            disabled={!localDates.start || !localDates.end}
                            className={`px-4 py-2 flex items-center gap-2 ${(!localDates.start || !localDates.end)
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                                } rounded-md`}
                        >
                            <FiCheck className="h-4 w-4" />
                            Apply Range
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default DatePickerModal