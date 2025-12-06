import useOrders from '../hooks/useOrders';
import useOrderFilters from '../hooks/useOrderFilters';
import usePagination from '../hooks/usePagination';
import { useState } from "react";
import PageContainer from '../CustomUi/PageContainer';
import FilterPanel from "../compunent/OrderPageCompunents/FilterPanel";
import OrdersTable from "../compunent/OrderPageCompunents/OrdersTable";
import { useOutletContext } from "react-router-dom";
import UseLivOrder from "../hooks/UseLivOrder";
import OrdersSummary from "../compunent/orders/OrdersSummary";
import { FaFilter } from "react-icons/fa";
import Model from '../CustomUi/Model';
import { useTranslation } from 'react-i18next';
import { LayoutGrid, List } from 'lucide-react'; // Added Icons
import OrdersGrid from '../compunent/OrderPageCompunents/OrdersGrid';
import UpgradeYourPlan from '../compunent/OrderPageCompunents/UpgradeYourPlan';
import Tutorial from '../CustomUi/Tutorial';
import AddOder from '../compunent/OrderPageCompunents/AddOder';

const OrderPage = () => {
    // State for UI controls
    const [viewType, setViewType] = useState("grid"); // Renamed for clarity
    const [showAddOrder, setShowAddOrder] = useState(false)
    const [showFillters, setShowFillters] = useState(false);
    const [showTutorial, setShowTutorial] = useState(false);
    // Data hooks
    const { sendtoLiv } = UseLivOrder();
    const { t, i18n } = useTranslation("dashboard");
    const currentLang = i18n.language; // detect active language

    const user = useOutletContext();
    const { isPaid, userOrderLemet } = user;
    const { orders, loading, edite, fetchOrders, deleteOrder, postOrder } = useOrders();
    const {
        filteredOrders,
        filters,
        setFilters,
        clearFilters,
    } = useOrderFilters(orders);
    const { visibleItems, hasMore, loadMore } = usePagination(filteredOrders);

    // Derived values
    const hide = () => setShowFillters(false);

    const getUniqueItems = () => {
        const uniqueItems = [];
        const seen = new Set();
        for (const orderItem of orders) {
            const item = orderItem.item;
            if (!seen.has(item._id)) {
                seen.add(item._id);
                uniqueItems.push({
                    id: item._id,
                    ...item
                });
            }
        }
        return uniqueItems;
    };

    const getUniqueState = () => {
        const uniqueItems = [];
        const seen = new Set();
        for (const orderItem of orders) {
            const item = orderItem.state;
            if (!seen.has(item)) {
                seen.add(item);
                uniqueItems.push(item);
            }
        }
        return uniqueItems;
    };



    const ordersUsed = userOrderLemet;

    const showtutorial = () => {
        setShowTutorial(true);
    };
    const hideTutorial = () => {
        setShowTutorial(false);
    }

    const ShowAddOrder = () => {
        setShowAddOrder(true);
    };
    const hideAddOrder = () => {
        setShowAddOrder(false);
    }
    return (
        <PageContainer
            learn
            onClick={showtutorial}
            about={t("Management")}
            titel={t("Orders")}
            className={"gap-6 relative"} // Increased gap for better breathing room
        >
            {/* --- PRO BANNER SECTION --- */}
            {!isPaid && <UpgradeYourPlan ordersUsed={ordersUsed} />}
            {showTutorial && (
                <Model

                    onclose={hideTutorial}>
                    <Tutorial about={"https://firebasestorage.googleapis.com/v0/b/tawssilatrest.appspot.com/o/%D8%AA%D8%A3%D9%83%D9%8A%D8%AF%20%D8%A7%D9%84%D8%B7%D9%84%D8%A8%D9%8A%D8%A7%D8%AA%20%D9%81%D9%8A%20%D9%85%D9%86%D8%B5%D8%A9%20next%20comerce.mp4?alt=media&token=1e03cbc7-3d5c-4c80-8ae5-8f6ce26ce449"} />
                </Model>
            )}
            {showAddOrder && (
                <Model
                    onclose={hideAddOrder}>
                    <AddOder
                        uniqueItems={getUniqueItems()}
                        postOrder={postOrder}
                        onclose={hideAddOrder}
                    />
                </Model>
            )}
            {/* --- SUMMARY SECTION --- */}
            <OrdersSummary Allorders={orders} />

            {/* --- CONTROLS SECTION (Filters + View Toggle) --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">

                {/* Filter Panel (Desktop) */}
                <div className="flex-1">
                    <FilterPanel
                        className={"hidden md:block"}
                        clearFilters={clearFilters}
                        filters={filters}
                        setFilters={setFilters}
                        uniqueItems={getUniqueItems()}
                        getUniqueState={getUniqueState()}
                    />
                </div>

                {/* View Switcher Toggle */}

            </div>

            {/* --- DATA SECTION (Conditional Render) --- */}
            <div className="min-h-[500px] w-full relative">
                {/* --- Compact View Switcher --- */}
                <div className={`absolute z-10 mb-4 md:mb-0 w-fit ${currentLang === "ar" ? "left-5" : "right-5"} top-5`}>
                    <div className="flex items-center bg-gray-100 p-0.5 rounded-lg border border-gray-200 shadow-sm">
                        <button
                            onClick={() => setViewType("grid")}
                            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${viewType === "grid"
                                ? "bg-white text-teal-700 shadow-sm ring-1 ring-black/5"
                                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                                }`}
                            title="Grid View"
                        >
                            <LayoutGrid size={14} />
                            <span className="hidden sm:inline">{t("Grid")}</span>
                        </button>
                        <button
                            onClick={() => setViewType("table")}
                            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${viewType === "table"
                                ? "bg-white text-teal-700 shadow-sm ring-1 ring-black/5"
                                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                                }`}
                            title="Table View"
                        >
                            <List size={14} />
                            <span className="hidden sm:inline">{t("Table")}</span>
                        </button>
                    </div>
                </div>

                {/* --- Content --- */}
                <div className="pt-2 md:pt-0"> {/* Added padding top on mobile to prevent overlap */}
                    {viewType === "table" ? (
                        <OrdersTable
                            ShowAddOrder={ShowAddOrder}
                            deleteOrder={deleteOrder}
                            edite={edite}
                            filters={filters}
                            setFilters={setFilters}
                            orders={visibleItems}
                            loading={loading}
                            isPaid={isPaid}
                            sendtoLiv={sendtoLiv}
                            fetchOrders={fetchOrders}
                            hasMore={hasMore}
                            loadMore={loadMore}
                            emptyMessage="No orders found matching your criteria"
                        />
                    ) : (
                        <OrdersGrid
                            ShowAddOrder={ShowAddOrder}
                            deleteOrder={deleteOrder}
                            edite={edite}
                            filters={filters}
                            setFilters={setFilters}
                            orders={visibleItems}
                            loading={loading}
                            isPaid={isPaid}
                            sendtoLiv={sendtoLiv}
                            fetchOrders={fetchOrders}
                            hasMore={hasMore}
                            loadMore={loadMore}
                            emptyMessage="No orders found matching your criteria"
                        />
                    )}
                </div>
            </div>

            {/* --- MOBILE FLOATING FILTER --- */}
            {showFillters && (
                <Model onclose={hide}>
                    <FilterPanel
                        className={"block"}
                        clearFilters={clearFilters}
                        filters={filters}
                        setFilters={setFilters}
                        uniqueItems={getUniqueItems()}
                        getUniqueState={getUniqueState()}
                    />
                </Model>
            )}

            <div
                onClick={() => setShowFillters(true)}
                className='fixed bottom-7 right-5 flex md:hidden bg-teal-600 rounded-full p-4 shadow-xl shadow-teal-500/30 cursor-pointer z-50 hover:scale-105 active:scale-95 transition-transform'
            >
                <FaFilter className='text-white' size={20} />
            </div>

        </PageContainer>
    );
};

export default OrderPage;