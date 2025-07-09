import { motion } from 'framer-motion'
import CustomImg from '../../../CustomUi/CustomImg';

const CategoriesCard = ({ category, handleRemoveCategory }) => {
    return (
        <motion.div
            className="border  border-gray-200 p-4 rounded-lg relative hover:shadow-md transition-shadow"
            whileHover={{ y: -5 }}
            layout
        >
            <div className=" h-20 md:h-40 overflow-hidden rounded-md mb-3">
                <CustomImg category logo={[category.img]} />
            </div>
            <h3 className="text-lg font-medium text-gray-700 text-center">{category.name}</h3>

            <div className="flex justify-center mt-4 space-x-2">
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRemoveCategory(category.name)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                >
                    حذف
                </motion.button>
            </div>
        </motion.div>
    )
}

export default CategoriesCard