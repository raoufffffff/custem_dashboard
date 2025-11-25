import useOrders from '../hooks/useOrders';
import useOrderFilters from '../hooks/useOrderFilters';
import usePagination from '../hooks/usePagination';
import { useState } from "react";
import PageContainer from '../CustomUi/PageContainer';
import FilterPanel from "../compunent/OrderPageCompunents/FilterPanel";
import OrdersTable from "../compunent/OrderPageCompunents/OrdersTable";
import { useOutletContext, useSearchParams } from "react-router-dom";
import UseLivOrder from "../hooks/UseLivOrder";
import OrdersSummary from "../compunent/orders/OrdersSummary";
import { FaFilter } from "react-icons/fa";
import Model from '../CustomUi/Model';
import { useTranslation } from 'react-i18next';
import { Crown } from 'lucide-react';

const OrderPage = () => {
    // State for UI controls
    const [showFillters, setShowFillters] = useState(false)
    const [searchParams, setsearchParams] = useSearchParams()
    // Data hooks
    const { sendtoLiv } = UseLivOrder()
    const { t } = useTranslation("dashboard");
    const user = useOutletContext()
    const { isPaid } = user
    const { orders, loading, edite, fetchOrders, deleteOrder } = useOrders();
    const {
        filteredOrders,
        filters,
        setFilters,
        clearFilters,
    } = useOrderFilters(orders);
    const { visibleItems, hasMore, loadMore } = usePagination(filteredOrders);
    // Derived values
    const hide = () => setShowFillters(false)
    const getUniqueItems = () => {
        const uniqueItems = [];
        const seen = new Set();

        for (const orderItem of orders) {
            const item = orderItem.item;
            if (!seen.has(item._id)) {
                seen.add(item._id);
                uniqueItems.push({
                    id: item._id,
                    name: item.name
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


    const EdetAllOrder = (id) => {
        setsearchParams((searchParams) => {
            searchParams.set("edite", id);
            return searchParams;
        })
    }

    return (
        <PageContainer
            about={t("Management")}
            titel={t("Orders")}
            className={"gap-2 relative"}
        >

            {!isPaid && (
                <div className="mb-6 rounded-xl border border-purple-100 bg-purple-50 p-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                                <Crown size={20} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">
                                    {t("UnlockFullAccess")}
                                </h3>
                                <p className="text-sm text-gray-600 mt-0.5">
                                    {t("UpgradeYourPlanToAccessOrderManagement")}
                                </p>
                            </div>
                        </div>

                        <a
                            href="#"
                            className="whitespace-nowrap rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-purple-700 transition-all active:scale-95"
                        >
                            {t("UpgradeNow")}
                        </a>
                    </div>
                </div>
            )}
            {showFillters && <Model
                onclose={hide}
            >
                <FilterPanel
                    className={"block "}
                    clearFilters={clearFilters}
                    filters={filters}
                    setFilters={setFilters}
                    uniqueItems={getUniqueItems()}
                    getUniqueState={getUniqueState()}
                />
            </Model>}
            <div
                onClick={() => setShowFillters(true)}
                className='fixed bottom-7 right-5 flex md:hidden bg-purple-600 rounded-full p-3 cursor-pointer'
            >
                <FaFilter className='text-white' size={20} />
            </div>
            <OrdersSummary Allorders={orders} />
            <FilterPanel
                className={"hidden md:block"}
                clearFilters={clearFilters}
                filters={filters}
                setFilters={setFilters}
                uniqueItems={getUniqueItems()}
                getUniqueState={getUniqueState()}
            />
            <OrdersTable
                deleteOrder={deleteOrder}
                EdetAllOrder={EdetAllOrder}
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
        </PageContainer>
    );
};

export default OrderPage;