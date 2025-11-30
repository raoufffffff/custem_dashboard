import { useState } from 'react'
import PageContainer from '../CustomUi/PageContainer'
import BoxCard from '../CustomUi/BoxCard'
import UseUpdateStore from '../hooks/UseUpdateStore'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import LoadingBar from '../CustomUi/LoadingBar'
import Model from '../CustomUi/Model'
import Tutorial from '../CustomUi/Tutorial'

const AddFacebookPixel = () => {
    const { t } = useTranslation("DelevryComapnesAndPixals");
    const [showTutorial, setShowTutorial] = useState(false);

    const { loading, UpdateStore, website, repoName } = UseUpdateStore()
    const [facebookPixel, setFacebookPixel] = useState({
        name: "",
        id: ""
    })
    if (loading) return <LoadingBar />
    const handleChange = (e) => {
        const { name, value } = e.target
        setFacebookPixel((prev) => ({ ...prev, [name]: value }))
    }
    const showtutorial = () => {
        setShowTutorial(true);
    };
    const hideTutorial = () => {
        setShowTutorial(false);
    }


    return (
        <PageContainer
            onClick={showtutorial}
            learn
            titel={t("add")}
            about={t("FacebookPixel")}
            className={"gap-6 relative"} // Increased gap for better breathing room

        >
            {showTutorial && (
                <Model
                    onclose={hideTutorial}>
                    <Tutorial about={"https://firebasestorage.googleapis.com/v0/b/tawssilatrest.appspot.com/o/%D8%A5%D8%B6%D8%A7%D9%81%D8%A9%20facebook%20pixel%20%D9%84%D9%85%D9%86%D8%B5%D8%A9%20next%20comerce.mp4?alt=media&token=3bac7bd5-db6e-4a44-842d-0342b18acaa8"} />
                </Model>
            )}
            {website?.facebookPixel && <BoxCard
                about={t("CurrentPixel")}
                className="bg-white rounded-2xl shadow p-6 space-y-4"
            >
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-200 text-gray-600 uppercase text-sm">
                                <th className="px-4 py-2 font-semibold">{t("Name")}</th>
                                <th className="px-4 py-2 font-semibold">{t("PixelID")}</th>
                                <th className="px-4 py-2 font-semibold text-right">{t("Action")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                                <td className="px-4 py-4 text-gray-800">{website?.facebookPixel.name}</td>
                                <td className="px-4 py-4 text-gray-500 font-mono">{website?.facebookPixel.id}</td>
                                <td className="px-4 py-4 text-right">
                                    <button
                                        onClick={() => {
                                            UpdateStore({
                                                ...website,
                                                repoName: repoName,
                                                facebookPixel: {
                                                    name: "",
                                                    id: ""
                                                }
                                            })
                                        }}
                                        className="
                                    px-4 py-2 text-sm font-semibold
                                    text-white bg-red-600 rounded-full
                                    hover:bg-red-700 transition-colors duration-200
                                ">
                                        {t("Delete")}
                                    </button>
                                </td>
                            </tr>
                            {/* More rows would go here */}
                        </tbody>
                    </table>
                </div>
            </BoxCard>}

            <BoxCard className=" bg-white rounded-2xl shadow p-6 space-y-4">
                {/* Pixel Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("PixelName")}
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={facebookPixel.name}
                        onChange={handleChange}
                        placeholder="Enter pixel name"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                {/* Pixel ID */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("PixelID")}
                    </label>
                    <input
                        type="text"
                        name="id"
                        value={facebookPixel.id}
                        onChange={handleChange}
                        placeholder="Enter pixel ID"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                {/* Add Button */}
                <div className='mt-5 flex justify-end'>
                    <button
                        onClick={() => {
                            if (facebookPixel.name != "" || facebookPixel.id != "") {
                                UpdateStore({
                                    ...website,
                                    repoName: repoName,
                                    facebookPixel: facebookPixel
                                })
                                return
                            }
                            toast.error("upload your logo")

                        }}
                        className='w-full bg-teal-600 text-white px-4 py-2 rounded-xl shadow-teal-700 hover:bg-teal-700 transition'
                    >
                        {loading ? <Loader2 className="animate-spin mx-auto h-8 w-8 " /> : t("Save")}
                    </button>
                </div>
            </BoxCard>

        </PageContainer>
    )
}

export default AddFacebookPixel
