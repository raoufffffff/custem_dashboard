import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UseLivOrder = () => {
    const [orders, setOrders] = useState([]);
    const [Livloading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch orders from backend
    const fetchOrders = async () => {
        setLoading(true);
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user?._id) throw new Error("User not found");

            const res = await axios.get(`https://true-fit-dz-api.vercel.app/order/my/liv/${user._id}`);

            // Only show orders that haven't been sent (SendTo === false)
            const sortedOrders = res.data.result
                ?.filter(order => !order.SendTo)
                .reverse();

            setOrders(sortedOrders);
        } catch (err) {
            setError(err.response?.data?.message || "فشل في تحميل الطلبات");
        } finally {
            setLoading(false);
        }
    };

    // Send orders to delivery service
    const sendtoLiv = async (order) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user?._id) throw new Error("User not found");

            const res = await axios.post(`https://true-fit-dz-api.vercel.app/order/add_colis`, {
                orders: order, // make sure it's an array
                userId: user._id
            });

            console.log("SendToLiv result:", res.data);

            // Refresh orders after successful send
            fetchOrders();
        } catch (err) {
            console.error("SendToLiv error:", err.response?.data || err.message);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return { orders, Livloading, error, sendtoLiv };
};

export default UseLivOrder;
