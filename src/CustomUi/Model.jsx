import { motion } from 'framer-motion';

const Model = ({ children, onclose, classname }) => {
    return (
        <div

            onClick={onclose}
            className="fixed  inset-0 bg-[#0007] z-[100000] bg-opacity-50 flex items-center justify-center "
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.7, type: "spring" }}
                className={`bg-white w-11/12 md:w-5/12  rounded-lg shadow-lg ${classname}`} onClick={(e) => e.stopPropagation()}>
                {children}
            </motion.div>
        </div>
    )
}

export default Model