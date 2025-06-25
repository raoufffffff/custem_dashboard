import { motion } from "framer-motion";
import { FiChevronDown } from 'react-icons/fi';

const LoadMoreButton = ({ remaining, onClick }) => (
    <div className="mt-6 flex justify-center">
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
            Show More ({Math.min(10, remaining)})
            <FiChevronDown className="h-4 w-4" />
        </motion.button>
    </div>
);

export default LoadMoreButton