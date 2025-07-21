import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { FiFilter, FiSearch, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FilterButtons = ({ filterOpen, setFilterOpen, searchOpen, setSearchOpen, visibleItems, filteredOrders, AddNewOrder, add = false }) => {
    return (
        <div className="flex w-full flex-wrap justify-between items-center mb-6">
            <div className='flex gap-x-2.5'>
                <FilterButton
                    isOpen={filterOpen}
                    onClick={() => setFilterOpen(!filterOpen)}
                />
                <SearchButton
                    isOpen={searchOpen}
                    onClick={() => setSearchOpen(!searchOpen)}
                />
            </div>
            <div className='flex gap-x-2.5 items-center w-full md:w-fit mt-3'>


                <div className="text-sm  sm:mt-0 text-gray-500">
                    Showing {visibleItems.length} of {filteredOrders.length} orders
                </div>
                {add && <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={AddNewOrder}
                    className="flex items-center gap-2 p-2  bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition-colors ml-auto md:ml-0"
                >
                    <Plus className="h-4 w-4" />


                </motion.button>}
            </div>
        </div>
    )
}

const FilterButton = ({ isOpen, onClick }) => (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
    >
        <FiFilter className="h-4 w-4" />
        <span>Filters</span>
        {isOpen ? <FiChevronUp className="h-4 w-4" /> : <FiChevronDown className="h-4 w-4" />}
    </motion.button>
);

const SearchButton = ({ isOpen, onClick }) => (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
    >
        <FiSearch className="h-4 w-4" />
        <span>Search Customer</span>
        {isOpen ? <FiChevronUp className="h-4 w-4" /> : <FiChevronDown className="h-4 w-4" />}
    </motion.button>
);

export default FilterButtons