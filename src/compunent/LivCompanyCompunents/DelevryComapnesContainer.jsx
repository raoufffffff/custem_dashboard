import { useState } from "react";
import DeliveryCompanySelector from "./DeliveryCompanySelector";
import axios from 'axios'
const DelevryComapnesContainer = ({ fetchUser }) => {
    const [selectedCompany, setSelectedCompany] = useState({
        name: "",
        img: "",
        key: "",
        token: "",
    });
    const [Error, setError] = useState("")
    const handleCompanySelect = (name, img) => {
        setSelectedCompany({ name, img, key: "", token: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`https://true-fit-dz-api.vercel.app/user/liv/check`, {
                ...selectedCompany,
                id: JSON.parse(localStorage.getItem("user"))._id
            })
            if (res.data.good) {
                fetchUser()
            }
            setError("the key or token not currect")
        } catch (error) {
            setError("the key or token not currect")

            console.log(error.message);

        }
    };

    const closeModal = () => {
        setSelectedCompany({ name: "", img: "", key: "", token: "" });
    };

    return (
        <div className="relative min-h-screen bg-gray-50 py-10 px-4">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                اختر شركة التوصيل الخاصة بك
            </h1>

            <DeliveryCompanySelector onSelect={handleCompanySelect} />

            {selectedCompany.name && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50"
                        onClick={closeModal}
                    />

                    {/* Modal */}
                    <div className="fixed z-50 top-1/2 left-1/2 w-11/12 max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg p-6">
                        <div className="flex flex-col items-center">
                            {/* Company Logo */}
                            <div className="w-24 h-24 mb-4 border border-gray-300 rounded-full overflow-hidden">
                                <img
                                    src={selectedCompany.img}
                                    alt={selectedCompany.name}
                                    className="object-contain w-full h-full"
                                />
                            </div>

                            <h2 className="text-xl font-semibold text-gray-800 mb-1">
                                {selectedCompany.name}
                            </h2>
                            <p className="text-center text-sm text-gray-600 mb-5 px-4">
                                اربط متجرك مع حساب {selectedCompany.name} لتسهيل إدارة الطلبات.
                            </p>
                            {Error && <h2 className="text-xl font-semibold text-red-800 mb-1">
                                {Error}
                            </h2>}
                            {/* Form */}
                            <form onSubmit={handleSubmit} className="w-full space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        API Key
                                    </label>
                                    <input
                                        type="text"
                                        value={selectedCompany.key}
                                        onChange={(e) =>
                                            setSelectedCompany((prev) => ({
                                                ...prev,
                                                key: e.target.value,
                                            }))
                                        }
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="ادخل مفتاح API"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Token
                                    </label>
                                    <input
                                        type="text"
                                        value={selectedCompany.token}
                                        onChange={(e) =>
                                            setSelectedCompany((prev) => ({
                                                ...prev,
                                                token: e.target.value,
                                            }))
                                        }
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="ادخل التوكن"
                                        required
                                    />
                                </div>

                                <div className="flex justify-between gap-4 pt-3">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="flex-1 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition"
                                    >
                                        إلغاء
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
                                    >
                                        تأكيد الربط
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default DelevryComapnesContainer