import { useState } from 'react';
import { motion } from 'framer-motion';
import handleImageUpload from '../utility/UploadImages';
import useUser from '../hooks/useUser';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateWebsite = () => {
    const { _id, loading } = useUser()
    const router = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        store_name: '',
        logo: '',
        main_color: '#000000',
        phone: '',
        facebook: '',
        instgarm: '',
        tiktok: '',
        email: ''
    });
    const [uploading, setUploading] = useState(false);
    const ImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setUploading(true);
        try {
            const res = await handleImageUpload(file)
            setFormData((prev) => ({ ...prev, logo: res }));

        } catch (err) {
            console.error('Upload error:', err);

        } finally {
            setUploading(false);
        }
    }
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { ...formData, id: _id }
        try {
            await axios.post(`https://next-website-server.vercel.app/create-template`, data)
                .then(() => {
                    router('/')
                })
        } catch {
            console.log("err");

        }


    };
    const removeImage = () => setFormData((prev) => ({ ...prev, logo: "" }))
    return (
        <div className="p-4 max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-4">إنشاء موقع جديد</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label>اسم النطاق (سيكون بصيغة https://{formData.name}.vacel.com)</label>
                    <input
                        type="text"
                        name='name'
                        className="w-full border p-2"
                        placeholder="example"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>البريد الإلكتروني</label>
                    <input
                        type="email"
                        name="email"
                        className="w-full border p-2"
                        placeholder="hello@example.com"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>اسم المتجر</label>
                    <input
                        type="text"
                        name="store_name"
                        className="w-full border p-2"
                        placeholder="اسم المتجر"
                        value={formData.store_name}
                        onChange={handleChange}
                        required
                    />
                </div>



                <div className="text-right">
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        اللون الرئيسي (HEX)
                    </label>
                    <div className="flex items-center justify-between border rounded px-3 py-2">
                        <span className="text-sm text-gray-600">
                            {formData.main_color}
                        </span>
                        <input
                            type="color"
                            name="main_color"
                            className="w-10 h-10 border-none cursor-pointer"
                            value={formData.main_color}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div>
                    <label>رقم الهاتف</label>
                    <input
                        type="text"
                        name="phone"
                        className="w-full border p-2"
                        placeholder="0676..."
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Facebook</label>
                    <input
                        type="url"
                        name="facebook"
                        className="w-full border p-2"
                        placeholder="https://facebook.com/..."
                        value={formData.facebook}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Instagram</label>
                    <input
                        type="url"
                        name="instgarm"
                        className="w-full border p-2"
                        placeholder="https://instagram.com/..."
                        value={formData.instgarm}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>TikTok</label>
                    <input
                        type="url"
                        name="tiktok"
                        className="w-full border p-2"
                        placeholder="https://tiktok.com/..."
                        value={formData.tiktok}
                        onChange={handleChange}
                    />
                </div>



                <motion.div whileHover={{ scale: 1.01 }}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        website logo
                    </label>
                    <motion.label
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                    >
                        Choose File
                        <input
                            type="file"
                            accept="image/*"
                            onChange={ImageUpload}
                            className="hidden"
                        />
                    </motion.label>
                    {uploading && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs text-gray-500 mt-1"
                        >
                            Uploading...
                        </motion.p>
                    )}
                </motion.div>

                <motion.div
                    layout
                    className="flex flex-wrap gap-3 mt-3"
                >
                    {formData.logo &&
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            className="relative w-24 h-24"
                        >
                            <img
                                src={formData.logo}
                                alt="uploaded"
                                className="w-full h-full object-cover rounded-lg shadow-sm"
                            />
                            <motion.button
                                type="button"
                                onClick={() => removeImage()}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md"
                            >
                                ×
                            </motion.button>
                        </motion.div>
                    }
                </motion.div>

                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    إنشاء الموقع
                </button>
            </form>


        </div>
    );
};

export default CreateWebsite;
