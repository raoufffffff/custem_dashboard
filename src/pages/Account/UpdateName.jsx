import React, { useState } from 'react'
import PageContainer from '../../CustomUi/PageContainer'
import BoxCard from '../../CustomUi/BoxCard'
import { useOutletContext } from 'react-router-dom'

const UpdateName = () => {
    const user = useOutletContext()
    const [name, setName] = useState({
        name: user.name,
        surname: user.surname || ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setName((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = () => {
        console.log("Facebook Pixel Data:", name)
        // 👉 here you can send to API or handle logic
    }
    return (
        <PageContainer
            back={true}
            titel={"Modify "}
            about={"name and surname"}
        >
            <BoxCard className=" bg-white rounded-2xl shadow p-6 space-y-4">
                {/* Pixel Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={name.name}
                        onChange={handleChange}
                        placeholder="Enter pixel name"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                {/* Pixel ID */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        surname
                    </label>
                    <input
                        type="text"
                        name="surname"
                        value={name.surname}
                        onChange={handleChange}
                        placeholder="Enter pixel ID"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                {/* Add Button */}
                <button
                    onClick={handleSubmit}
                    className='w-full bg-teal-600 text-white px-4 py-2 rounded-xl shadow-teal-700 hover:bg-teal-700 transition'
                >
                    Confirm
                </button>
            </BoxCard>

        </PageContainer>
    )
}

export default UpdateName