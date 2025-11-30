import React from 'react'
import { useTranslation } from 'react-i18next';
import { Crown, ArrowRight } from 'lucide-react'; // Added Icons
import { Link } from 'react-router-dom';

const UpgradeYourPlan = ({ ordersUsed }) => {
    const { t } = useTranslation("dashboard");

    const maxOrders = 30;

    const ordersLeft = maxOrders - ordersUsed;
    const percentageUsed = (ordersUsed / maxOrders) * 100;
    return (
        <div className="w-full">
            <div className="relative overflow-hidden rounded-2xl border border-purple-100 bg-white p-6 shadow-lg shadow-purple-500/5">
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-purple-50 blur-3xl opacity-50 pointer-events-none"></div>
                <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex gap-5 items-start">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white shadow-md shadow-purple-200">
                            <Crown size={24} strokeWidth={2} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                {t("UnlockFullAccess")}
                                <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                                    Pro
                                </span>
                            </h3>
                            <p className="text-sm text-gray-500 mt-1 max-w-md leading-relaxed">
                                {t("UpgradeYourPlanToAccessOrderManagement")}
                            </p>
                            <div className="mt-4 flex items-center gap-3">
                                <div className="h-2 w-32 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-purple-500 rounded-full transition-all duration-500 ease-out"
                                        style={{ width: `${percentageUsed}%` }}
                                    />
                                </div>
                                <span className="text-xs font-medium text-purple-700">
                                    {ordersLeft > 0 ? ordersLeft : 0} {t("freeordersleft")}
                                </span>
                            </div>
                        </div>
                    </div>
                    <Link
                        to={"/upgrade"}
                        href="#"
                        className="group whitespace-nowrap rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-gray-800 hover:scale-[1.02] active:scale-95 mx-auto md:m-0 flex items-center gap-2"
                    >
                        {t("UpgradeNow")}
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UpgradeYourPlan