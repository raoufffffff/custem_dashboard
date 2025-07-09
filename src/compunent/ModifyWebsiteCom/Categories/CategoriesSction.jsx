import { useState } from 'react';
import handleImageUpload from '../../../utility/UploadImages';
import { motion } from 'framer-motion'
import CustomImg from '../../../CustomUi/CustomImg';
import InputImg from '../../../CustomUi/InputImg';
import CategoriesCard from './CategoriesCard';

const CategoriesSction = ({ handleUpdateCategory, Categories, repoName }) => {
    const [newCategory, setNewCategory] = useState({ name: '', img: null })
    const [uploading, setUploading] = useState(false);

    const removeImage = () => setNewCategory((prev) => ({ ...prev, img: "" }));

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

    const handleRemoveCategory = (name) => {
        let newcat = Categories.filter(e => {
            return e.name == name ? null : e
        })
        handleUpdateCategory(newcat, repoName)
    }

    return (
        <motion.div
            className="mb-12 p-6 bg-white rounded-lg shadow-lg"
            whileHover={{ scale: 1.01 }}
        >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">فئات الموقع</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                {Categories.map((category, index) => (
                    <CategoriesCard key={index} category={category} handleRemoveCategory={handleRemoveCategory} />
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
                            handleUpdateCategory([...Categories, newCategory], repoName)
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
    )
}

export default CategoriesSction