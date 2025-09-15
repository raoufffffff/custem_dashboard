import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';

const UseUpdateStore = () => {
    const [loading, setLoading] = useState(false);
    const UpdateStore = async (data) => {
        setLoading(true)
        try {
            await axios.put(`https://next-website-server.vercel.app/update-template`, data)
            toast.success("your website updated successfuly")
        } catch {
            toast.error("something went wrong")
        } finally {
            setLoading(false)
        }
    }

    const UpdateCategories = async (data) => {
        setLoading(true)
        try {
            await axios.put(`https://next-website-server.vercel.app/update-Category`, data)
            toast.success("your website updated successfuly")
            return true
        } catch {
            toast.error("something went wrong")
            return false
        } finally {
            setLoading(false)
        }
    }
    return {
        loading,
        UpdateStore,
        UpdateCategories
    }
}

export default UseUpdateStore