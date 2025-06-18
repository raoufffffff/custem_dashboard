import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Underline from '@tiptap/extension-underline';
import ListItem from '@tiptap/extension-list-item';
import { firebase } from '../config'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AddItems = () => {
    const router = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        discountPrice: '',
        pixel: '',
    });
    console.log(formData);

    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);

    // Tiptap Editor Setup
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextStyle,
            Color,
            Underline,
            ListItem,
        ],
        content: '',
        onUpdate: ({ editor }) => {
            // Update formData.description when editor content changes
            setFormData(prev => ({
                ...prev,
                des: editor.getHTML(),
            }));
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file || images.length >= 5) return;

        try {
            setUploading(true);

            // Create a storage reference
            const storageRef = firebase.storage().ref().child(`images/${Date.now()}-${file.name}`);

            // Upload the file directly (no need to convert to blob or use fetch)
            const snapshot = await storageRef.put(file);

            // Get the publicly accessible URL
            const downloadURL = await snapshot.ref.getDownloadURL();

            console.log('Image uploaded and accessible at:', downloadURL);

            // Add the image URL to state
            setImages((prev) => [...prev, downloadURL]);
        } catch (err) {
            console.error('Upload error:', err);
        } finally {
            setUploading(false);
        }
    };


    const removeImage = (url) => {
        setImages((prev) => prev.filter((img) => img !== url));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`https://true-fit-dz-api.vercel.app/item`, { ...formData, imgs: images })
                .then(() => {
                    router('/')
                })
        } catch (error) {
            console.log(error);

        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-xl"
        >
            <motion.h2
                className="text-2xl font-bold text-black mb-6"
                whileHover={{ scale: 1.02 }}
            >
                Add New Item
            </motion.h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div whileHover={{ scale: 1.01 }}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div whileHover={{ scale: 1.01 }}>
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        />
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.01 }}>
                        <input
                            type="number"
                            name="discountPrice"
                            placeholder="Discount Price"
                            value={formData.discountPrice}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        />
                    </motion.div>
                </div>

                <motion.div whileHover={{ scale: 1.01 }}>
                    <input
                        type="number"
                        name="pixel"
                        placeholder="Pixel (optional)"
                        value={formData.pixel}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    />
                </motion.div>
                <motion.div whileHover={{ scale: 1.01 }}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>

                    {/* Tiptap Toolbar */}
                    {editor && (
                        <div className="flex flex-wrap gap-1 mb-2 border-b pb-2">
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().toggleBold().run()}
                                className={`p-2 rounded ${editor.isActive('bold') ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                            >
                                <strong>B</strong>
                            </button>
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().toggleItalic().run()}
                                className={`p-2 rounded ${editor.isActive('italic') ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                            >
                                <em>I</em>
                            </button>
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().toggleUnderline().run()}
                                className={`p-2 rounded ${editor.isActive('underline') ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                            >
                                <u>U</u>
                            </button>
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().toggleBulletList().run()}
                                className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                            >
                                • List
                            </button>
                            <input
                                type="color"
                                onChange={e => editor.chain().focus().setColor(e.target.value).run()}
                                className="w-8 h-8 cursor-pointer"
                                value={editor.getAttributes('textStyle').color || '#000000'}
                            />
                        </div>
                    )}

                    {/* Tiptap Editor */}
                    <div className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all min-h-[120px]">
                        <EditorContent editor={editor} />
                    </div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.01 }}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Upload Images (max 5)
                    </label>
                    <motion.label
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                    >
                        Choose File
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </motion.label>
                    {uploading && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs text-gray-500 mt-1"
                        >
                            Uploading...
                        </motion.p>
                    )}
                </motion.div>

                <motion.div
                    layout
                    className="flex flex-wrap gap-3 mt-3"
                >
                    {images.map((url, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            className="relative w-24 h-24"
                        >
                            <img
                                src={url}
                                alt="uploaded"
                                className="w-full h-full object-cover rounded-lg shadow-sm"
                            />
                            <motion.button
                                type="button"
                                onClick={() => removeImage(url)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md"
                            >
                                ×
                            </motion.button>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors w-full"
                >
                    Submit
                </motion.button>
            </form>
        </motion.div>
    );
};

export default AddItems;