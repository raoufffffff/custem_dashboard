import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-hot-toast";

const useOrders = () => {
    const [orders, setOrders] = useState([]);
    const [Allorders, setAllOrders] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchOrders = async () => {
        try {
            const userId = JSON.parse(localStorage.getItem("user"))._id;
            const res = await axios.get(`https://true-fit-dz-api.vercel.app/order/my/${userId}`);
            const sortedOrders = res.data.result.reverse().filter(e => !e.SendTo);
            // Newest first
            setAllOrders(res.data.result.reverse())
            setOrders(sortedOrders);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchOrders();
    }, []);

    const edite = async (a, b, c) => {
        try {
            const res = await axios.put(`https://true-fit-dz-api.vercel.app/order/${a}`, { status: b, not: c })
            if (res.data.good) {
                toast.success("تم   بنجاح ✅");
                fetchOrders()
            }
        } catch {
            toast.error("يرجى ملء جميع الحقول", {
                style: { border: "1px solid #ef4444" }, // red-500
            });
        }
    }
    const deleteOrder = async (a) => {
        try {
            const res = await axios.delete(`https://true-fit-dz-api.vercel.app/order/${a}`)
            if (res.data.good) {
                toast.success("تم   بنجاح ✅");
                fetchOrders()
            }
        } catch {
            toast.error("يرجى ملء جميع الحقول", {
                style: { border: "1px solid #ef4444" }, // red-500
            });
        }
    }
    const editefull = async (a, b) => {
        try {
            const res = await axios.put(`https://true-fit-dz-api.vercel.app/order/${a}`, b)
            if (res.data.good) {
                toast.success("تم التعديل بنجاح ✅");
                fetchOrders()
                // fetchOrders()
            }
        } catch {
            toast.error("يرجى ملء جميع الحقول", {
                style: { border: "1px solid #ef4444" }, // red-500
            });
        }
    }
    const CancelledOrder = orders.filter(e => (["cancelled", "failed"].includes(e.status)))
    const ConfirmedOrder = Allorders.filter(e => (["confirmed", "ready"].includes(e.status)))
    const panddingOrder = orders.filter(e => (["pending", "Connection failed 1", "Connection failed 2", "Connection failed 3", "Postponed"].includes(e.status)))
    return { orders, loading, error, panddingOrder, CancelledOrder, ConfirmedOrder, fetchOrders, edite, editefull, Allorders, deleteOrder };
};

export default useOrders;