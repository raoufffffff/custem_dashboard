import { useState, useRef } from 'react'
import useUser from '../hooks/useUser'
import { motion } from 'framer-motion'
import InputImg from '../CustomUi/InputImg'
import handleImageUpload from '../utility/UploadImages'
import CustomImg from '../CustomUi/CustomImg'

const ModifyWebsite = () => {
    const { Categories, loading, handleUpdateCategory } = useUser()
    const [newCategory, setNewCategory] = useState({ name: '', img: null })
    const [uploading, setUploading] = useState(false);

    const [websiteDetails, setWebsiteDetails] = useState({
        name: '',
        logo: null,
        links: []
    })
    const [newLink, setNewLink] = useState('')
    const logoInputRef = useRef(null)
    const removeImage = () => setNewCategory((prev) => ({ ...prev, img: "" }));
    // دالة لمعالجة رفع صورة الفئة
    const ImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setUploading(true);
        try {
            const res = await handleImageUpload(event)
            setNewCategory((prev) => ({ ...prev, img: res }));
        } catch {
            console.log("err");

        } finally {
            setUploading(false);
        }
    }

    // دالة لمعالجة رفع شعار الموقع
    const handleLogoUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setWebsiteDetails({ ...websiteDetails, logo: reader.result })
            }
            reader.readAsDataURL(file)
        }
    }

    const handleAddCategory = () => {
        // دالة لإضافة فئة جديدة
    }



    const handleRemoveCategory = (index) => {
        // دالة لحذف فئة
    }

    const handleAddLink = () => {
        // دالة لإضافة رابط جديد
    }

    const handleRemoveLink = (index) => {
        // دالة لحذف رابط
    }

    const handleSaveChanges = () => {
        // دالة لحفظ جميع التغييرات
    }

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    )

    return (
        <motion.div
            dir='rtl'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-6 max-w-4xl mx-auto"
        >
            <h1 className="text-3xl font-bold mb-8 text-center ">تعديل الموقع الإلكتروني</h1>

            {/* قسم الفئات */}
            <motion.div
                className="mb-12 p-6 bg-white rounded-lg shadow-lg"
                whileHover={{ scale: 1.01 }}
            >
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">فئات الموقع</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {Categories.map((category, index) => (
                        <motion.div
                            key={index}
                            className="border border-gray-200 p-4 rounded-lg relative hover:shadow-md transition-shadow"
                            whileHover={{ y: -5 }}
                            layout
                        >
                            <div className="h-40 overflow-hidden rounded-md mb-3">
                                <CustomImg category logo={[category.img]} />
                            </div>
                            <h3 className="text-lg font-medium text-gray-700 text-center">{category.name}</h3>

                            <div className="flex justify-center mt-4 space-x-2">
                                <motion.button
                                    whileTap={{ scale: 0.95 }}

                                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
                                >
                                    تعديل
                                </motion.button>
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleRemoveCategory(index)}
                                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                                >
                                    حذف
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* إضافة فئة جديدة */}
                <motion.div
                    className="border-t pt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <h3 className="text-xl font-medium mb-4 text-gray-800">إضافة فئة جديدة</h3>
                    <div className="flex flex-col space-y-4">
                        <input
                            type="text"
                            placeholder="اسم الفئة"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        {newCategory.img ?
                            <CustomImg logo={[newCategory.img]} removeImage={removeImage} />
                            : <InputImg ImageUpload={ImageUpload} uploading={uploading} />}

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                                handleUpdateCategory(newCategory)
                                setNewCategory({ name: '', img: null })
                            }}
                            disabled={!newCategory.name || !newCategory.img}
                            className={`px-4 py-2 rounded-md self-end ${(!newCategory.name || !newCategory.img) ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'}`}
                        >
                            إضافة فئة
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>

            {/* تفاصيل الموقع */}
            <motion.div
                className="p-6 bg-white rounded-lg shadow-lg mb-12"
                whileHover={{ scale: 1.01 }}
            >
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">تفاصيل الموقع</h2>

                <div className="space-y-6">
                    <div>
                        <label className="block mb-2 text-gray-700">اسم الموقع</label>
                        <input
                            type="text"
                            value={websiteDetails.name}
                            onChange={(e) => setWebsiteDetails({ ...websiteDetails, name: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-gray-700">شعار الموقع</label>
                        <div className="flex items-center space-x-6">
                            <div>
                                <input
                                    type="file"
                                    ref={logoInputRef}
                                    onChange={handleLogoUpload}
                                    accept="image/*"
                                    className="hidden"
                                />
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => logoInputRef.current.click()}
                                    className="py-2 px-4 bg-blue-50 text-blue-600 rounded-md border border-blue-200 hover:bg-blue-100"
                                >
                                    {websiteDetails.logo ? 'تغيير الشعار' : 'اختر شعار'}
                                </motion.button>
                            </div>
                            {websiteDetails.logo && (
                                <motion.div
                                    className="h-20 w-20 rounded-full overflow-hidden border-2 border-purple-200"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <img
                                        src={websiteDetails.logo}
                                        alt="شعار الموقع"
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2 text-gray-700">روابط الموقع</label>
                        <div className="space-y-3 mb-4">
                            {websiteDetails.links.map((link, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <span className="flex-1 p-3 bg-gray-50 rounded-md border text-gray-700 overflow-x-auto">{link}</span>
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleRemoveLink(index)}
                                        className="ml-3 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                                    >
                                        حذف
                                    </motion.button>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex space-x-3">
                            <input
                                type="text"
                                placeholder="أضف رابط جديد (مثال: https://example.com)"
                                value={newLink}
                                onChange={(e) => setNewLink(e.target.value)}
                                className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleAddLink}
                                disabled={!newLink}
                                className={`px-4 py-2 rounded-md ${!newLink ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                            >
                                إضافة
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* زر الحفظ */}
            <motion.div
                className="flex justify-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <motion.button
                    onClick={handleSaveChanges}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg font-medium"
                    whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(147, 51, 234, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                >
                    حفظ التغييرات
                </motion.button>
            </motion.div>
        </motion.div>
    )
}

export default ModifyWebsite