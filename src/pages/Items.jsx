import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Plus, Loader2, Pen, Save } from "lucide-react";
import useItem from "../hooks/useItem";
import CustomImg from "../CustomUi/CustomImg";
import useUser from "../hooks/useUser";
import EditeItems from "../compunent/itemsPage/EditeItems";

const Items = () => {
    const { Items, loading, fetchItems } = useItem()
    const { _id, website } = useUser()
    const [showPixelModal, setShowPixelModal] = useState(false);
    const [showediteModal, setShowediteModal] = useState({
        show: false,
        item: {}
    });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [Update, setUpdate] = useState(false);
    const [Ucan, setUcan] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [pixelValue, setPixelValue] = useState("");
    const [loadingStates, setLoadingStates] = useState({
        toggle: {},
        delete: false
    });



    const handleDeleteClick = (id) => {
        setSelectedItem(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            setUcan(true)
            setLoadingStates(prev => ({ ...prev, delete: true }));
            await axios.delete(`https://true-fit-dz-api.vercel.app/item/${selectedItem}`);
            await fetchItems();
            setShowDeleteModal(false);
        } catch (error) {
            console.log("Error deleting item:", error);
        } finally {
            setLoadingStates(prev => ({ ...prev, delete: false }));
        }
    };

    const handleAddPixel = (id) => {
        setSelectedItem(id);
        setShowPixelModal(true);
    };

    const handleCloseModal = () => {
        setShowPixelModal(false);
        setShowDeleteModal(false);
        setPixelValue("");
        setSelectedItem(null);
    };

    const handlePixelSubmit = async () => {
        try {
            setUcan(true)
            await axios.put(`https://true-fit-dz-api.vercel.app/item/${selectedItem}`, {
                Fpixal: pixelValue
            });
            fetchItems()
            handleCloseModal();
        } catch (error) {
            console.log(error);
        }
    };
    const hendelEdite = async (id, data) => {
        setUcan(true)
        try {
            await axios.put(`https://true-fit-dz-api.vercel.app/item/${id}`, data);
            hide()
            fetchItems()
        } catch (error) {
            console.log("Error updating show status:", error);
        } finally {
            setLoadingStates(prev => ({
                ...prev,
                toggle: { ...prev.toggle, [id]: false }
            }));
        }
    }
    const toggleShowStatus = async (id, currentStatus) => {
        setUcan(true)
        try {
            setLoadingStates(prev => ({
                ...prev,
                toggle: { ...prev.toggle, [id]: true }
            }));

            await axios.put(`https://true-fit-dz-api.vercel.app/item/${id}`, {
                best: !currentStatus
            });

            fetchItems()
        } catch (error) {
            console.log("Error updating show status:", error);
        } finally {
            setLoadingStates(prev => ({
                ...prev,
                toggle: { ...prev.toggle, [id]: false }
            }));
        }
    };
    const UpdateWebsete = async () => {
        setUpdate(true)
        setUcan(false)
        try {
            const res = await axios.put(`https://next-website-server.vercel.app/update-item`, {
                id: _id,
                name: website.repoName
            })
            if (res.data.success) {
                setUpdate(false)
            }
        } catch (error) {
            console.log(error);

        }
    }
    if (loading || Update) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
            </div>
        );
    }
    const hide = () => {
        setShowDeleteModal(false)
        setShowediteModal({ item: {}, show: false })
        setShowPixelModal(false)
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
            {Ucan && (
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={UpdateWebsete}
                    className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Save className="h-5 w-5" />
                    <span>Save to Website</span>
                </motion.button>
            )}
            <div className="overflow-x-scroll rounded-xl shadow-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Show</th>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Image</th>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Pixel</th>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {Items.map((item, index) => (
                            <motion.tr
                                key={item._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="relative">
                                        <button
                                            type="button"
                                            disabled={loadingStates.toggle[item._id]}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${item.best ? 'bg-blue-500' : 'bg-gray-300'} ${loadingStates.toggle[item._id] ? 'opacity-50' : ''}`}
                                            onClick={() => toggleShowStatus(item._id, item.best)}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${item.best ? 'translate-x-6' : 'translate-x-1'}`}
                                            />
                                        </button>
                                        {loadingStates.toggle[item._id] && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Loader2 className="animate-spin h-4 w-4 text-blue-500" />
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <CustomImg tabel logo={[item.imgs[0]]} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">DZD {item.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.type}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.Fpixal || "Not set"}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleDeleteClick(item._id)}
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
                                        <button
                                            onClick={() =>
                                                setShowediteModal({
                                                    show: true,
                                                    item: item
                                                })}
                                            className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:bg-blue-200 transition-colors rounded-full cursor-pointer"
                                        >                 <Pen className="h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pixel edite */}
            {showediteModal.show && <EditeItems item={showediteModal.item} hide={hide} hendelEdite={hendelEdite} />}

            {/* Pixel Modal */}
            {showPixelModal && (
                <div className="fixed inset-0 bg-[#000c] bg-opacity-50 flex items-center justify-center z-50">
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

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-[#000c] bg-opacity-50 flex items-center justify-center z-50">
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="bg-white rounded-lg shadow-xl w-full max-w-md"
                    >
                        <div className="p-4 border-b">
                            <h3 className="text-lg font-semibold">Confirm Deletion</h3>
                        </div>
                        <div className="p-4">
                            <p className="text-gray-700">Are you sure you want to delete this item? This action cannot be undone.</p>
                        </div>
                        <div className="p-4 border-t flex justify-end gap-2">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                disabled={loadingStates.delete}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center gap-2"
                            >
                                {loadingStates.delete && <Loader2 className="animate-spin h-4 w-4" />}
                                Delete
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
};

export default Items;