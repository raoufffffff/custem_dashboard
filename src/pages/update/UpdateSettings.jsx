import { useState } from 'react';
import BoxCard from '../../CustomUi/BoxCard';
import { useOutletContext } from 'react-router-dom';

const UpdateSettings = () => {
    const user = useOutletContext() // get websiteStyle from context





    return (
        <div className='w-full'>
            <UpdateSettingsForm store={user.website.websiteStyle} />
        </div>
    );
};


const UpdateSettingsForm = ({ store }) => {
    const [storeSetting, setStoreSetting] = useState({
        name: store.store_name || "",
        language: "ar", // default
        showHeader: true,
    });

    const handleChange = (field, value) => {
        setStoreSetting((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = () => {
        console.log("Submitted settings:", storeSetting);
        // send to API here
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
                            Enable <span className="text-purple-600">Navigatiob bar</span> Product page
                        </span>
                        <input
                            type="checkbox"
                            checked={storeSetting.freeShipping}
                            onChange={(e) => handleChange("freeShipping", e.target.checked)}
                            className="toggle toggle-primary"
                        />
                    </label>
                </div>
            </div>

            {/* Save button */}
            <div className='mt-5 flex justify-end'>
                <button
                    onClick={handleSubmit}
                    className='w-full bg-teal-600 text-white px-4 py-2 rounded-xl shadow-teal-700 hover:bg-teal-700 transition'
                >
                    Save
                </button>
            </div>
        </BoxCard>
    )
}

export default UpdateSettings;
