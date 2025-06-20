import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Plus, Loader2, ChartNoAxesCombined } from "lucide-react";
import { Link } from "react-router-dom";

const Items = () => {
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [pixelValue, setPixelValue] = useState("");

    useEffect(() => {
        const getItems = async () => {
            try {
                const res = await axios.get(`https://true-fit-dz-api.vercel.app/item`);
                if (res.data.good) {
                    setItems(res.data.result);
                    setLoading(false);
                }
            } catch (error) {
                console.log("Error fetching items:", error);
            }
        };
        getItems();
    }, []);

    const handleDelete = async (id) => {
        console.log("Delete item with id:", id);
    };

    const handleAddPixel = (id) => {
        setSelectedItem(id);
        setShow(true);
    };

    const handleCloseModal = () => {
        setShow(false);
        setPixelValue("");
        setSelectedItem(null);
    };

    const handlePixelSubmit = async () => {
        try {
            await axios.put(`https://true-fit-dz-api.vercel.app/item/${selectedItem}`, {
                Fpixal: pixelValue
            });
            console.log(`Added pixel "${pixelValue}" to item`, selectedItem);
            setItems(items.map(item =>
                item._id === selectedItem ? { ...item, Fpixal: pixelValue } : item
            ));
            handleCloseModal();
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-6 max-w-7xl mx-auto"
        >
            <motion.h1
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="text-2xl font-bold text-center mb-6"
            >
                Your Store Items
            </motion.h1>

            <div className="overflow-x-scroll a rounded-xl shadow-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Image</th>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Pixel</th>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {items.map((item, index) => (
                            <motion.tr
                                key={item._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <motion.img
                                        whileHover={{ scale: 1.1 }}
                                        src={
                                            item.imgs && item.imgs[0]
                                                ? item.imgs[0]
                                                : "https://via.placeholder.com/50"
                                        }
                                        alt={item.name}
                                        className="w-12 h-12 object-cover rounded"
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">DZD {item.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.type}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.Fpixal || "Not set"}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="p-2 text-red-500 hover:text-red-700 rounded-full hover:bg-red-100"
                                            aria-label="Delete"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => handleAddPixel(item._id)}
                                            className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                                        >
                                            <Plus className="h-4 w-4" />
                                            <span>Pixel</span>
                                        </button>
                                        <Link
                                            to={'/'}
                                        >                         <ChartNoAxesCombined />
                                        </Link>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {show && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="bg-white rounded-lg shadow-xl w-full max-w-md"
                    >
                        <div className="p-4 border-b">
                            <h3 className="text-lg font-semibold">Add Pixel Code</h3>
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pixel Value</label>
                            <input
                                type="text"
                                autoFocus
                                value={pixelValue}
                                onChange={(e) => setPixelValue(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter pixel value"
                            />
                        </div>
                        <div className="p-4 border-t flex justify-end gap-2">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePixelSubmit}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Submit
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
};

export default Items;