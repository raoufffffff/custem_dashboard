import useUser from '../hooks/useUser'
import { motion } from 'framer-motion'
import CategoriesSction from '../compunent/ModifyWebsiteCom/Categories/CategoriesSction'
import UpdateWebsite from '../compunent/ModifyWebsiteCom/Update/UpdateWebsite'

const ModifyWebsite = () => {
    const { Categories, loading, handleUpdateCategory, website } = useUser()
    // دالة لمعالجة رفع صورة الفئة
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
            <CategoriesSction
                repoName={website.repoName}
                Categories={Categories}
                handleUpdateCategory={handleUpdateCategory}
            />
            <UpdateWebsite website={website} />
            {/* تفاصيل الموقع */}

        </motion.div>
    )
}

export default ModifyWebsite