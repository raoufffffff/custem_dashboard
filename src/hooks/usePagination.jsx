import { useState } from 'react';

const usePagination = (filteredOrders = [], initialCount = 10) => {
    const [visibleCount, setVisibleCount] = useState(initialCount);

    const visibleItems = filteredOrders.slice(0, visibleCount);
    const hasMore = visibleCount < filteredOrders.length;

    const loadMore = () => {
        if (hasMore) setVisibleCount(v => v + 10)
    };

    return { visibleItems, hasMore, loadMore };
};

export default usePagination;