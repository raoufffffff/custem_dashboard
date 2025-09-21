import React from 'react'
import BoxCard from '../../CustomUi/BoxCard'
import { Bell, XCircle, CheckCircle2, Package, Clock, PhoneOff, Ban } from "lucide-react"
import { useTranslation } from 'react-i18next'



const OrdersSummary = ({ Allorders }) => {
    const { t } = useTranslation("dashboard");
    const statuses = [
        { key: "pending", label: t("pending"), color: "bg-blue-100 text-blue-500 ring-blue-200", icon: <Bell className="w-4 h-4" /> },
        { key: "Connection failed 1", label: t("Connectionfailed1"), color: "bg-yellow-100 text-yellow-500 ring-yellow-200", icon: <PhoneOff className="w-4 h-4" /> },
        { key: "Connection failed 2", label: t("Connectionfailed2"), color: "bg-yellow-100 text-yellow-500 ring-yellow-200", icon: <PhoneOff className="w-4 h-4" /> },
        { key: "Connection failed 3", label: t("Connectionfailed3"), color: "bg-yellow-100 text-yellow-500 ring-yellow-200", icon: <PhoneOff className="w-4 h-4" /> },
        { key: "confirmed", label: t("confirmed"), color: "bg-green-100 text-green-500 ring-green-200", icon: <CheckCircle2 className="w-4 h-4" /> },
        { key: "ready", label: t("ready"), color: "bg-emerald-100 text-emerald-500 ring-emerald-200", icon: <Package className="w-4 h-4" /> },
        { key: "Postponed", label: t("Postponed"), color: "bg-purple-100 text-purple-500 ring-purple-200", icon: <Clock className="w-4 h-4" /> },
        { key: "cancelled", label: t("cancelled"), color: "bg-gray-100 text-gray-500 ring-gray-200", icon: <XCircle className="w-4 h-4" /> },
        { key: "failed", label: t("failed"), color: "bg-red-100 text-red-500 ring-red-200", icon: <Ban className="w-4 h-4" /> },
    ];
    const getStatusData = (statusKey) => {
        const filtered = Allorders.filter(order => order.status === statusKey)
        const total = filtered.length
        return { total }
    }
    return (
        <BoxCard
            about={t("OrdersSummary")}
        >
            <div
                className='flex flex-wrap gap-4'
            >
                {statuses.map((status, i) => {
                    const { total } = getStatusData(status.key)
                    return (
                        <div
                            key={i}
                            className={`inline-flex items-center gap-1 px-1.5 py-0.5 md:px-3 md:py-1.5 text-xs font-medium rounded-lg border ${status.color} ring-2 ring-offset-2`}>
                            {status.icon}
                            ( {total} ) {status.label}
                        </div>
                    )
                })}
            </div>
        </BoxCard>

    )
}

export default OrdersSummary