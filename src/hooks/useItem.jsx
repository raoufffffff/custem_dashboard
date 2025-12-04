import { useState, useEffect } from 'react';
import axios from 'axios';

const useItem = () => {
    const [Items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchItems = async () => {
        try {
            const userId = JSON.parse(localStorage.getItem("user"))._id;
            const res = await axios.get(`https://true-fit-dz-api.vercel.app/item/my/${userId}`);
            const sortedOrders = res.data.result.reverse(); // Newest first
            setItems(sortedOrders);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    const deleteItem = async (itemId) => {

        try {
            await axios.delete(`https://true-fit-dz-api.vercel.app/item/${itemId}`);
            fetchItems(); // Refresh the list after deletion
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete item");
        }
    };
    useEffect(() => {


        fetchItems();
    }, []);

    return { Items, loading, error, fetchItems, deleteItem };
}

export default useItem 