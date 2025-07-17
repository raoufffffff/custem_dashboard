import { useState, useEffect } from 'react';
import axios from 'axios';

const useUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchUser = async () => {
        try {
            const localUser = localStorage.getItem("user");
            if (!localUser) throw new Error("User not found in localStorage");

            const userId = JSON.parse(localUser)._id;
            const res = await axios.get(`https://true-fit-dz-api.vercel.app/user/${userId}`);
            setUser(res.data.result);
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to fetch user");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchUser();
    }, []);
    const setNotificationsToDefult = async () => {
        try {
            const localUser = localStorage.getItem("user");
            if (!localUser) throw new Error("User not found in localStorage");

            const userId = JSON.parse(localUser)._id;
            await axios.put(`https://true-fit-dz-api.vercel.app/user/${userId}`,
                {
                    AlartNotification: false,
                    NotificationsCurrentNumber: 0
                }
            ).then(() => {
                fetchUser()
            })
        } catch (error) {
            setError(error.response?.data?.message || error.message || "Failed to fetch user");
        }
    }

    const handleUpdateCategory = async (nerCategories, repo) => {
        setLoading(true)
        try {
            const localUser = localStorage.getItem("user");
            if (!localUser) throw new Error("User not found in localStorage");

            const userId = JSON.parse(localUser)._id;
            await axios.put(`https://next-website-server.vercel.app/update-Category`,
                {
                    id: userId,
                    Categories: nerCategories,
                    name: repo
                }
            ).then(() => {
                fetchUser()
            })
        } catch (error) {
            setError(error.response?.data?.message || error.message || "Failed to fetch user");
        } finally {
            setLoading(false)
        }
    }

    let {
        _id = '',
        Categories = [],
        website = {},
        name = '',
        email = '',
        phone = '',
        type = '',
        Notifications = [],
        AlartNotification = false,
        NotificationsCurrentNumber = 0,
        companyLiv = {}
    } = user || {};

    return {
        companyLiv,
        Categories,
        _id,
        name,
        email,
        phone,
        type,
        Notifications,
        AlartNotification,
        NotificationsCurrentNumber,
        loading,
        error,
        setNotificationsToDefult,
        handleUpdateCategory,
        website,
        fetchUser
    };
};

export default useUser;
