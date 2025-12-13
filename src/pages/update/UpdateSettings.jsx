import { useState } from 'react';
import BoxCard from '../../CustomUi/BoxCard';
import UseUpdateStore from '../../hooks/UseUpdateStore';
import toast from 'react-hot-toast';
import { Loader2 } from "lucide-react";
import { useTranslation } from 'react-i18next';
import useUser from '../../hooks/useUser';
import LoadingBar from '../../CustomUi/LoadingBar';

const UpdateSettings = () => {
    const { website, repoName, loading: userLoading } = useUser();
    if (userLoading) return <LoadingBar />

    return (
        <div className='w-full'>
            <UpdateSettingsForm store={website} repoName={repoName} />
        </div>
    );
};


const UpdateSettingsForm = ({ store, repoName }) => {
    const { t } = useTranslation("store");

    const [storeSetting, setStoreSetting] = useState({
        name: store.store_name || "",
        language: store.language || "ar", // default
        EnableBerue: store.EnableBerue || false,
    });
    const [change, SetChange] = useState(false)
    const { loading, UpdateStore } = UseUpdateStore()
    const handleChange = (field, value) => {
        SetChange(true)
        setStoreSetting((prev) => ({
            ...prev,
            [field]: value,
        }));
    };


    return (
        <BoxCard
            about={t("StoreSettings")}
            small={true}
            className={`py-1`}
        >
            <p className='text-sm text-gray-600'>
                {t("Controlsettings")}
            </p>

            <div className='border-t border-[#ddd] py-5 mt-4 space-y-5'>

                {/* Store Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t("StoreName")}</label>
                    <input
                        type="text"
                        value={storeSetting.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Enter store name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Language Select */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t("ChooseStoreLanguage")}</label>
                    <select
                        value={storeSetting.language}
                        onChange={(e) => handleChange("language", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="ar">Arabic</option>
                        <option value="en">English</option>
                        <option value="fr">French</option>
                    </select>
                </div>

                {/* Order Method */}

                {/* Toggles */}
                <div className="space-y-3">
                    <label className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">
                            {t("Enable")} <span className="text-purple-600">{t("Delevryto")}  </span> {t("Theberue")}
                        </span>
                        <input
                            type="checkbox"
                            checked={storeSetting.EnableBerue}
                            onChange={(e) => handleChange("EnableBerue", e.target.EnableBerue)}
                            className="toggle toggle-primary"
                        />
                    </label>
                </div>
            </div>

            {/* Save button */}
            <div className='mt-5 flex justify-end'>
                <button
                    onClick={() => {
                        if (change) {
                            UpdateStore({
                                ...store,
                                repoName: repoName,
                                store_name: storeSetting.name,
                                language: storeSetting.language, // default
                                EnableBerue: storeSetting.EnableBerue
                            })
                            return
                        }
                        toast.error("upload your logo")

                    }}
                    className='w-full bg-teal-600 text-white px-4 py-2 rounded-xl shadow-teal-700 hover:bg-teal-700 transition'
                >
                    {loading ? <Loader2 className="animate-spin mx-auto h-8 w-8 " /> : t("Save")}                </button>
            </div>
        </BoxCard>
    )
}

export default UpdateSettings;
