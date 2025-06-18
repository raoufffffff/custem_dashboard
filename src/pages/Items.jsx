import axios from "axios"
import { useEffect, useState } from "react"

const Items = () => {
    const [loading, setLoading] = useState(true)
    const [show, setShow] = useState(false)
    const [items, setItems] = useState([])
    const [selectedItem, setSelectedItem] = useState(null)
    const [pixelValue, setPixelValue] = useState("")

    useEffect(() => {
        const getItems = async () => {
            try {
                const res = await axios.get(`https://true-fit-dz-api.vercel.app/item`)
                if (res.data.good) {
                    setItems(res.data.result)
                    setLoading(false)
                }
            } catch (error) {
                console.log("Error fetching items:", error)
            }
        }
        getItems()
    }, [])

    const handleDelete = async (id) => {
        console.log("Delete item with id:", id)
    }

    const handleAddPixel = (id) => {
        setSelectedItem(id)
        setShow(true)
    }

    const handleCloseModal = () => {
        setShow(false)
        setPixelValue("")
        setSelectedItem(null)
    }

    const handlePixelSubmit = async () => {
        try {
            axios.put(`https://true-fit-dz-api.vercel.app/item/${selectedItem}`, { Fpixal: pixelValue })
                .then((res) => {
                    if (res.data.good) {
                        console.log(`Add pixel "${pixelValue}" to item`, selectedItem)
                        handleCloseModal()
                    }
                })
        } catch (error) {
            console.log(error);

        }

    }

    if (loading) return <h1 className="text-center text-xl font-semibold mt-10">Loading...</h1>

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-center mb-6">Your Store Items</h1>
            <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-3 border">Image</th>
                            <th className="px-4 py-3 border">Name</th>
                            <th className="px-4 py-3 border">Price</th>
                            <th className="px-4 py-3 border">Fpixal</th>
                            <th className="px-4 py-3 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item._id} className="text-center border-t hover:bg-gray-50">
                                <td className="px-4 py-2 border">
                                    <img
                                        src={
                                            item.imgs && item.imgs[0]
                                                ? item.imgs[0]
                                                : "https://via.placeholder.com/50"
                                        }
                                        alt="img"
                                        className="w-12 h-12 object-cover mx-auto rounded"
                                    />
                                </td>
                                <td className="px-4 py-2 border">{item.name}</td>
                                <td className="px-4 py-2 border">${item.price}</td>
                                <td className="px-4 py-2 border">{item.Fpixal}</td>
                                <td className="px-4 py-2 border space-x-2">
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleAddPixel(item._id)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
                                    >
                                        Add Pixel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {show && (
                <div className="fixed inset-0 bg-[#000b] flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <h2 className="text-xl font-semibold mb-4 text-center">Add Pixel</h2>
                        <label className="block mb-2 text-gray-700 font-medium">Add pixel here:</label>
                        <input
                            type="text"
                            value={pixelValue}
                            onChange={(e) => setPixelValue(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter pixel value"
                        />
                        <div className="flex justify-end mt-4 space-x-2">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePixelSubmit}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Items
