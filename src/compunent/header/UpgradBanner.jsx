import { Zap, Crown, Infinity, ChevronRight } from 'lucide-react';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom'
import { motion } from "framer-motion";

const UpgradBanner = ({ toggleHeader, isPaid, orders }) => {
    const { t } = useTranslation("constanst");
    const maxOrders = 30;
    const percentageUsed = (orders / maxOrders) * 100;

    return (
        <div className="px-4 mb-4 mt-2 shrink-0">
            <div className="relative overflow-hidden rounded-2xl bg-gray-900 p-4 text-white shadow-xl border border-gray-800/50">
                {/* Background Effect */}
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-600/20 blur-2xl"></div>
                <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-teal-500/20 blur-2xl"></div>

                <div className="relative z-10">

                    {isPaid ? (
                        // ===========================
                        // PAID USER UI (Compact Version)
                        // ===========================
                        <div className="flex flex-col gap-2">
                            {/* Header Row: Icon/Title + Small Manage Button */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 bg-gradient-to-br from-teal-400 to-purple-600 rounded-lg shadow-inner">
                                        <Crown className="w-3.5 h-3.5 text-white" fill="currentColor" />
                                    </div>
                                    <span className="text-xs font-bold text-white tracking-wide">{t("ProPlan")}</span>
                                </div>

                                {/* Small Manage Button in Top Right */}
                                <NavLink
                                    to="/subscriptions"
                                    onClick={toggleHeader}
                                    className="flex items-center gap-1 text-[10px] font-medium text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-2 py-1 rounded-md"
                                >
                                    {t("Manage")}
                                    <ChevronRight className="w-3 h-3" />
                                </NavLink>
                            </div>

                            {/* Minimal Status Row */}
                            <div className="flex items-center gap-2 mt-1">
                                <Infinity className="w-3.5 h-3.5 text-purple-400" />
                                <span className="text-[10px] text-gray-300 font-medium">{t("UnlimitedOrders")}</span>
                            </div>
                        </div>
                    ) : (
                        // ===========================
                        // FREE USER UI (Standard)
                        // ===========================
                        <>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="p-1 bg-white/10 rounded-lg">
                                        <Zap className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" />
                                    </div>
                                    <span className="text-xs font-bold tracking-wide text-gray-200">{t("FreePlan")}</span>
                                </div>
                                <span className="text-[10px] font-medium text-gray-400">{orders}/{maxOrders}</span>
                            </div>

                            {/* Progress Bar */}
                            <div className="h-1.5 w-full rounded-full bg-gray-700 mb-4 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: percentageUsed > 100 ? '100%' : `${percentageUsed}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full rounded-full bg-gradient-to-r from-teal-400 to-purple-500"
                                />
                            </div>

                            <NavLink
                                to="/upgrade"
                                onClick={toggleHeader}
                                className="block w-full rounded-lg bg-white py-2 text-center text-xs font-bold text-gray-900 transition-transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-purple-500/10"
                            >
                                {t("UpgradeNow")} 🚀
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UpgradBanner