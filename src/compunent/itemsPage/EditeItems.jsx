import { motion } from "framer-motion";
import { useState } from "react";
import CustomImg from "../../CustomUi/CustomImg";
import handleImageUpload from "../../utility/UploadImages";
import InputImg from "../../CustomUi/InputImg";
import { Loader2 } from "lucide-react";

const EditeItems = ({ hide, item, hendelEdite }) => {
    const [uploading, setUploading] = useState(false);
    const [uploadinglan, setUploadinglan] = useState(false);
    const [loading, setloading] = useState(false);
    const [images, setImages] = useState(item.imgs || []);
    const [edit, setEdit] = useState({
        name: item.name || "",
        price: item.price || 0,
        sTitel: item.sTitel || "",
        type: item.type || "",
        lanImg: item.lanImg || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEdit((prev) => ({ ...prev, [name]: value }));
    };

    const LanImageUpload = async (event) => {
        setUploadinglan(true);
        try {
            const res = await handleImageUpload(event);
            setEdit({ ...edit, lanImg: res });
        } catch (err) {
            console.error("Upload error:", err);
        } finally {
            setUploadinglan(false);
        }
    };

    const ImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file || images.length >= 5) return;
        setUploading(true);
        try {
            const res = await handleImageUpload(event);
            setImages((prev) => [...prev, res]);
        } catch (err) {
            console.error("Upload error:", err);
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (url) => {
        setImages((prev) => prev.filter((img) => img !== url));
        if (url === edit.lanImg) setEdit((prev) => ({ ...prev, lanImg: "" }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    setloading(true)
                    hendelEdite(item._id, { ...edit, imgs: images })
                }}
                className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-lg p-4 space-y-4"
            >
                <h2 className="text-lg font-semibold text-gray-800 text-center">Edit Item</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Item Name"
                    value={edit.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={edit.price}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        name="sTitel"
                        placeholder="Short Description"
                        value={edit.sTitel}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Landing Image</label>
                    {!edit.lanImg ? (
                        <InputImg label="Upload landing image" uploading={uploadinglan} ImageUpload={LanImageUpload} />
                    ) : (
                        <motion.div layout className="flex gap-2 mt-2">
                            <CustomImg logo={[edit.lanImg]} removeImage={removeImage} size="sm" />
                        </motion.div>
                    )}
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Gallery Images</label>
                    {images.length < 5 && (
                        <InputImg label="Upload gallery images" uploading={uploading} ImageUpload={ImageUpload} />
                    )}
                    <motion.div layout className="flex flex-wrap gap-2 mt-2">
                        <CustomImg logo={images} removeImage={removeImage} size="sm" />
                    </motion.div>
                </div>
                <motion.button
                    onClick={hide}
                    whileHover={{
                        scale: 1.02,
                        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
                    }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-2 text-sm text-gray-700 rounded-md bg-gray-300 hover:bg-gray-400  font-medium transition"
                >
                    Cancel
                </motion.button>
                <motion.button
                    type="submit"
                    whileHover={{
                        scale: 1.02,
                        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
                    }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-2 text-sm bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
                >
                    {loading ? <div className=" flex items-center justify-center">
                        <Loader2 className="animate-spin h-6 w-6 text-white" />
                    </div> : "Submit"}
                </motion.button>

            </form>
        </div>
    );
};

export default EditeItems;
