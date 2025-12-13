import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

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
            localStorage.setItem("user", JSON.stringify(res.data.result))
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to fetch user");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchUser();
    }, []);

    const handleUpdateCategory = async (nerCategories, repo) => {
        setLoading(true)
        try {
            const localUser = localStorage.getItem("user");
            if (!localUser) throw new Error("User not found in localStorage");

            const userId = JSON.parse(localUser)._id;
            await axios.put(`https://true-fit-dz-api.vercel.app/user/${userId}`,
                {
                    data: { Categories: nerCategories },
                    repoName: repo
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
    const updateUser = async (body, repo) => {
        setLoading(true)
        try {
            const localUser = localStorage.getItem("user");
            if (!localUser) throw new Error("User not found in localStorage");

            const userId = JSON.parse(localUser)._id;
            await axios.put(`https://true-fit-dz-api.vercel.app/user/${userId}`,
                {
                    data: body,
                    repoName: repo
                }
            ).then(() => {
                fetchUser()
                toast.success("your website updated successfuly")
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
        password = '',
        companyLiv = {},
        repoName = "",
        link = "",
        visit = [],
        orders = 0,
        isPaid = false
    } = user || {};

    return {
        orders,
        visit,
        isPaid,
        companyLiv,
        Categories,
        _id,
        name,
        email,
        phone,
        type,

        loading,
        error,
        handleUpdateCategory,
        website,
        fetchUser,
        password,
        repoName,
        link,
        updateUser
    };
};

export default useUser;
