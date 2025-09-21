import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

const LanguagePanel = ({ hide }) => {
    const { i18n, t } = useTranslation("constanst");

    const changeLang = (lng) => {
        i18n.changeLanguage(lng);
        hide();
    };

    const currentLang = i18n.language; // detect active language

    return (
        <div className="px-6 py-5 w-full flex flex-col bg-white rounded-2xl shadow-xl">
            {/* Title */}
            <h2 className="font-bold text-xl text-gray-800 text-center mb-4">
                {t("ChooseLanguage")}
            </h2>

            {/* Language buttons */}
            <div className="flex flex-col gap-2">
                {/* English */}
                <button
                    onClick={() => changeLang("en")}
                    className={`flex justify-between items-center px-4 py-3 rounded-xl text-lg transition-all shadow-sm 
            ${currentLang === "en"
                            ? "bg-purple-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                >
                    English
                    {currentLang === "en" && <Check className="w-5 h-5" />}
                </button>

                {/* Arabic */}
                <button
                    onClick={() => changeLang("ar")}
                    className={`flex justify-between items-center px-4 py-3 rounded-xl text-lg transition-all shadow-sm 
            ${currentLang === "ar"
                            ? "bg-purple-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                >
                    العربية
                    {currentLang === "ar" && <Check className="w-5 h-5" />}
                </button>
            </div>

            {/* Close button */}
            <button
                onClick={hide}
                className="mt-6 px-5 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-xl transition-all shadow-md self-center"
            >
                {t("Close")}
            </button>
        </div>
    );
};

export default LanguagePanel;
