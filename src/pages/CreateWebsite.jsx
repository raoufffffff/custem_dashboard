import { useState } from 'react';
import { motion } from 'framer-motion';
import handleImageUpload from '../utility/UploadImages';
import useUser from '../hooks/useUser';
import { Loader2, X, Upload, Check, ChevronRight } from 'lucide-react';
import axios from 'axios';
import InputImg from '../CustomUi/InputImg';
import CustomImg from '../CustomUi/CustomImg';
import { Link } from 'react-router-dom';

const CreateWebsite = () => {
    const { _id, loading, email } = useUser()

    const [formData, setFormData] = useState({
        name: '',
        store_name: '',
        logo: '',
        main_color: '#3b82f6',
        phone: '',
        facebook: '',
        instgarm: '',
        tiktok: '',
        tiktokP: ""
    });

    const [uploading, setUploading] = useState(false);
    const [creationStatus, setCreationStatus] = useState({
        loading: false,
        error: "",
        success: false,
        link: ""
    });
    console.log(_id);

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
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-white">
                <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const checkDomainAvailability = async () => {
        if (formData.name.length === 0) return;
        try {
            const response = await axios.put(`https://true-fit-dz-api.vercel.app/user/check/domain`, { name: `${formData.name}-dzcommerce` });
            setDomainAvailable(response.data.available);
        } catch {
            setDomainAvailable(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCreationStatus({ loading: true, error: "", success: false });

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
            await new Promise(resolve => setTimeout(resolve, 8000));

            setCreationStatus({ loading: false, error: "", success: true, link: response.data.link });

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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Create Your Website</h1>
                    <p className="mt-2 text-gray-600">Fill in the details below to launch your online presence</p>
                </div>

                {creationStatus.error && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
                    >
                        <div className="mx-4 flex items-center rounded-lg bg-red-50 p-4 text-red-700 shadow-lg ring-1 ring-red-100">
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
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', damping: 20 }}
                            className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl"
                        >
                            <div className="mb-5 flex items-start">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                                    <Check className="h-6 w-6 text-green-600" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Website Created Successfully!
                                    </h3>
                                    <div className="mt-2 text-sm text-gray-500">
                                        <p>Redirecting to your new website...</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 flex justify-between">
                                <a
                                    href={`https://${creationStatus.link}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center rounded-md bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                                >
                                    Visit Website Now <ChevronRight className="ml-1 h-4 w-4" />
                                </a>
                                <Link
                                    to={'/'}
                                    className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                                >
                                    Close
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-6 sm:p-8">
                        <div className="space-y-6">
                            {/* Domain Section */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Domain Name <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500">https://</span>
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        className={`block w-full pl-16 pr-28 border ${domainAvailable === true ? 'border-green-500' : domainAvailable === false ? 'border-red-500' : 'border-gray-300'} rounded-lg py-2.5 px-3 focus:outline-none focus:ring-2 ${domainAvailable === true ? 'focus:ring-green-500 focus:border-green-500' : domainAvailable === false ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-blue-500 focus:border-blue-500'} transition-all`}
                                        placeholder="yourbusiness"
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
                                        {domainAvailable === true ? 'Domain is available' :
                                            domainAvailable === false ? 'Domain is not available' :
                                                'Checking domain availability...'}
                                    </p>
                                )}
                            </div>

                            {/* Store Info Section */}
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Store Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="store_name"
                                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        placeholder="My Awesome Store"
                                        value={formData.store_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Contact & Color Section */}
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        placeholder="0676..."
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Primary Color
                                    </label>
                                    <div className="mt-1 flex items-center space-x-4">
                                        <div className="relative">
                                            <input
                                                type="color"
                                                name="main_color"
                                                className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer appearance-none bg-transparent"
                                                value={formData.main_color}
                                                onChange={handleChange}
                                            />
                                            <div
                                                className="absolute inset-0 rounded-lg border border-gray-300 pointer-events-none"
                                                style={{ background: formData.main_color }}
                                            />
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-2 rounded-lg">
                                            {formData.main_color}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media Section */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-gray-700">Social Media Links</h3>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Facebook
                                    </label>
                                    <input
                                        type="url"
                                        name="facebook"
                                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        placeholder="https://facebook.com/yourpage"
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
                                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        placeholder="https://instagram.com/yourprofile"
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
                                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        placeholder="https://tiktok.com/@yourusername"
                                        value={formData.tiktok}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Logo Upload */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Store Logo
                                </label>
                                {formData.logo ? (
                                    <CustomImg logo={[formData.logo]} removeImage={removeImage} />
                                ) : (
                                    <InputImg
                                        ImageUpload={ImageUpload}
                                        uploading={uploading}
                                    />
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <motion.button
                                    type="submit"
                                    disabled={creationStatus.loading}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${creationStatus.loading ? 'opacity-80 cursor-not-allowed' : ''
                                        }`}
                                >
                                    {creationStatus.loading ? (
                                        <>
                                            <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                            Creating Website...
                                        </>
                                    ) : (
                                        'Create Website'
                                    )}
                                </motion.button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateWebsite;