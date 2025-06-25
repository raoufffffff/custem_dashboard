import { motion } from "framer-motion";
import { format } from 'date-fns';
import { FiX, FiCalendar } from 'react-icons/fi';

const FilterPanel = ({ filters, setFilters, uniqueItems, clearFilters, onDateClick }) => (
    <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 p-4 bg-white rounded-lg shadow-md border border-gray-200"
    >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item</label>
                <select
                    value={filters.item}
                    onChange={(e) => setFilters({ ...filters, item: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="all">All Items</option>
                    {uniqueItems.map(e => (
                        <option key={e.id} value={e.name}>{e.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
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
                    onClick={onDateClick}
                    className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    <span>
                        {filters.dateRange.start && filters.dateRange.end ?
                            `${format(filters.dateRange.start, 'MMM dd')} - ${format(filters.dateRange.end, 'MMM dd, yyyy')}` :
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
    </motion.div>
);

export default FilterPanel