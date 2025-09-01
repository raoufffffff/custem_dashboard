import { useState, useMemo } from 'react';
import { isWithinInterval } from 'date-fns';

const useOrderFilters = (orders = []) => {
    // Filter state
    const [filters, setFilters] = useState({
        status: "all",       // "all" | "pending" | "confirmed" | "cancelled"
        item: "all",         // "all" | "item-name"
        customer: "",
        dateRange: { start: null, end: null },
        sortBy: "newest",    // "newest" | "oldest" | "priceHigh" | "priceLow"
    });

    // Memoized filtered + sorted orders
    const filteredOrders = useMemo(() => {
        if (!orders.length) return [];

        let result = [...orders];

        // 1. Apply status filter
        if (filters.status !== "all") {
            result = result.filter(order => order.status === filters.status);
        }

        // 2. Apply item filter
        if (filters.item !== "all") {
            result = result.filter(order => order.item.name === filters.item);
        }

        // 3. Apply customer name/phone search
        if (filters.customer) {
            const query = filters.customer.toLowerCase();
            result = result.filter(order =>
                (order.name && order.name.toLowerCase().includes(query)) ||
                (order.phone && order.phone.toLowerCase().includes(query))
            );
        }


        // 4. Apply date range filter
        if (filters.dateRange.start && filters.dateRange.end) {
            result = result.filter(order =>
                isWithinInterval(new Date(order.date), {
                    start: filters.dateRange.start,
                    end: filters.dateRange.end,
                })
            );
        }

        // 5. Apply sorting
        switch (filters.sortBy) {
            case "newest":
                return result.sort((a, b) => new Date(b.date) - new Date(a.date));
            case "oldest":
                return result.sort((a, b) => new Date(a.date) - new Date(b.date));
            case "priceHigh":
                return result.sort((a, b) => b.price - a.price);
            case "priceLow":
                return result.sort((a, b) => a.price - b.price);
            default:
                return result;
        }
    }, [orders, filters]);
    const clearFilters = () => setFilters({
        status: "all",
        item: "all",
        customer: "",
        dateRange: { start: null, end: null },
        sortBy: "newest",
    })
    return { filteredOrders, filters, setFilters, clearFilters };
};

export default useOrderFilters;