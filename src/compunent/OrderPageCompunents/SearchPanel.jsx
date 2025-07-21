import { motion } from "framer-motion";

const SearchPanel = ({ customer, setCustomer, Tracking }) => (
    <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 p-4 bg-white rounded-lg shadow-md border border-gray-200"
    >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Tracking && <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">order Tracking</label>
                <input
                    type="text"
                    value={customer.Tracking}
                    onChange={(e) => setCustomer({ ...customer, Tracking: e.target.value })}
                    placeholder="Search by name..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                <input
                    type="text"
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    placeholder="Search by name..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Phone</label>
                <input
                    type="text"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    placeholder="Search by phone..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>
    </motion.div>
);


export default SearchPanel