import { useState } from 'react'
import BoxCard from '../../CustomUi/BoxCard'
import {
    FaFacebook,
    FaInstagram,
    FaSnapchat,
    FaTiktok,
    FaWhatsapp,
    FaViber
} from "react-icons/fa";
import UseUpdateStore from '../../hooks/UseUpdateStore';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useUser from '../../hooks/useUser';
import LoadingBar from '../../CustomUi/LoadingBar';

const UpdateContactInfos = () => {
    const { t } = useTranslation("store");
    const { website, repoName, loading: userLoading } = useUser();
    const { loading: updateLoading, UpdateStore } = UseUpdateStore();

    if (userLoading) return <LoadingBar />


    const handleSave = (form, changed) => {
        if (!changed) {
            toast.error("Please modify something before saving.");
            return;
        }

        UpdateStore({
            ...website,
            repoName,
            ...form
        });
    };

    return (
        <div className="w-full">
            <ContactForm
                website={website}
                t={t}
                loading={updateLoading}
                onSave={handleSave}
            />
        </div>
    );
};

export default UpdateContactInfos;


// ==========================
// 🔽 Child component
// ==========================
const ContactForm = ({ website, t, loading, onSave }) => {
    const [form, setForm] = useState({
        email: website.email || "",
        phone: website.phone || "",
        whatsapp: website.whatsapp || "",
        viber: website.viber || "",
        facebook: website.facebook || "",
        instagram: website.instagram || "",
        snapchat: website.snapchat || "",
        tiktok: website.tiktok || ""
    });

    const [changed, setChanged] = useState(false);



    const handleChange = (field, value) => {
        setChanged(true);
        setForm(prev => ({ ...prev, [field]: value }));
    };

    return (
        <BoxCard about={t("Contactinformation")} small className="py-1">
            <p className="text-sm text-gray-600">{t("contactText")}</p>

            <div className="border-t border-[#ddd] py-5 mt-4 space-y-4">
                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t("Email")}</label>
                    <input
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="Enter email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Phone Numbers */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t("PhoneNumbers")}</label>
                    <input
                        type="text"
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="Enter phone number"
                        className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* WhatsApp & Viber */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                            <FaWhatsapp className="text-green-500 h-6 w-6" /> {t("WhatsApp")}
                        </label>
                        <input
                            type="text"
                            value={form.whatsapp}
                            onChange={(e) => handleChange("whatsapp", e.target.value)}
                            placeholder="WhatsApp number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                            <FaViber className="text-purple-600 h-6 w-6" /> {t("Viber")}
                        </label>
                        <input
                            type="text"
                            value={form.viber}
                            onChange={(e) => handleChange("viber", e.target.value)}
                            placeholder="Viber number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Social Media */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t("SocialMedia")}</label>
                    <div className="space-y-3">

                        <div className="flex items-center gap-2">
                            <FaFacebook className="text-blue-600 h-6 w-6" />
                            <input
                                type="text"
                                value={form.facebook}
                                onChange={(e) => handleChange("facebook", e.target.value)}
                                placeholder="Facebook page link"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <FaInstagram className="text-pink-500 h-6 w-6" />
                            <input
                                type="text"
                                value={form.instagram}
                                onChange={(e) => handleChange("instagram", e.target.value)}
                                placeholder="Instagram account link"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <FaSnapchat className="text-yellow-400 h-6 w-6" />
                            <input
                                type="text"
                                value={form.snapchat}
                                onChange={(e) => handleChange("snapchat", e.target.value)}
                                placeholder="Snapchat account link"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <FaTiktok className="text-black h-6 w-6" />
                            <input
                                type="text"
                                value={form.tiktok}
                                onChange={(e) => handleChange("tiktok", e.target.value)}
                                placeholder="TikTok account link"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Save button */}
            <div className="mt-5 flex justify-end">
                <button
                    onClick={() => onSave(form, changed)}
                    className="w-full bg-teal-600 text-white px-4 py-2 rounded-xl shadow-teal-700 hover:bg-teal-700 transition"
                    disabled={loading}
                >
                    {loading ? (
                        <Loader2 className="animate-spin mx-auto h-6 w-6" />
                    ) : (
                        t("Save")
                    )}
                </button>
            </div>
        </BoxCard>
    );
};
