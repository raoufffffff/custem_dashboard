import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const CustomImg = ({ logo = [], removeImage, tabel = false, category = false, big = false }) => {
    return (
        <PhotoProvider>
            {logo.map((e, i) => (
                <PhotoView key={i} src={e}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`${category ? "w-full h-full" : tabel ? "object-cover rounded-full" : "relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200"} ${big ? "w-32 h-32 md:w-44 md:h-44" : "w-10 h-10"} cursor-pointer`}
                    >
                        <img
                            className='w-full h-full object-cover'
                            src={e} alt={i} />
                        {removeImage && <button
                            type="button"
                            onClick={(event) => {
                                event.stopPropagation(); // This stops the event from bubbling up
                                removeImage(e);
                            }}
                            className="absolute top-1 right-1 bg-red-600 rounded-full p-0.5 shadow-sm hover:bg-gray-100"
                        >
                            <X className="h-4 w-4 text-white" />
                        </button>}
                    </motion.div>
                </PhotoView>
            ))}
        </PhotoProvider>
    )
}

export default CustomImg;