import { motion } from "framer-motion";
import useOrders from '../hooks/useOrders';
import useOrderFilters from '../hooks/useOrderFilters';
import usePagination from '../hooks/usePagination';
import { useState } from "react";
import PageContainer from '../CustomUi/PageContainer';

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
import OrdersSummary from "../compunent/orders/OrdersSummary";

const OrderPage = () => {
    // State for UI controls
    const [showDate, setShowDate] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchParams, setsearchParams] = useSearchParams()
    // Data hooks
    const { sendtoLiv } = UseLivOrder()

    const { orders, Allorders, loading, edite, fetchOrders, editefull, deleteOrder } = useOrders();
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
        <PageContainer
            about={"Management"}
            titel={"Order"}
            className={"gap-2"}
        >
            <OrdersSummary Allorders={orders} />
            <FilterPanel
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
                orders={visibleItems}
                loading={loading}
                sendtoLiv={sendtoLiv}
                fetchOrders={fetchOrders}
                emptyMessage="No orders found matching your criteria"
            />
        </PageContainer>
    );
};

export default OrderPage;