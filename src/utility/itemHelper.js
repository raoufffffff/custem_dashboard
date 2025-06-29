import axios from 'axios';

export const submitNewItem = async (itemData) => {
    try {
        const res = await axios.post(`https://true-fit-dz-api.vercel.app/item`, itemData)
        return res.data.good
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const editItem = async (id, updatedData) => {
    try {
        const response = await fetch(`/api/items/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) throw new Error('Failed to edit item');
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};
