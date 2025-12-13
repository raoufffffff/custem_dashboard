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
        const localUser = localStorage.getItem("user");
        if (!localUser) throw new Error("User not found in localStorage");

        const userId = JSON.parse(localUser)._id;
        try {
            await axios.put(`https://true-fit-dz-api.vercel.app/user/${userId}`, {
                data: { website: data },
                repoName: repoName

            })
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
            const localUser = localStorage.getItem("user");
            if (!localUser) throw new Error("User not found in localStorage");
            const userId = JSON.parse(localUser)._id;

            await axios.put(`https://true-fit-dz-api.vercel.app/user/${userId}`, {
                data: { Categories: data.Categories },
                repoName: repoName
            })
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
        website = {},
        name = '',
        email = '',
        phone = '',
        type = '',
        password = '',
        Notifications = [],
        AlartNotification = false,
        NotificationsCurrentNumber = 0,
        companyLiv = {},
        repoName = "",
        link = "",
    } = user || {};
    return {
        UpdateStore,
        UpdateCategories,
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
        website,
        fetchUser,
        password,
        repoName,
        link
    }
}

export default UseUpdateStore