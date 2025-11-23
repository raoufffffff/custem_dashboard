import { Check, Globe, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const LanguagePanel = ({ hide }) => {
    const { i18n, t } = useTranslation("constanst");
    const currentLang = i18n.language;

    // Configuration array for easier management
    const languages = [
        { code: "en", label: "English", native: "English" },
        { code: "fr", label: "French", native: "Français" },
        { code: "ar", label: "Arabic", native: "العربية" },
    ];

    const changeLang = (lng) => {
        i18n.changeLanguage(lng);
        // Optional: wait a moment before closing to let user see the selection
        setTimeout(() => {
            hide();
        }, 150);
    };

    return (
        <div className="relative w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">

            {/* Header Section */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-2 text-gray-800">
                    <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                        <Globe className="w-5 h-5" />
                    </div>
                    <h2 className="font-bold text-lg">{t("ChooseLanguage")}</h2>
                </div>

                {/* Quick Close Button */}
                <button
                    onClick={hide}
                    className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Language List */}
            <div className="p-6 flex flex-col gap-3">
                {languages.map((lang) => {
                    const isActive = currentLang === lang.code;

                    return (
                        <button
                            key={lang.code}
                            onClick={() => changeLang(lang.code)}
                            className={`group flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 border 
                ${isActive
                                    ? "bg-purple-600 border-purple-600 text-white shadow-md shadow-purple-200"
                                    : "bg-white border-gray-200 text-gray-600 hover:border-purple-300 hover:bg-purple-50"
                                }`}
                        >
                            <span className="flex flex-col items-start">
                                <span className={isActive ? "text-white" : "text-gray-900"}>
                                    {lang.native}
                                </span>
                                {/* Optional: Show English name underneath for clarity if needed */}
                                <span className={`text-xs ${isActive ? "text-purple-200" : "text-gray-400"}`}>
                                    {lang.label}
                                </span>
                            </span>

                            {isActive && (
                                <div className="bg-white/20 p-1 rounded-full">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Footer / Close Action */}
            <div className="px-6 pb-6">
                <button
                    onClick={hide}
                    className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold rounded-xl transition-colors"
                >
                    {t("Close") || "Cancel"}
                </button>
            </div>
        </div>
    );
};

export default LanguagePanel;