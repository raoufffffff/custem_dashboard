import React, { useState } from 'react'
import PageContainer from '../CustomUi/PageContainer'
import BoxCard from '../CustomUi/BoxCard'
import UseUpdateStore from '../hooks/UseUpdateStore'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const AddTiktokPixel = () => {
    const { t } = useTranslation("DelevryComapnesAndPixals");

    const { loading, UpdateStore, website, repoName } = UseUpdateStore()
    const [TiktokPixel, setTiktokPixel] = useState({
        name: "",
        id: ""
    })
    if (loading) return <p>loading... </p>


    const handleChange = (e) => {
        const { name, value } = e.target
        setTiktokPixel((prev) => ({ ...prev, [name]: value }))
    }


    return (
        <PageContainer
            titel={t("add")}
            about={t("TiktokPixel")}
        >
            {website?.TiktokPixel && <BoxCard
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
                                <td className="px-4 py-4 text-gray-800">{website?.TiktokPixel.name}</td>
                                <td className="px-4 py-4 text-gray-500 font-mono">{website?.TiktokPixel.id}</td>
                                <td className="px-4 py-4 text-right">
                                    <button
                                        onClick={() => {
                                            UpdateStore({
                                                ...website,
                                                repoName: repoName,
                                                TiktokPixel: {
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
                                        Delete
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
                        value={TiktokPixel.name}
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
                        value={TiktokPixel.id}
                        onChange={handleChange}
                        placeholder="Enter pixel ID"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                {/* Add Button */}
                <div className='mt-5 flex justify-end'>
                    <button
                        onClick={() => {
                            if (TiktokPixel.name != "" || TiktokPixel.id != "") {
                                UpdateStore({
                                    ...website,
                                    repoName: repoName,
                                    TiktokPixel: TiktokPixel
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

export default AddTiktokPixel