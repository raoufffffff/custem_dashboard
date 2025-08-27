import { motion } from 'framer-motion';
import { Loader2, X, Upload } from 'lucide-react';

const InputImg = ({ uploading, ImageUpload, label = "شعار الموقع", multiple = false }) => {
    return (
        <div
        >
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>


            <div className="flex items-center space-x-4">
                <motion.label
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 flex items-center justify-center px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer ${uploading ? 'border-blue-300 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
                        }`}
                >
                    <div className="text-center">
                        {uploading ? (
                            <Loader2 className="animate-spin h-5 w-5 text-blue-500 mx-auto" />
                        ) : (
                            <>
                                <Upload className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                                <p className="text-sm text-gray-600">
                                    Choose an image
                                </p>
                                <p className="text-xs text-gray-500 mt-1">PNG, JPG (maximum 2MB)</p>
                            </>
                        )}
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        multiple={multiple}
                        onChange={ImageUpload}
                        className="hidden"
                        disabled={uploading}
                    />
                </motion.label>


            </div>

        </div>
    )
}

export default InputImg