import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import EnConstanst from "./locales/en/constanst.json";
import EnDashboard from "./locales/en/dashboard.json";
import EnAccount from "./locales/en/Account.json";
import EnStore from "./locales/en/store.json";

// arabic
import ArConstanst from "./locales/ar/constanst.json";
import ArDashboard from "./locales/ar/dashboard.json";
import ArAccount from "./locales/ar/Account.json";
import ArStore from "./locales/ar/store.json";

i18n
    .use(LanguageDetector) // detects language
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            en: {
                constanst: EnConstanst,
                dashboard: EnDashboard,
                Account: EnAccount,
                store: EnStore
            },
            ar: {
                constanst: ArConstanst,
                dashboard: ArDashboard,
                Account: ArAccount,
                store: ArStore
            }
        },
        fallbackLng: "en", // default language
        ns: ["constanst", "dashboard", "Account", "store"], // list of namespaces
        defaultNS: "constanst", // default namespace
        interpolation: {
            escapeValue: false // react already escapes
        }
    });

export default i18n;
