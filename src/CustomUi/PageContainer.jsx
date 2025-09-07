import { motion } from 'framer-motion';
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const PageContainer = ({ className, children, titel, about, back = false }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            exit={{ x: 1000 }}
            initial={{ x: 1000 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.1 }}
            className={`flex w-full flex-col justify-center items-center gap-5 md:gap-10 px-0 md:px-5 pt-4 ${className}`}
        >
            {back &&
                <button
                    onClick={() => navigate(-1)} // go back
                    className='flex items-center self-start px-5'
                >
                    <FaArrowLeft
                        className='mr-2'

                    />
                    <span
                        className='capitalize  text-lg'
                    >
                        return
                    </span>
                </button>
            }
            <h1
                className=' px-5 md:px-0 w-full  mx-auto text-2xl md:text-3xl font-bold text-neutral-900 ltr:first-letter:uppercase flex items-center flex-wrap '
            >{titel}
                <span
                    className='text-teal-500 mx-3'
                >
                    {about}
                </span>
            </h1>
            {children}
        </motion.div>
    )
}

export default PageContainer