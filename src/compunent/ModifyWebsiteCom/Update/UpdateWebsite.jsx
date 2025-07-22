import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Loader2, X, Check, ChevronRight } from 'lucide-react'
import axios from 'axios'

import { Link } from 'react-router-dom'
import CustomImg from '../../../CustomUi/CustomImg'
import InputImg from '../../../CustomUi/InputImg'
import handleImageUpload from '../../../utility/UploadImages'

const UpdateWebsite = ({ website }) => {

    const [newWebsiteStyle, setNewWebsiteStyle] = useState({
        id: JSON.parse(localStorage.getItem("user"))._id,
        store_name: website.websiteStyle.store_name || '',
        logo: website.websiteStyle.logo || '',
        main_color: website.websiteStyle.main_color || '',
        phone: website.websiteStyle.phone || '',
        facebook: website.websiteStyle.facebook || '',
        instgarm: website.websiteStyle.instgarm || '',
        tiktok: website.websiteStyle.tiktok || '',
        tiktokP: website.websiteStyle.tiktokP || ''
    })

    const [uploading, setUploading] = useState(false)
    const [updateStatus, setUpdateStatus] = useState({
        loading: false,
        error: "",
        success: false
    })


    const ImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setUploading(true);
        try {
            const res = await handleImageUpload(event)
            setNewWebsiteStyle((prev) => ({ ...prev, logo: res }));
        } catch {
            console.log("err");

        } finally {
            setUploading(false);
        }
    }

    const removeImage = () => setNewWebsiteStyle(prev => ({ ...prev, logo: "" }))

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewWebsiteStyle(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setUpdateStatus({ loading: true, error: "", success: false })

        try {
            // Replace with your actual API endpoint
            await axios.put(`https://next-website-server.vercel.app/update-template`, { ...newWebsiteStyle, name: website.repoName, email: website.websiteStyle.email })
            setUpdateStatus({ loading: false, error: "", success: true })
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Failed to update website. Please try again."
            setUpdateStatus({
                loading: false,
                error: errorMessage,
                success: false
            })
        }
    }



    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Update Your Website</h1>
                    <p className="mt-2 text-gray-600">Modify your website details below</p>
                </div>

                {updateStatus.error && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
                    >
                        <div className="mx-4 flex items-center rounded-lg bg-red-50 p-4 text-red-700 shadow-lg ring-1 ring-red-100">
                            <X className="h-5 w-5 flex-shrink-0" />
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium">{updateStatus.error}</p>
                            </div>
                            <button
                                onClick={() => setUpdateStatus(p => ({ ...p, error: "" }))}
                                className="ml-2 text-red-500 hover:text-red-700"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </motion.div>
                )}

                {updateStatus.success && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
                        onClick={() => setUpdateStatus({ ...updateStatus, success: false })}
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
                                        Website Updated Successfully!
                                    </h3>
                                    <div className="mt-2 text-sm text-gray-500">
                                        <p>Your changes have been saved.</p>
                                    </div>
                                </div>
                            </div>

                        </motion.div>
                    </motion.div>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-6 sm:p-8">
                        <div className="space-y-6">
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
                                        value={newWebsiteStyle.store_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        TikTok pixel
                                    </label>
                                    <input
                                        type="text"
                                        name="tiktokP"
                                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        placeholder="My Awesome Store"
                                        value={newWebsiteStyle.tiktokP}
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
                                        value={newWebsiteStyle.phone}
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
                                                value={newWebsiteStyle.main_color}
                                                onChange={handleChange}
                                            />

                                            <div
                                                className="absolute inset-0 rounded-lg border border-gray-300 pointer-events-none"
                                                style={{ background: newWebsiteStyle.main_color }}
                                            />
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-2 rounded-lg">
                                            {newWebsiteStyle.main_color}
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
                                        value={newWebsiteStyle.facebook}
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
                                        value={newWebsiteStyle.instgarm}
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
                                        value={newWebsiteStyle.tiktok}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Logo Upload */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Store Logo
                                </label>
                                {newWebsiteStyle.logo ? (
                                    <CustomImg logo={[newWebsiteStyle.logo]} removeImage={removeImage} />
                                ) : (
                                    <InputImg
                                        uploading={uploading}
                                        ImageUpload={ImageUpload}
                                    />
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <motion.button
                                    type="submit"
                                    disabled={updateStatus.loading}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${updateStatus.loading ? 'opacity-80 cursor-not-allowed' : ''
                                        }`}
                                >
                                    {updateStatus.loading ? (
                                        <>
                                            <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                            Updating Website...
                                        </>
                                    ) : (
                                        'Update Website'
                                    )}
                                </motion.button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateWebsite