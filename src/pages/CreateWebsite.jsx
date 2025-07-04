import { useState } from 'react';
import { motion } from 'framer-motion';
import handleImageUpload from '../utility/UploadImages';
import useUser from '../hooks/useUser';
import { Loader2, X, Upload, Check } from 'lucide-react';
import axios from 'axios';
import InputImg from '../CustomUi/InputImg';
import CustomImg from '../CustomUi/CustomImg';

const CreateWebsite = () => {
    const { _id, loading, email } = useUser()

    const [formData, setFormData] = useState({
        name: '',
        store_name: '',
        logo: '',
        main_color: '#3b82f6', // Changed to blue-500 as default
        phone: '',
        facebook: '',
        instgarm: '',
        tiktok: '',
    });

    const [uploading, setUploading] = useState(false);
    const [creationStatus, setCreationStatus] = useState({
        loading: false,
        error: "",
        success: false,
        link: ""
    });

    const [domainAvailable, setDomainAvailable] = useState(null);

    const ImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setUploading(true);
        try {
            const res = await handleImageUpload(event)
            setFormData((prev) => ({ ...prev, logo: res }));
        } catch {
            setCreationStatus(p => ({ ...p, error: 'Failed to upload image' }));
        } finally {
            setUploading(false);
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Check domain availability when name changes

    };


    const checkDomainAvailability = async () => {
        if (formData.name > 0) return
        try {
            const response = await axios.put(`https://true-fit-dz-api.vercel.app/user/check/domain`, { name: formData.name });
            setDomainAvailable(response.data.available);
        } catch {
            setDomainAvailable(false);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setCreationStatus({ loading: true, error: "", success: false });

        // Validate domain name format
        if (!/^[a-z0-9-]+$/.test(formData.name)) {
            setCreationStatus({
                loading: false,
                error: "Domain can only contain lowercase letters, numbers, and hyphens",
                success: false
            });
            return;
        }
        if (!domainAvailable) {
            setCreationStatus({
                loading: false,
                error: "هذا النطاق غير متاح",
                success: false
            });
            return;
        }

        const data = { ...formData, id: _id, email: email }
        try {
            const response = await axios.post(`https://next-website-server.vercel.app/create-template`, data);
            setCreationStatus({ loading: false, error: "", success: true, link: response.data.link });

            // Show success message before redirecting

        } catch (err) {
            const errorMessage = err.response?.data?.message ||
                (err.response?.status === 409 ? "This domain is already taken" :
                    "Failed to create website. Please try again.");
            setCreationStatus({
                loading: false,
                error: errorMessage,
                success: false,
                link: ""
            });
        }
    };

    const removeImage = () => setFormData((prev) => ({ ...prev, logo: "" }));

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">إنشاء موقع جديد</h1>
                    <p className="mt-2 text-gray-600">املأ النموذج أدناه لإنشاء موقعك الإلكتروني</p>
                </div>

                {creationStatus.error && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-6 left-1/2 z-50 w-full max-w-md -translate-x-1/2"
                    >
                        <div className="mx-4 flex items-start rounded-lg bg-red-50 p-4 text-red-700 shadow-lg ring-1 ring-red-100">
                            <X className="h-5 w-5 flex-shrink-0" />
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium">{creationStatus.error}</p>
                            </div>
                            <button
                                onClick={() => setCreationStatus(p => ({ ...p, error: "" }))}
                                className="ml-2 text-red-500 hover:text-red-700"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </motion.div>
                )}

                {creationStatus.success && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
                        >
                            <div className="mb-5 flex items-start">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                                    <Check className="h-6 w-6 text-green-600" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        تم إنشاء الموقع بنجاح!
                                    </h3>
                                    <div className="mt-2 text-sm text-gray-500">
                                        <p>جاري التوجيه إلى موقعك الجديد...</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 flex justify-between">
                                <a
                                    href={creationStatus.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                >
                                    زيارة الموقع الآن
                                </a>
                                <button
                                    onClick={() => setCreationStatus(p => ({ ...p, success: false }))}
                                    className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                >
                                    إغلاق
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            اسم النطاق <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500">https://</span>
                            </div>
                            <input
                                type="text"
                                name="name"
                                className={`block w-full pl-16 pr-12 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${domainAvailable ? "border-green-600" : "border-red-600"}`}
                                placeholder="example"
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={checkDomainAvailability}
                                required
                                minLength={3}
                                maxLength={30}
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <span className="text-gray-500">.vacel.com</span>
                            </div>
                        </div>
                        {formData.name.length > 0 && (
                            <p className={`text-xs mt-1 ${domainAvailable === true ? 'text-green-600' :
                                domainAvailable === false ? 'text-red-600' : 'text-gray-500'
                                }`}>
                                {domainAvailable === true ? 'هذا النطاق متاح' :
                                    domainAvailable === false ? 'هذا النطاق غير متاح' :
                                        'جارٍ التحقق من توفر النطاق...'}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-6 ">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                اسم المتجر <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="store_name"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="اسم المتجر"
                                value={formData.store_name}
                                onChange={handleChange}
                                required
                            />
                        </div>


                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                رقم الهاتف
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="0676..."
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                اللون الرئيسي
                            </label>
                            <div className="mt-1 flex items-center">
                                <input
                                    type="color"
                                    name="main_color"
                                    className="w-10 h-10 border border-gray-300 rounded cursor-pointer mr-3"
                                    value={formData.main_color}
                                    onChange={handleChange}
                                />
                                <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded">
                                    {formData.main_color}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-700">روابط التواصل الاجتماعي</h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Facebook
                            </label>
                            <input
                                type="url"
                                name="facebook"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="https://facebook.com/..."
                                value={formData.facebook}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Instagram
                            </label>
                            <input
                                type="url"
                                name="instgarm"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="https://instagram.com/..."
                                value={formData.instgarm}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                TikTok
                            </label>
                            <input
                                type="url"
                                name="tiktok"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="https://tiktok.com/..."
                                value={formData.tiktok}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {formData.logo ? <CustomImg logo={[formData.logo]} removeImage={removeImage} /> :
                        (
                            <InputImg
                                uploading={uploading}
                                logo={formData.logo}
                                ImageUpload={ImageUpload}
                                removeImage={removeImage}

                            />
                        )
                    }
                    <div className="pt-4">
                        <motion.button
                            type="submit"
                            disabled={creationStatus.loading}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${creationStatus.loading ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                        >
                            {creationStatus.loading ? (
                                <>
                                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                    جاري الإنشاء...
                                </>
                            ) : (
                                'إنشاء الموقع'
                            )}
                        </motion.button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateWebsite;