import { useState } from 'react'
import PageContainer from '../CustomUi/PageContainer'
import BoxCard from '../CustomUi/BoxCard'
import { useOutletContext } from 'react-router-dom'
import UseUpdateStore from '../hooks/UseUpdateStore'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

const AddFacebookPixel = () => {
    const user = useOutletContext()
    const { website } = user
    const { loading, UpdateStore } = UseUpdateStore()

    const [facebookPixel, setFacebookPixel] = useState({
        name: "",
        id: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFacebookPixel((prev) => ({ ...prev, [name]: value }))
    }



    return (
        <PageContainer
            titel={"Add"}
            about={"Facebook Pixel"}
        >
            {website?.facebookPixel && <BoxCard
                about={"Current Pixel"}
                className="bg-white rounded-2xl shadow p-6 space-y-4"
            >
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-200 text-gray-600 uppercase text-sm">
                                <th className="px-4 py-2 font-semibold">Name</th>
                                <th className="px-4 py-2 font-semibold">Pixel ID</th>
                                <th className="px-4 py-2 font-semibold text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                                <td className="px-4 py-4 text-gray-800">{website?.facebookPixel.name}</td>
                                <td className="px-4 py-4 text-gray-500 font-mono">{website?.facebookPixel.id}</td>
                                <td className="px-4 py-4 text-right">
                                    <button className="
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
                        Pixel Name
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
                        Pixel ID
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
                                    repoName: user.repoName,
                                    facebookPixel: facebookPixel
                                })
                                return
                            }
                            toast.error("upload your logo")

                        }}
                        className='w-full bg-teal-600 text-white px-4 py-2 rounded-xl shadow-teal-700 hover:bg-teal-700 transition'
                    >
                        {loading ? <Loader2 className="animate-spin mx-auto h-8 w-8 " /> : "Save"}                </button>
                </div>
            </BoxCard>

        </PageContainer>
    )
}

export default AddFacebookPixel
