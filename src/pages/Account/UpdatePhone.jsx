import React, { useState } from 'react'
import PageContainer from '../../CustomUi/PageContainer'
import BoxCard from '../../CustomUi/BoxCard'
import { useOutletContext } from 'react-router-dom'
import { useTranslation } from "react-i18next";

const UpdatePhone = () => {
    const { t } = useTranslation("Account");

    const user = useOutletContext()
    const [Phone, setPhone] = useState({
        phone: user.phone,
        newPhone: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setPhone((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = () => {
        console.log("Facebook Pixel Data:", Phone)
        // 👉 here you can send to API or handle logic
    }
    return (
        <PageContainer
            back={true}
            titel={t("Modify")}
            about={t("phonenumber")}
        >
            <BoxCard className=" bg-white rounded-2xl shadow p-6 space-y-4">
                {/* Pixel Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("Currentphonenumber")}
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        disabled
                        value={Phone.phone}
                        onChange={handleChange}
                        placeholder="Enter pixel name"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                {/* Pixel ID */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("newphonenumber")}
                    </label>
                    <input
                        type="email"
                        name="newPhone"
                        value={Phone.newPhone}
                        onChange={handleChange}
                        placeholder="Enter new Phone number"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                {/* Add Button */}
                <button
                    onClick={handleSubmit}
                    className='w-full bg-teal-600 text-white px-4 py-2 rounded-xl shadow-teal-700 hover:bg-teal-700 transition'
                >
                    {t("Confirm")}
                </button>
            </BoxCard>

        </PageContainer>
    )
}

export default UpdatePhone