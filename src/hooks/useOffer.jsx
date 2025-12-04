import { useState, useEffect } from 'react';
import axios from 'axios';

const UseOffer = () => {
    const [Offers, setOffer] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchOffer = async () => {
        try {
            const userId = JSON.parse(localStorage.getItem("user"))._id;
            const res = await axios.get(`https://next-dashoard-api.vercel.app/my/${userId}`);
            setOffer(res.data.result);
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to fetch user");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchOffer();
    }, []);
    const postOffer = async (body) => {
        setLoading(true);
        try {
            await axios.post(`https://next-dashoard-api.vercel.app/`, body);
            return true;
        }
        catch (err) {
            setError(err.response?.data?.message || "Failed to post offer");
            return false;
        } finally {
            setLoading(false);
        }
    };
    return {
        Offers,
        loading,
        error,
        postOffer,
    };
};

export default UseOffer;
