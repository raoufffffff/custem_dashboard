import { useState } from 'react';
import BoxCard from '../../CustomUi/BoxCard';
import { useOutletContext } from 'react-router-dom';
import UseUpdateStore from '../../hooks/UseUpdateStore';
import toast from 'react-hot-toast';
import { Loader2 } from "lucide-react";

const UpdateSettings = () => {
    const user = useOutletContext() // get websiteStyle from context





    return (
        <div className='w-full'>
            <UpdateSettingsForm store={user.website} repoName={user.repoName} />
        </div>
    );
};


const UpdateSettingsForm = ({ store, repoName }) => {
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
            about={"Store Settings"}
            small={true}
            className={`py-1`}
        >
            <p className='text-sm text-gray-600'>
                Control your store settings.
            </p>

            <div className='border-t border-[#ddd] py-5 mt-4 space-y-5'>

                {/* Store Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Choose Store Language</label>
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
                            Enable <span className="text-purple-600">Delevry to  </span> The berue
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
                    {loading ? <Loader2 className="animate-spin mx-auto h-8 w-8 " /> : "Save"}                </button>
            </div>
        </BoxCard>
    )
}

export default UpdateSettings;
