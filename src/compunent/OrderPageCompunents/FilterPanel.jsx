import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import BoxCard from "../../CustomUi/BoxCard";
import { useTranslation } from 'react-i18next'

const FilterPanel = ({
    filters,
    setFilters,
    uniqueItems,
    clearFilters,
    getUniqueState,
    className
}) => {
    const { t } = useTranslation("dashboard");

    return (
        <BoxCard
            className={className}
            about={t('fillter')}
        >
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* حالة الطلب */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                        {t("Orderstatus")}
                    </label>
                    <select
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="all">{t("all")}</option>
                        {[
                            { key: "pending", label: t("pending") },
                            { key: "Connection failed 1", label: t("Connectionfailed1") },
                            { key: "Connection failed 2", label: t("Connectionfailed2") },
                            { key: "Connection failed 3", label: t("Connectionfailed3") },
                            { key: "confirmed", label: t("confirmed") },
                            { key: "ready", label: t("ready") },
                            { key: "Postponed", label: t("Postponed") },
                            { key: "cancelled", label: t("cancelled") },
                            { key: "failed", label: t("failed") },
                        ].map((r, i) => (
                            <option key={i} value={r.key}>
                                {r.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* الولاية */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                        {t("satet")}
                    </label>
                    <select
                        value={filters.state}
                        onChange={(e) => setFilters({ ...filters, state: e.target.value })}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="all">{t("all")}</option>
                        {getUniqueState.map(e => (
                            <option value={e} key={e}>{e}</option>

                        ))}
                    </select>
                </div>

                {/* مكان التوصيل */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                        {t("Deliverylocation")}
                    </label>
                    <select
                        value={filters.deliveryPlace}
                        onChange={(e) =>
                            setFilters({ ...filters, deliveryPlace: e.target.value })
                        }
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="all">{t("all")}</option>
                        <option value="home">{t("home")}</option>
                        <option value="store">{t("berue")}</option>
                    </select>
                </div>

                {/* تاريخ البداية */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                        {t("Startdate")}
                    </label>
                    <input
                        type="date"
                        value={filters.startDate || ""}
                        onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                {/* تاريخ الإنتهاء */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                        {t("enddate")}
                    </label>
                    <input
                        type="date"
                        value={filters.endDate || ""}
                        onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                {/* المنتج */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1"> {t("item")}
                    </label>
                    <select value={filters.deliveryPlace} onChange={(e) => setFilters({ ...filters, item: e.target.value })} className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" > <option value="all">{t("all")}</option> {uniqueItems.map(e => (<option key={e.id} value={e.name}>{e.name}</option>))} </select> </div>
            </div>

            {/* Clear Filters */}
            <div className="flex justify-end gap-2 mt-3">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={clearFilters}
                    className="px-3 py-1.5 text-sm text-gray-700 rounded-md hover:bg-gray-100 flex items-center gap-1.5"
                >
                    <FiX className="h-4 w-4" />
                    ({t("removeall")})
                </motion.button>
            </div>
        </BoxCard>
    )
}

export default FilterPanel;
