import { useState } from "react";
import DeliveryCompanySelector from "./DeliveryCompanySelector";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";

const DelevryComapnesContainer = ({ updateUser, repoName, start }) => {
    const { t } = useTranslation("DelevryComapnesAndPixals");
    const [loading, setloading] = useState(false)
    const [selectedCompany, setSelectedCompany] = useState({
        name: "",
        img: "",
        key: "",
        token: "",
    });
    const [Error, setError] = useState("");

    const handleCompanySelect = (name, img) => {
        setSelectedCompany({ name, img, key: "", token: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true)
        try {
            const res = await axios.post(
                `https://next-delvry.vercel.app/test`,
                {
                    company: {
                        name: selectedCompany.name,
                        Token: selectedCompany.token,
                        Key: selectedCompany.key
                    }
                }
            );
            if (res.data.good) {
                let data = { companyLiv: { ...selectedCompany } }
                updateUser(data, repoName);
                setError("good")
                start()
            }
        } catch (error) {
            setError(t("InvalidKeyOrToken"));
            console.log(error.message);
        } finally {
            setloading(false)
        }
    };

    const closeModal = () => {
        setSelectedCompany({ name: "", img: "", key: "", token: "" });
    };

    return (
        <div className="relative min-h-screen bg-gray-50 py-10 px-4">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                {t("ChooseDeliveryCompany")}
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
                                {t("ConnectStoreWithCompany", {
                                    company: selectedCompany.name,
                                })}
                            </p>

                            {Error && (
                                <h2 className="text-xl font-semibold text-red-800 mb-1">
                                    {Error}
                                </h2>
                            )}

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="w-full space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {t("ApiKey")}
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
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder={t("EnterApiKey")}

                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {t("token")}
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
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder={t("EnterToken")}
                                        required
                                    />
                                </div>

                                <div className="flex justify-between gap-4 pt-3">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="flex-1 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition"
                                    >
                                        {t("Cancel")}
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition"
                                    >
                                        {loading ? <Loader2 className="animate-spin mx-auto h-8 w-8 " /> : t("ConfirmConnection")}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default DelevryComapnesContainer;
