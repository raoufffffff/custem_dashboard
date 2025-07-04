import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const CustomImg = ({ logo = [], removeImage, tabel = false, category = false }) => {
    return (
        <PhotoProvider>
            {logo.map((e, i) => (
                <PhotoView key={i} src={e}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`${category ? "w-full h-full" : tabel ? "h-10 w-10 rounded-full object-cover" : "relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200"} `}
                    >
                        <img src={e} alt={i} />
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