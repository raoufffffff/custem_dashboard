import { motion } from 'framer-motion';
import { SquarePlay } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const PageContainer = ({ className, children, titel, about, back = false, learn = false, onClick }) => {
    const navigate = useNavigate();
    const { t } = useTranslation("constanst");

    return (
        <motion.div
            exit={{ opacity: 0, y: 50 }}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`
                flex  flex-col items-center gap-6 md:gap-8
                p-4 md:p-8 rounded-2xl shadow-lg
                bg-white mx-auto w-full md:w-[90%] mt-2.5
                ${className}
            `}
        >
            {back &&
                <button
                    onClick={() => navigate(-1)}
                    className='
                        flex items-center self-start
                        px-4 py-2 rounded-full
                        text-sm font-medium text-gray-600
                        bg-gray-100 hover:bg-gray-200
                        transition-colors duration-200
                        -mt-4 -ml-4
                    '
                >
                    <FaArrowLeft className='mr-2' />
                    <span>{t("Return")}</span>
                </button>
            }
            <div className='w-full'>
                <h1
                    className='
                        text-3xl md:text-4xl font-extrabold
                        text-gray-900 leading-tight
                        border-b-2 border-teal-500 pb-2 flex justify-between
                    '
                >
                    <span>

                        {titel}
                    </span>
                    {learn && (
                        <button
                            onClick={onClick}
                            className='animate-bounce'
                        >
                            <SquarePlay
                                className='text-purple-600 cursor-pointer ' />
                        </button>
                    )}
                </h1>

                {about && (
                    <p className='
                        mt-2 text-lg text-gray-500
                    '>
                        {about}
                    </p>
                )}

            </div>
            {children}
        </motion.div>
    )
}

export default PageContainer;