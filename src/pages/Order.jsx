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

const OrderPage = () => {
    // State for UI controls
    const [showDate, setShowDate] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    // Data hooks
    const { orders, loading } = useOrders();
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
        pending: filteredOrders.filter(o => o.status === 'pending').length,
        cancelled: filteredOrders.filter(o => o.status === 'cancelled').length
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
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="p-6 max-w-7xl mx-auto"
        >
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
                orders={visibleItems}
                loading={loading}
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