"use client"
import { Bell, XCircle, CheckCircle2, Package, Clock, PhoneOff, Ban } from "lucide-react"
import BoxCard from "../../CustomUi/BoxCard"

const statuses = [
    { key: "pending", label: "Pending", color: "bg-blue-100 text-blue-500 ring-blue-200", icon: <Bell className="w-4 h-4" /> },
    { key: "Connection failed 1", label: "Connection failed 1", color: "bg-yellow-100 text-yellow-500 ring-yellow-200", icon: <PhoneOff className="w-4 h-4" /> },
    { key: "Connection failed 2", label: "Connection failed 2", color: "bg-yellow-100 text-yellow-500 ring-yellow-200", icon: <PhoneOff className="w-4 h-4" /> },
    { key: "Connection failed 3", label: "Connection failed 3", color: "bg-yellow-100 text-yellow-500 ring-yellow-200", icon: <PhoneOff className="w-4 h-4" /> },
    { key: "confirmed", label: "Confirmed", color: "bg-green-100 text-green-500 ring-green-200", icon: <CheckCircle2 className="w-4 h-4" /> },
    { key: "ready", label: "Ready", color: "bg-emerald-100 text-emerald-500 ring-emerald-200", icon: <Package className="w-4 h-4" /> },
    { key: "Postponed", label: "Postponed", color: "bg-purple-100 text-purple-500 ring-purple-200", icon: <Clock className="w-4 h-4" /> },
    { key: "cancelled", label: "Cancelled", color: "bg-gray-100 text-gray-500 ring-gray-200", icon: <XCircle className="w-4 h-4" /> },
    { key: "failed", label: "Failed", color: "bg-red-100 text-red-500 ring-red-200", icon: <Ban className="w-4 h-4" /> },
]

const StatusSummary = ({ Allorders }) => {
    // Helper to get stats per status
    const getStatusData = (statusKey) => {
        const filtered = Allorders.filter(order => order.status === statusKey)
        const total = filtered.length
        const value = filtered.reduce((sum, order) => sum + (order.price || 0), 0)
        return { total, value }
    }

    return (
        <BoxCard about={"Order Summary"} link={'order'} >


            {/* Header */}


            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-600">
                    <thead className="text-gray-500 border-b border-b-[#eee]">
                        <tr>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Total</th>
                            <th className="px-4 py-2">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {statuses.map((status, i) => {
                            const { total, value } = getStatusData(status.key)
                            return (
                                <tr key={i} className="border-b last:border-0 border-b-[#eee]">
                                    {/* Status */}
                                    <td className="px-4 py-2">
                                        <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full border ${status.color} ring-2 ring-offset-2`}>
                                            {status.icon}
                                            {status.label}
                                        </span>
                                    </td>
                                    {/* Total */}
                                    <td className="px-4 py-2">{total}</td>
                                    {/* Value */}
                                    <td className="px-4 py-2">{value} DA</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </BoxCard>

    )
}

export default StatusSummary
