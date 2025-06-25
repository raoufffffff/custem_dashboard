import { useState, useEffect } from 'react';
import axios from 'axios';

const useOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const userId = JSON.parse(localStorage.getItem("user"))._id;
                const res = await axios.get(`https://true-fit-dz-api.vercel.app/order/my/${userId}`);
                const sortedOrders = res.data.result.reverse(); // Newest first
                setOrders(sortedOrders);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch orders");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return { orders, loading, error };
};

export default useOrders;