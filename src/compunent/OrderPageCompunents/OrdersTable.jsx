import { Link } from "react-router-dom";
import BoxCard from "../../CustomUi/BoxCard";
import OrderRow from "./OrderRow";
import { IoMdClose } from "react-icons/io";
import { Plus, Search, Loader2 } from "lucide-react"; // Added Search and Loader2
import { useTranslation } from "react-i18next";

const OrdersTable = ({
    orders,
    emptyMessage,
    loading,
    edite,
    ucan,
    EdetAllOrder,
    sendtoLiv,
    fetchOrders,
    deleteOrder,
    setFilters,
    filters,
    hasMore,
    loadMore,
    isPaid
}) => {
    const { t } = useTranslation("dashboard");

    // Calculate column count to prevent layout shift during loading
    const colCount = 14;

    return (
        <BoxCard about={t("Orders")}>
            {/* --- Header / Search Section --- */}
            <div className="flex flex-col sm:flex-row w-full items-center gap-3 mb-6 mt-2">
                <div className="relative flex-1 w-full">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        name="search"
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-150 ease-in-out sm:text-sm"
                        placeholder={t("ShearchBy")}
                        onChange={(e) => setFilters({ ...filters, customer: e.target.value })}
                        value={filters.customer}
                    />
                </div>

                <div className="flex items-center gap-2">
                    {filters.customer && (
                        <button
                            onClick={() => setFilters({ ...filters, customer: "" })}
                            className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer p-2.5 rounded-xl"
                            title="Clear Search"
                        >
                            <IoMdClose size={20} />
                        </button>
                    )}

                    <Link
                        to={'/'}
                        className="flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white shadow-sm transition-all transform active:scale-95 cursor-pointer py-2.5 px-5 rounded-xl font-medium gap-2"
                    >
                        <Plus size={18} />
                        <span className="hidden sm:inline">{t("New Order")}</span>
                    </Link>
                </div>
            </div>

            {/* --- Table Section --- */}
            <div className="overflow-hidden border border-gray-200 rounded-xl shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {/* Added specific widths or stick to auto. Styling headers for better readability */}
                                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"></th>
                                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{t("OrderID")}</th>
                                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{t("item")}</th>
                                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{t("Customer")}</th>
                                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{t("Location")}</th>
                                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{t("Type")}</th>
                                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{t("Date")}</th>
                                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{t("Time")}</th>
                                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{t("Status")}</th>
                                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{t("Amount")}</th>
                                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{t("Product")} Price</th>
                                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{t("RidePrice")}</th>
                                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{t("Note")}</th>
                                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap sticky right-0 bg-gray-50 shadow-sm">{t("Actions")}</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading && orders.length === 0 ? (
                                // Skeleton Loader
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        {Array.from({ length: colCount }).map((__, j) => (
                                            <td key={j} className="px-4 py-4 whitespace-nowrap">
                                                <div className="h-4 bg-gray-200 rounded w-20"></div>
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : orders.length > 0 ? (
                                orders.map((item, index) => (
                                    <OrderRow
                                        isPaid={isPaid}
                                        key={item._id}
                                        deleteOrder={deleteOrder}
                                        fetchOrders={fetchOrders}
                                        sendtoLiv={sendtoLiv}
                                        EdetAllOrder={EdetAllOrder}
                                        edite={edite}
                                        ucan={ucan}
                                        order={item}
                                        index={index}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={colCount} className="px-6 py-10 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-500">
                                            <span className="text-lg font-medium">{emptyMessage}</span>
                                            <span className="text-sm mt-1 text-gray-400">Try adjusting your filters or add a new order.</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* --- Load More Section --- */}
                {hasMore && (
                    <div className="bg-gray-50 px-4 py-4 border-t border-gray-200 flex justify-center items-center">
                        <button
                            onClick={loadMore}
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-teal-700 bg-white border border-teal-200 rounded-lg hover:bg-teal-50 hover:text-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                        >
                            {loading ? <Loader2 className="animate-spin h-4 w-4" /> : null}
                            {loading ? t("Loading...") : t("LoadMoreOrders")}
                        </button>
                    </div>
                )}
            </div>
        </BoxCard>
    );
}

export default OrdersTable;