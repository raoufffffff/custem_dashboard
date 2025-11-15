import React, { useState } from 'react'
import PageContainer from '../../CustomUi/PageContainer'
import BoxCard from '../../CustomUi/BoxCard'
import { useOutletContext } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import { Loader2 } from 'lucide-react';
import useUser from '../../hooks/useUser';

const UpdateEmail = () => {
    const { t } = useTranslation("Account");
    const { updateUser, loading } = useUser()

    const user = useOutletContext()
    const [save, setsave] = useState(false)

    const [Email, setEmail] = useState({
        email: user.email,
        newEmail: ""
    })
    const handleChange = (e) => {
        setsave(true)

        const { name, value } = e.target
        setEmail((prev) => ({ ...prev, [name]: value }))
    }


    return (
        <PageContainer
            back={true}
            titel={t("Modify")}
            about={t("your email")}
        >
            <BoxCard className=" bg-white rounded-2xl shadow p-6 space-y-4">
                {/* Pixel Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("Current Email")}
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
                        {t("newemail")}
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
                    disabled={!save}
                    onClick={() => {
                        updateUser({ email: Email.newEmail })
                        setEmail({
                            email: Email.newEmail,
                            newEmail: ""
                        })
                    }}
                    className={`w-full  text-white px-4 py-2 rounded-xl  transition ${save ? "bg-teal-600 shadow-teal-700 hover:bg-teal-700" : "bg-[#616161]"}`}
                >
                    {loading ? <Loader2 className="animate-spin mx-auto h-8 w-8 " /> : t("Confirm")}

                </button>
            </BoxCard>

        </PageContainer>
    )
}

export default UpdateEmail