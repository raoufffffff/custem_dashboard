"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import BoxCard from "../../CustomUi/BoxCard";
import { Home, ShoppingBag } from "lucide-react";

const Visits = ({ visit = [] }) => {
    const { t } = useTranslation("dashboard");

    // ✅ تجميع زيارات الصفحات العامة
    const generalPages = visit
        .filter(v => v.page !== "productpage") // exclude product pages
        .reduce((acc, v) => {
            acc[v.page] = (acc[v.page] || 0) + 1;
            return acc;
        }, {});

    // ✅ تجميع زيارات صفحات المنتجات حسب اسم المنتج
    const productPages = visit
        .filter(v => v.page === "productpage" && v.productName)
        .reduce((acc, v) => {
            if (!acc[v.productName]) {
                acc[v.productName] = {
                    count: 0,
                    image: v.image
                };
            }
            acc[v.productName].count += 1;
            return acc;
        }, {});

    return (
        <BoxCard about={t("visits")}>
            {/* ✅ القسم الأول: صفحات عامة */}
            <h4 className="text-gray-700 font-semibold mb-3">{t("General Pages")}</h4>
            <div className="space-y-2 mb-5">
                {Object.keys(generalPages).length === 0 ? (
                    <p className="text-sm text-gray-500">{t("No Visits Yet")}</p>
                ) : (
                    Object.entries(generalPages).map(([page, count], i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-2"
                        >
                            <span className="flex items-center gap-2 text-gray-700 font-medium">
                                <Home className="w-4 h-4" />
                                {page}
                            </span>
                            <span className="text-gray-900 font-semibold">{count}</span>
                        </div>
                    ))
                )}
            </div>

            {/* ✅ القسم الثاني: صفحات المنتجات */}
            <h4 className="text-gray-700 font-semibold mb-3">{t("Products Visited")}</h4>
            <div className="space-y-3">
                {Object.keys(productPages).length === 0 ? (
                    <p className="text-sm text-gray-500">{t("No Product Visits")}</p>
                ) : (
                    Object.entries(productPages).map(([productName, data], i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm"
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src={data.image}
                                    alt={productName}
                                    className="w-10 h-10 rounded-md object-cover border"
                                />
                                <span className="text-gray-700 font-medium">{productName}</span>
                            </div>
                            <span className="text-gray-900 font-semibold">{data.count}</span>
                        </div>
                    ))
                )}
            </div>
        </BoxCard>
    );
};

export default Visits;
