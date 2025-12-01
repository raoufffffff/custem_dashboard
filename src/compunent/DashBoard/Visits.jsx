"use client";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import BoxCard from "../../CustomUi/BoxCard";
import { LayoutDashboard, ShoppingBag, Globe, ArrowRight, ImageOff } from "lucide-react";

const Visits = ({ visit = [] }) => {
    const { t } = useTranslation("dashboard");

    // Process and Sort Data
    const { generalPages, productPages, totalGeneral, totalProducts, maxGeneralVal, maxProductVal } = useMemo(() => {
        let maxGen = 0;
        let maxProd = 0;
        let sumGen = 0;
        let sumProd = 0;

        // 1. General Pages Logic
        const generalMap = visit
            .filter((v) => v.page !== "productpage")
            .reduce((acc, v) => {
                acc[v.page] = (acc[v.page] || 0) + 1;
                return acc;
            }, {});

        const sortedGeneral = Object.entries(generalMap)
            .sort((a, b) => b[1] - a[1]) // Sort High to Low
            .map(([page, count]) => {
                if (count > maxGen) maxGen = count;
                sumGen += count;
                return { page, count };
            });

        // 2. Product Pages Logic
        const productMap = visit
            .filter((v) => v.page === "productpage" && v.productName)
            .reduce((acc, v) => {
                if (!acc[v.productName]) {
                    acc[v.productName] = { count: 0, image: v.image };
                }
                acc[v.productName].count += 1;
                return acc;
            }, {});

        const sortedProducts = Object.entries(productMap)
            .sort((a, b) => b[1].count - a[1].count) // Sort High to Low
            .map(([name, data]) => {
                if (data.count > maxProd) maxProd = data.count;
                sumProd += data.count;
                return { name, ...data };
            });

        return {
            generalPages: sortedGeneral,
            productPages: sortedProducts,
            totalGeneral: sumGen,
            totalProducts: sumProd,
            maxGeneralVal: maxGen,
            maxProductVal: maxProd
        };
    }, [visit]);

    // Helper for visual bars
    const getPercent = (val, max) => (max === 0 ? 0 : Math.round((val / max) * 100));
    const getShare = (val, total) => (total === 0 ? 0 : Math.round((val / total) * 100));

    return (
        <BoxCard about={t("TrafficAnalytics")}>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

                {/* ==========================
                    LEFT: GENERAL PAGES
                   ========================== */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <Globe className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800">{t("GeneralPages")}</h4>
                                <p className="text-xs text-gray-500">{totalGeneral} {t("totalviews")}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        {generalPages.length === 0 ? (
                            <p className="text-sm text-gray-400 italic py-4 text-center">{t("Nodataavailable")}</p>
                        ) : (
                            generalPages.map((item, index) => (
                                <div key={index} className="relative group">
                                    {/* Background Bar Chart Effect */}
                                    <div
                                        className="absolute top-0 left-0 h-full bg-blue-50 rounded-lg transition-all duration-700 ease-out"
                                        style={{ width: `${getPercent(item.count, maxGeneralVal)}%`, opacity: 0.6 }}
                                    />

                                    <div className="relative flex items-center justify-between p-3 rounded-lg z-10 hover:bg-blue-50/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <span className={`
                                                text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full 
                                                ${index === 0 ? "bg-blue-500 text-white" : "bg-white border border-gray-200 text-gray-500"}
                                            `}>
                                                {index + 1}
                                            </span>
                                            <span className="text-sm font-semibold text-gray-700 capitalize">
                                                {item.page}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-gray-800">{item.count}</span>
                                            <span className="text-xs text-gray-500 w-8 text-right">
                                                ({getShare(item.count, totalGeneral)}%)
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* ==========================
                    RIGHT: PRODUCTS
                   ========================== */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                                <ShoppingBag className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800">{t("Top Products")}</h4>
                                <p className="text-xs text-gray-500">{totalProducts} {t("product views")}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        {productPages.length === 0 ? (
                            <p className="text-sm text-gray-400 italic py-4 text-center">{t("No products visited")}</p>
                        ) : (
                            productPages.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-2 rounded-xl border border-transparent hover:border-purple-100 hover:bg-purple-50/30 transition-all duration-200"
                                >
                                    <div className="flex items-center gap-4 overflow-hidden">
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0">
                                                {item.image ? (
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                        <ImageOff size={18} />
                                                    </div>
                                                )}
                                            </div>
                                            {/* Rank Badge for Top 3 */}
                                            {index < 3 && (
                                                <div className={`
                                                    absolute -top-2 -left-2 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white border-2 border-white
                                                    ${index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-orange-400"}
                                                `}>
                                                    {index + 1}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col min-w-0">
                                            <span className="text-sm font-semibold text-gray-800 truncate block max-w-[180px]" title={item.name}>
                                                {item.name}
                                            </span>
                                            {/* Mini Progress Bar */}
                                            <div className="w-24 h-1.5 bg-gray-100 rounded-full mt-1.5 overflow-hidden">
                                                <div
                                                    className="h-full bg-purple-500 rounded-full"
                                                    style={{ width: `${getPercent(item.count, maxProductVal)}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <span className="block text-lg font-bold text-gray-800 leading-none">
                                            {item.count}
                                        </span>
                                        <span className="text-[10px] uppercase font-medium text-gray-400">
                                            {t("views")}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </BoxCard>
    );
};

export default Visits;