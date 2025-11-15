import React, { useState } from 'react'
import PageContainer from '../../CustomUi/PageContainer'
import BoxCard from '../../CustomUi/BoxCard'
import { useTranslation } from "react-i18next";
import useUser from '../../hooks/useUser';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const UpdatePassword = () => {
    const { t } = useTranslation("Account");
    const { updateUser, loading } = useUser()

    const [Password, setPassword] = useState({
        ConfirmNewPassword: "",
        newPassword: "",
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setPassword((prev) => ({ ...prev, [name]: value }))
    }
    return (
        <PageContainer
            back={true}
            titel={t("Modify")}
            about={t("password")}
        >
            {Password.Password}
            {Password.CurrentPassword}
            <BoxCard className=" bg-white rounded-2xl shadow p-6 space-y-4">
                {/* Pixel Name */}
                <div>
                    <input
                        type="password"
                        name="newPassword"
                        value={Password.newPassword}
                        onChange={handleChange}
                        placeholder="Enter Current Password"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="ConfirmNewPassword"
                        value={Password.ConfirmNewPassword}
                        onChange={handleChange}
                        placeholder="Enter New Password"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <button
                    onClick={() => {
                        if (Password.newPassword != Password.ConfirmNewPassword) {
                            toast.error("the password not mutch")
                            return
                        }
                        updateUser({ password: Password.newPassword })
                        setPassword({
                            ConfirmNewPassword: "",
                            newPassword: ""
                        })
                    }}
                    className={`w-full  text-white px-4 py-2 rounded-xl  transition bg-teal-600 shadow-teal-700 hover:bg-teal-700`}
                >
                    {loading ? <Loader2 className="animate-spin mx-auto h-8 w-8 " /> : t("Confirm")}

                </button>
            </BoxCard>

        </PageContainer>
    )
}

export default UpdatePassword