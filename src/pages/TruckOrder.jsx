import { Loader2 } from "lucide-react"
import UseLivOrder from "../hooks/UseLivOrder"
import useItem from "../hooks/useItem"
import OrdersTable from "../compunent/OrderPageCompunents/OrdersTable"
import TruckOrdersTable from "../compunent/TruckOrder/TruckOrdersTable"
import usePagination from "../hooks/usePagination"
import { useState } from "react"
import FilterPanel from "../compunent/OrderPageCompunents/FilterPanel"
import FilterButtons from "../compunent/OrderPageCompunents/FilterButtons"
import useTruckOrderFilters from "../hooks/useTruckOrderFilters"
import LoadMoreButton from "../compunent/OrderPageCompunents/LoadMoreButton"
import DatePickerModal from "../compunent/OrderPageCompunents/DatePickerModal"
import SearchPanel from "../compunent/OrderPageCompunents/SearchPanel"
import CustomStateCard from "../compunent/OrderPageCompunents/CustomStateCard"


const TruckOrder = () => {
    const [showDate, setShowDate] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const { Livloading, orders } = UseLivOrder()
    const { Items, loading } = useItem()
    const {
        filteredOrders,
        filters,
        setFilters,
        clearFilters,
    } = useTruckOrderFilters(orders);
    const { visibleItems, hasMore, loadMore } = usePagination(filteredOrders);
    const mapSituationToStatus = (situation) => {
        if ([
            "Livrée [ Recouvert ]",
            "Livrée [ Encaisser ]",
            "Livrée"
        ].includes(situation)) return "confirmed";

        if ([
            "Reporté",
            "Au Bureau",
            "En Préparation",
            "Dispatcher",
            "SD - En Attente du Client",
            "SD - Appel sans Réponse 1",
            "SD - Appel sans Réponse 2",
            "SD - Appel sans Réponse 3",
            "Appel sans Réponse 2"
        ].includes(situation)) return "pending";

        if ([
            "Retour Livreur",
            "Retour de Dispatche",
            "Retour Client",
            "Retour Navette"
        ].includes(situation)) return "cancelled";

        return "unknown"; // fallback
    };
    const stats = {
        total: filteredOrders.length,
        confirmed: filteredOrders.filter(o => mapSituationToStatus(o.Situation) === 'confirmed').length,
        pending: filteredOrders.filter(o => mapSituationToStatus(o.Situation) === 'pending').length,
        cancelled: filteredOrders.filter(o => mapSituationToStatus(o.Situation) === 'cancelled').length,
    };

    const togeleFilter = () => {
        setFilterOpen(!filterOpen)
        setSearchOpen(false)
    }
    const getUniqueItems = () => {
        const uniqueItems = [];
        const seen = new Set();

        for (const orderItem of orders) {
            const item = orderItem.TProduit;
            if (!seen.has(item)) {
                seen.add(item);
                uniqueItems.push({
                    id: item,
                    name: item
                });
            }
        }
        return uniqueItems;
    };
    const getUniqueStatus = () => {
        const uniqueItems = [];
        const seen = new Set();

        for (const orderItem of orders) {
            const item = orderItem.Situation;
            if (!seen.has(item)) {
                seen.add(item);
                uniqueItems.push(item);
            }
        }
        return uniqueItems;
    };
    const togeleSearch = () => {
        setFilterOpen(false)

        setSearchOpen(!searchOpen)
    }
    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <CustomStateCard
                    loading={Livloading}
                    label="Total Orders"
                    value={stats.total}
                    color="gray"
                />
                <CustomStateCard
                    loading={Livloading}
                    label="Confirmed"
                    value={stats.confirmed}
                    color="green"
                />
                <CustomStateCard
                    loading={Livloading}
                    label="Pending"
                    value={stats.pending}
                    color="yellow"
                />
                <CustomStateCard
                    loading={Livloading}
                    label="Cancelled"
                    value={stats.cancelled}
                    color="red"
                />
            </div>
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
                    Situation={true}
                    getUniqueStatus={getUniqueStatus}
                    filters={filters}
                    setFilters={setFilters}
                    uniqueItems={getUniqueItems()}
                    clearFilters={clearFilters}
                    onDateClick={() => setShowDate(true)}
                />
            )}

            {searchOpen && (
                <SearchPanel
                    Tracking={true}
                    customer={filters.customer}
                    setCustomer={(customer) => setFilters({ ...filters, customer })}
                />
            )}
            <TruckOrdersTable
                Items={Items}
                orders={visibleItems}
                loading={loading}
                Livloading={Livloading}
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
        </div>
    )
}

export default TruckOrder