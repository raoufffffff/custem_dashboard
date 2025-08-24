import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { Loader2 } from 'lucide-react';
import handleImageUpload from '../utility/UploadImages';
import { submitNewItem } from '../utility/itemHelper';
import InputImg from '../CustomUi/InputImg';
import CustomImg from '../CustomUi/CustomImg';
import BoxCard from '../CustomUi/BoxCard';
import PageContainer from '../CustomUi/PageContainer';
const AddItems = () => {
    const router = useNavigate()
    const { _id, loading, Categories } = useUser()
    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        oldPrice: 0,
        ShortDescription: '',
        Description: '',
        type: "",
    });
    const setValue = (e) => {
        setFormData((prev) => ({ ...prev, Description: e }))
    }

    const [lanImg, setlanImg] = useState([]);
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);

    // Tiptap Editor Setup
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const LanImageUpload = async (event) => {

        setUploading(true);
        try {
            const res = await handleImageUpload(event)
            setlanImg((prev) => [...prev, res])
        } catch (err) {
            console.error('Upload error:', err);

        } finally {
            setUploading(false);
        }
    }

    const ImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file || images.length >= 5) return;
        setUploading(true);
        try {
            const res = await handleImageUpload(event)
            setImages((prev) => [...prev, res]);

        } catch (err) {
            console.error('Upload error:', err);

        } finally {
            setUploading(false);
        }
    }

    const removeImage = (url) => {
        setImages((prev) => prev.filter((img) => img !== url));
    };
    const removelanImg = (url) => {
        setlanImg((prev) => prev.filter((img) => img !== url));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = { ...formData, imgs: images, userId: _id }
        try {
            const res = await submitNewItem(form)
            if (res) {
                router('/')
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <PageContainer
            about={"Add"}
            titel={"Products"}
        >

            <BoxCard
                small={true}
                about={"General"}
            >
                <div
                    className='my-2'
                >
                    <label className="block mb-2 font-medium text-gray-600">Product name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Product name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    />
                </div>
                <div
                    className='my-2'
                >
                    <label className="block mb-2 font-medium text-gray-600">Product Short Description (Optional)</label>
                    <textarea
                        type="text"
                        name="ShortDescription"
                        placeholder="Product Short Description"
                        value={formData.Description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    />
                </div>
            </BoxCard>
            <BoxCard
                small={true}
                about={"Images"}
            >
                <p
                    className='text-sm text-gray-500 mb-2'
                >Product images should preferably be square, for example 700x700 pixels.</p>
                <motion.div
                    layout
                    className="flex flex-wrap gap-3 mt-3"
                >

                    <CustomImg big logo={images} removeImage={removeImage} />

                </motion.div>
                <div
                    className='mt-4'
                >

                    <InputImg label='' uploading={uploading} ImageUpload={ImageUpload} />

                </div>

            </BoxCard>
            <BoxCard
                small={true}
                about={"Landing Pages (Optional)"}
            >
                <p
                    className='text-sm text-gray-500 mb-2'
                >Your landing page images will be displayed below the order form or add to cart button.</p>
                <motion.div
                    layout
                    className="flex flex-wrap gap-3 mt-3"
                >
                    <CustomImg big logo={lanImg} removeImage={removelanImg} />



                </motion.div>
                <div
                    className='mt-4'
                >


                    <InputImg label='' uploading={uploading} ImageUpload={LanImageUpload} />



                </div>

            </BoxCard>
            <BoxCard
                small={true}
                about={"Prices"}
            >
                <div
                    className='my-2 flex  md:flex-row gap-4'
                >

                    <div
                        className='flex-1'
                    >
                        <label className="block  mb-2 font-medium text-gray-600">Price</label>
                        <input
                            type="text"
                            name="price"
                            placeholder="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        />
                    </div>
                    <div
                        className='flex-1'

                    >
                        <label className="block mb-2 font-medium text-gray-600">Comparison price (optional)</label>
                        <input
                            type="text"
                            name="oldPrice"
                            placeholder="Comparison price"
                            value={formData.oldPrice}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        />
                    </div>
                </div>
            </BoxCard>
        </PageContainer>
    );
};

export default AddItems;