import { useState } from 'react'
import PageContainer from '../CustomUi/PageContainer'
import BoxCard from '../CustomUi/BoxCard'

const AddFacebookPixel = () => {
    const [facebookPixel, setFacebookPixel] = useState({
        name: "",
        id: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFacebookPixel((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = () => {
        console.log("Facebook Pixel Data:", facebookPixel)
        // 👉 here you can send to API or handle logic
    }

    return (
        <PageContainer
            titel={"Add"}
            about={"Facebook Pixel"}
        >
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
            </BoxCard>
            <button
                onClick={handleSubmit}
                className='w-full bg-teal-600 text-white px-4 py-2 rounded-xl shadow-teal-700 hover:bg-teal-700 transition'
            >
                Add Pixel
            </button>
        </PageContainer>
    )
}

export default AddFacebookPixel
