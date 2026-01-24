import { Link } from "react-router-dom";
import BoxCard from "../../CustomUi/BoxCard";
import OrderCard from "./OrderCard"; // Renamed from OrderRow
import { IoMdClose } from "react-icons/io";
import { Plus, Search, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import Empty from "../../CustomUi/Empty";

const OrdersGrid = ({
    openEdit,
    orders,
    loading,
    edite,
    ucan,
    sendtoLiv,
    fetchOrders,
    deleteOrder,
    setFilters,
    filters,
    hasMore,
    loadMore,
    isPaid,
    ShowAddOrder,
    companyLiv
}) => {
    const { t } = useTranslation("dashboard");

    return (
        <BoxCard about={t("Orders")}>
            {/* --- Header / Search Section --- */}
            <div className="flex  w-full items-center gap-3 mb-6 mt-2">
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

                    <button
                        onClick={ShowAddOrder}
                        className="flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white shadow-sm transition-all transform active:scale-95 cursor-pointer py-2.5 px-5 rounded-xl font-medium gap-2"
                    >
                        <Plus size={18} />
                        <span className="hidden sm:inline">{t("NewOrder")}</span>
                    </button>
                </div>
            </div>

            {/* --- Cards Grid Section --- */}
            <div className="min-h-[200px]">
                {loading && orders.length === 0 ? (
                    // Skeleton Loader for Cards
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-4 h-64 animate-pulse flex flex-col justify-between">
                                <div className="flex justify-between">
                                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                                </div>
                                <div className="flex gap-4 mt-4">
                                    <div className="h-16 w-16 bg-gray-200 rounded-lg"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                </div>
                                <div className="mt-4 h-8 bg-gray-200 rounded w-full"></div>
                            </div>
                        ))}
                    </div>
                ) : orders.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {orders.map((item, index) => (
                            <OrderCard
                                openEdit={openEdit}
                                companyLiv={companyLiv}
                                isPaid={isPaid}
                                key={item._id}
                                deleteOrder={deleteOrder}
                                fetchOrders={fetchOrders}
                                sendtoLiv={sendtoLiv}
                                edite={edite}
                                ucan={ucan}
                                order={item}
                                index={index}
                            />
                        ))}
                    </div>
                ) : (
                    <Empty />
                )}
            </div>

            {/* --- Load More Section --- */}
            {hasMore && (
                <div className="mt-8 flex justify-center items-center">
                    <button
                        onClick={loadMore}
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-teal-700 bg-white border border-teal-200 rounded-full hover:bg-teal-50 hover:text-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                        {loading ? <Loader2 className="animate-spin h-4 w-4" /> : null}
                        {loading ? t("Loading...") : t("LoadMoreOrders")}
                    </button>
                </div>
            )}
        </BoxCard>
    );
}

export default OrdersGrid;