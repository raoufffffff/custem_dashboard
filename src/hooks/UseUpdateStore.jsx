import axios from 'axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const UseUpdateStore = () => {
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);
    const fetchUser = async () => {
        try {
            const localUser = localStorage.getItem("user");
            if (!localUser) throw new Error("User not found in localStorage");

            const userId = JSON.parse(localUser)._id;
            const res = await axios.get(`https://true-fit-dz-api.vercel.app/user/${userId}`);
            setUser(res.data.result);
        } catch {
            toast.error("something went wrong")
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchUser();
    }, []);
    const UpdateStore = async (data) => {
        setLoading(true)
        try {
            await axios.put(`https://next-website-server.vercel.app/update-template`, data)
            fetchUser()
            toast.success("your website updated successfuly")
        } catch {
            setLoading(false)
            toast.error("something went wrong")
        }
    }

    const UpdateCategories = async (data) => {
        setLoading(true)
        try {
            await axios.put(`https://next-website-server.vercel.app/update-Category`, data)
            toast.success("your website updated successfuly")
            fetchUser()
            return true
        } catch {
            toast.error("something went wrong")
            return false
        } finally {
            setLoading(false)
        }
    }


    let {
        _id = '',
        Categories = [],
        repoName
    } = user || {};
    return {
        loading,
        UpdateStore,
        UpdateCategories,
        Categories,
        repoName,
        _id
    }
}

export default UseUpdateStore