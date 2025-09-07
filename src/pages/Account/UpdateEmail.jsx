import React, { useState } from 'react'
import PageContainer from '../../CustomUi/PageContainer'
import BoxCard from '../../CustomUi/BoxCard'
import { useOutletContext } from 'react-router-dom'
const UpdateEmail = () => {
    const user = useOutletContext()
    const [Email, setEmail] = useState({
        email: user.email,
        newEmail: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setEmail((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = () => {
        console.log("Facebook Pixel Data:", Email)
        // 👉 here you can send to API or handle logic
    }
    return (
        <PageContainer
            back={true}
            titel={"Modify "}
            about={"your email "}
        >
            <BoxCard className=" bg-white rounded-2xl shadow p-6 space-y-4">
                {/* Pixel Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Email
                    </label>
                    <input
                        type="text"
                        name="email"
                        disabled
                        value={Email.email}
                        onChange={handleChange}
                        placeholder="Enter pixel name"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                {/* Pixel ID */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        new email
                    </label>
                    <input
                        type="email"
                        name="newEmail"
                        value={Email.newEmail}
                        onChange={handleChange}
                        placeholder="Enter new Email"
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

export default UpdateEmail