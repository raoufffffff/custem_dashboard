import React from "react";
import { useTranslation } from "react-i18next";

const SummaryCard = ({ label, value, bg }) => (
    <div
        className={`flex flex-col items-center justify-center rounded-2xl shadow-sm border border-gray-200 px-6 py-4 ${bg}`}
    >
        <span className="text-gray-700 text-sm">{label}</span>
        <span className="text-2xl font-bold mt-1">{value}</span>
    </div>
);

const GeneralOverview = ({ stats, type }) => {
    const { t } = useTranslation("ProductsAndCategories");

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <SummaryCard
                    label={type == "Categories" ? t("TotalCategories") : t("Totalproducts")}
                    value={stats.length}
                    bg="bg-blue-100"
                />
                <SummaryCard
                    label={type == "Categories" ?
                        t("Categoriesvisible") :
                        t("productsvisible")}
                    value={stats.filter(e => e.show).length}
                    bg="bg-green-100"
                />
                <SummaryCard
                    label={type == "Categories" ?
                        t("Categorieshidden") : t("productshidden")}
                    value={stats.filter(e => !e.show).length}
                    bg="bg-yellow-100"
                />

            </div>
        </div>
    );
};

export default GeneralOverview;
