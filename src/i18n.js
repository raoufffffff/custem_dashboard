import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import EnConstanst from "./locales/en/constanst.json";
import EnDashboard from "./locales/en/dashboard.json";
import EnAccount from "./locales/en/Account.json";
import EnStore from "./locales/en/store.json";
import EnProductsAndCategories from "./locales/en/ProductsAndCategories.json";
import EnDelevryComapnesAndPixals from "./locales/en/DelevryComapnesAndPixals.json";

// arabic
import ArConstanst from "./locales/ar/constanst.json";
import ArDashboard from "./locales/ar/dashboard.json";
import ArAccount from "./locales/ar/Account.json";
import ArStore from "./locales/ar/store.json";
import ArProductsAndCategories from "./locales/ar/ProductsAndCategories.json";
import ArDelevryComapnesAndPixals from "./locales/ar/DelevryComapnesAndPixals.json";


// france
import FrConstanst from "./locales/fr/constanst.json";
import FrDashboard from "./locales/fr/dashboard.json";
import FrAccount from "./locales/fr/Account.json";
import FrStore from "./locales/fr/store.json";
import FrProductsAndCategories from "./locales/fr/ProductsAndCategories.json";
import FrDelevryComapnesAndPixals from "./locales/fr/DelevryComapnesAndPixals.json";




i18n
    .use(LanguageDetector) // detects language
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            en: {
                constanst: EnConstanst,
                dashboard: EnDashboard,
                Account: EnAccount,
                store: EnStore,
                ProductsAndCategories: EnProductsAndCategories,
                DelevryComapnesAndPixals: EnDelevryComapnesAndPixals
            },
            ar: {
                constanst: ArConstanst,
                dashboard: ArDashboard,
                Account: ArAccount,
                store: ArStore,
                ProductsAndCategories: ArProductsAndCategories,
                DelevryComapnesAndPixals: ArDelevryComapnesAndPixals
            },
            fr: {
                constanst: FrConstanst,
                dashboard: FrDashboard,
                Account: FrAccount,
                store: FrStore,
                ProductsAndCategories: FrProductsAndCategories,
                DelevryComapnesAndPixals: FrDelevryComapnesAndPixals
            }
        },
        fallbackLng: "en", // default language
        ns: ["constanst", "dashboard", "Account", "store", "ProductsAndCategories", "DelevryComapnesAndPixals"], // list of namespaces
        defaultNS: "constanst", // default namespace
        interpolation: {
            escapeValue: false // react already escapes
        }
    });

export default i18n;
