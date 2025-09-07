import React, { useState } from 'react'
import PageContainer from '../../CustomUi/PageContainer'
import BoxCard from '../../CustomUi/BoxCard'
import { useOutletContext } from 'react-router-dom'

const UpdatePassword = () => {
    const user = useOutletContext()
    const [Password, setPassword] = useState({
        Password: user.Password,
        CurrentPassword: "",
        newPassword: "",
        ConfirmNewPassword: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setPassword((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = () => {
        console.log("Facebook Pixel Data:", Password)
        // 👉 here you can send to API or handle logic
    }
    return (
        <PageContainer
            back={true}
            titel={"Modify "}
            about={"your password"}
        >
            <BoxCard className=" bg-white rounded-2xl shadow p-6 space-y-4">
                {/* Pixel Name */}
                <div>
                    <input
                        type="password"
                        name="CurrentPassword"
                        value={Password.CurrentPassword}
                        onChange={handleChange}
                        placeholder="Enter Current Password"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="newPassword"
                        value={Password.newPassword}
                        onChange={handleChange}
                        placeholder="Enter New Password"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="ConfirmNewPassword"
                        value={Password.ConfirmNewPassword}
                        onChange={handleChange}
                        placeholder="Enter Confirm New Password"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

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

export default UpdatePassword