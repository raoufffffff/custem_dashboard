import { motion } from 'framer-motion';

const PageContainer = ({ className, children, titel, about }) => {
    return (
        <motion.div
            exit={{ x: 1000 }}
            initial={{ x: 1000 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.1 }}
            className={`flex w-full flex-col justify-center items-center gap-5 md:gap-10 px-0 md:px-5 pt-4 ${className}`}
        >
            <h1
                className='!leading-[115%] w-full  mx-auto text-2xl md:text-3xl font-bold text-neutral-900 ltr:first-letter:uppercase flex items-center flex-wrap gap-2'
            >{titel}
                <span
                    className='text-red-500'
                >
                    {about}
                </span>
            </h1>
            {children}
        </motion.div>
    )
}

export default PageContainer