import { motion } from "framer-motion";
import useOrders from '../hooks/useOrders';
import useOrderFilters from '../hooks/useOrderFilters';
import usePagination from '../hooks/usePagination';
import { useState } from "react";
import CustomStateCard from "../compunent/OrderPageCompunents/CustomStateCard";
import FilterButtons from "../compunent/OrderPageCompunents/FilterButtons";
import FilterPanel from "../compunent/OrderPageCompunents/FilterPanel";
import SearchPanel from "../compunent/OrderPageCompunents/SearchPanel";
import OrdersTable from "../compunent/OrderPageCompunents/OrdersTable";
import DatePickerModal from "../compunent/OrderPageCompunents/DatePickerModal";
import LoadMoreButton from "../compunent/OrderPageCompunents/LoadMoreButton";
import { useSearchParams } from "react-router-dom";
import AddNewOrder from "../compunent/OrderPageCompunents/AddNewOrder";
import EditeOrder from "../compunent/OrderPageCompunents/EditeOrder";
import UseLivOrder from "../hooks/UseLivOrder";

const OrderPage = () => {
    // State for UI controls
    const [showDate, setShowDate] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchParams, setsearchParams] = useSearchParams()
    // Data hooks
    const { sendtoLiv } = UseLivOrder()

    const { orders, loading, edite, fetchOrders, editefull } = useOrders();
    const {
        filteredOrders,
        filters,
        setFilters,
        clearFilters,
    } = useOrderFilters(orders);
    const { visibleItems, hasMore, loadMore } = usePagination(filteredOrders);
    // Derived values
    const stats = {
        total: filteredOrders.length,
        confirmed: filteredOrders.filter(o => o.status === 'confirmed').length,
        pending: filteredOrders.filter(e => (["pending", "Connection failed 1", "Connection failed 2"].includes(e.status))).length,
        cancelled: filteredOrders.filter(e => (["cancelled", "failed"].includes(e.status))).length
    };
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
    const togeleFilter = () => {
        setFilterOpen(!filterOpen)
        setSearchOpen(false)
    }
    const togeleSearch = () => {
        setFilterOpen(false)

        setSearchOpen(!searchOpen)
    }
    const addNewOrder = () => {
        setsearchParams((searchParams) => {
            searchParams.set("new", "true");
            return searchParams;
        })
    }
    const EdetAllOrder = (id) => {
        setsearchParams((searchParams) => {
            searchParams.set("edite", id);
            return searchParams;
        })
    }
    const hide = () => {
        setsearchParams((searchParams) => {
            searchParams.delete("new");
            searchParams.delete("edite");
            return searchParams;
        })
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="p-6 max-w-7xl mx-auto"
        >
            {searchParams.get("new") && <AddNewOrder fetchOrders={fetchOrders} hide={hide} />}
            {searchParams.get("edite") && <EditeOrder id={searchParams.get("edite")} editefull={editefull} hide={hide} />}
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <CustomStateCard
                    loading={loading}
                    label="Total Orders"
                    value={stats.total}
                    color="gray"
                />
                <CustomStateCard
                    loading={loading}
                    label="Confirmed"
                    value={stats.confirmed}
                    color="green"
                />
                <CustomStateCard
                    loading={loading}
                    label="Pending"
                    value={stats.pending}
                    color="yellow"
                />
                <CustomStateCard
                    loading={loading}
                    label="Cancelled"
                    value={stats.cancelled}
                    color="red"
                />
            </div>

            {/* Action Buttons */}

            <FilterButtons
                add
                AddNewOrder={addNewOrder}
                filterOpen={filterOpen}
                filteredOrders={filteredOrders}
                searchOpen={searchOpen}
                visibleItems={visibleItems}
                setFilterOpen={togeleFilter}
                setSearchOpen={togeleSearch}
            />

            {/* Filter Panels */}
            {filterOpen && (
                <FilterPanel
                    filters={filters}
                    setFilters={setFilters}
                    uniqueItems={getUniqueItems()}
                    clearFilters={clearFilters}
                    onDateClick={() => setShowDate(true)}
                />
            )}

            {searchOpen && (
                <SearchPanel
                    customer={filters.customer}
                    setCustomer={(customer) => setFilters({ ...filters, customer })}
                />
            )}

            {/* Orders Table */}
            <OrdersTable
                EdetAllOrder={EdetAllOrder}
                edite={edite}
                orders={visibleItems}
                loading={loading}
                sendtoLiv={sendtoLiv}
                fetchOrders={fetchOrders}
                emptyMessage="No orders found matching your criteria"
            />

            {/* Load More Button */}
            {hasMore && (
                <LoadMoreButton
                    remaining={filteredOrders.length - visibleItems.length}
                    onClick={loadMore}
                />
            )}

            {/* Date Picker Modal */}
            {showDate && (
                <DatePickerModal
                    dateRange={filters.dateRange}
                    onApply={(dateRange) => setFilters({ ...filters, dateRange })}
                    onReset={() => setFilters({ ...filters, dateRange: { start: null, end: null } })}
                    onCancel={() => setShowDate(false)}
                />
            )}
        </motion.div>
    );
};

export default OrderPage;