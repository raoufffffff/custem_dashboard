import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { Loader2 } from 'lucide-react';
import handleImageUpload from '../utility/UploadImages';
// import { submitNewItem } from '../utility/itemHelper';
import InputImg from '../CustomUi/InputImg';
import CustomImg from '../CustomUi/CustomImg';
import BoxCard from '../CustomUi/BoxCard';
import PageContainer from '../CustomUi/PageContainer';
import ProductDescriptionEditor from '../CustomUi/ProductDescriptionEditor';
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-hot-toast";
import VariantsContainer from '../compunent/additem/Variants';
import OffersContainer from '../compunent/additem/OffersContainer';

const AddItems = () => {
    // const router = useNavigate()
    const { _id, loading } = useUser()
    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        oldPrice: 0,
        ShortDescription: '',
        Description: '',
        type: "",
    });
    const [Variants, setVariants] = useState([]);
    const [err, seterr] = useState(false);
    const [Offers, setOffers] = useState([]);
    const addOffers = () => {

        setOffers((prev) => [...prev, { id: Offers.length, name: '', Quantity: "", price: "", freedelevry: false, topOffer: false }]);
    }

    const addVariant = () => {
        if (Variants.length >= 3) {
            toast.error("You can add up to 3 variants only.");
            return;
        }
        setVariants((prev) => [...prev, { id: Variants.length, name: '', type: "", options: [], curentOption: "" }]);
    }
    // const setValue = (e) => {
    //     setFormData((prev) => ({ ...prev, Description: e }))
    // }

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
        const files = Array.from(event.target.files);
        if (!files.length) return;

        // limit to max 5 images
        // const remainingSlots = 5 - images.length;
        const selectedFiles = files

        setUploading(true);

        try {
            // upload each image
            const uploadedImages = [];
            for (const file of selectedFiles) {
                const res = await handleImageUpload({ target: { files: [file] } });
                uploadedImages.push(res);
            }

            // update state once with all uploaded
            setImages((prev) => [...prev, ...uploadedImages]);
        } catch (err) {
            console.error("Upload error:", err);
        } finally {
            setUploading(false);
            // reset input so same file can be re-selected if needed
            event.target.value = "";
        }
    };


    const removeImage = (url) => {
        setImages((prev) => prev.filter((img) => img !== url));
    };
    const removelanImg = (url) => {
        setlanImg((prev) => prev.filter((img) => img !== url));
    };

    const handleSubmit = () => {
        console.log("hwllo");

        if (!formData.name || !formData.price || images.length === 0) {
            toast.error("Please fill in all required fields.");
            seterr(true);
            return;
        }
        if (Variants.length > 0) {
            for (let variant of Variants) {
                if (!variant.name || !variant.type || variant.options.length === 0) {
                    toast.error("Please fill in all variant fields.");
                    seterr(true);

                    return;
                }
            }
        }
        if (Offers.length > 0) {
            for (let offer of Offers) {
                if (!offer.name || !offer.Quantity || !offer.price) {
                    toast.error("Please fill in all offer fields.");
                    seterr(true);
                    return;
                }
            }
        }
        toast.success("submit successful");
    };

    return (
        <PageContainer
            about={"Add"}
            titel={"Products"}
            className={"px-4"}
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
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all ${err && !formData.name ? "border-red-500 focus:ring-red-500" : ""}`}
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
                        value={formData.ShortDescription}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    />
                </div>
                {/* <div
                    className='my-2'
                >
                    <label className="block mb-2 font-medium text-gray-600">Product Short Description (Optional)</label>
                    <ProductDescriptionEditor
                        value={formData.Description}
                        onChange={setValue}

                    />
                </div> */}
            </BoxCard>
            <BoxCard
                small={true}
                about={"Images"}
                className={err && images.length === 0 ? "border-red-500" : ""}
            >
                {images.length === 0 && <p
                    className='text-sm text-gray-500 mb-2'
                >Product images should preferably be square, for example 700x700 pixels.</p>}
                <div
                    layout
                    className="flex flex-wrap justify-center gap-3 mt-3"
                >

                    <CustomImg big logo={images} removeImage={removeImage} />

                </div>
                <div
                    className='mt-4'
                >

                    <InputImg multiple label='' uploading={uploading} ImageUpload={ImageUpload} />

                </div>

            </BoxCard>
            <BoxCard
                small={true}
                about={"Landing Pages (Optional)"}
            >
                <p
                    className='text-sm text-gray-500 mb-2'
                >Your landing page images will be displayed below the order form or add to cart button.</p>
                <div
                    layout
                    className="flex flex-wrap gap-3 mt-3"
                >
                    <CustomImg big logo={lanImg} removeImage={removelanImg} />



                </div>
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
                    className='my-2 flex flex-col  md:flex-row gap-4'
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
                            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all ${err && !formData.price ? "border-red-500 focus:ring-red-500" : ""}`}
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
            <BoxCard
                className={'relative'}
                small={true}
                about={"Variants"}
                button={"Add Variants"}
                buttonicon={<IoMdAdd className='size-6 md:size-8' />}
                onclick={addVariant}
            >
                {Variants.length === 0 ? (<p
                    className={'text-sm text-center mt-10 text-gray-500'}>
                    You haven't added any variants yet.
                </p>) : (
                    <VariantsContainer err={err} Variants={Variants} setVariants={setVariants} />
                )}
            </BoxCard>
            <BoxCard
                className={'relative'}
                small={true}
                about={"Offers"}
                button={"Add Offer"}
                buttonicon={<IoMdAdd className='size-6 md:size-8' />}
                onclick={addOffers}
            >
                {Offers.length === 0 ? (<p
                    className={'text-sm text-center mt-10 text-gray-500'}>
                    You haven't added any Offers yet.
                </p>) : (
                    <OffersContainer err={err} Offers={Offers} setOffers={setOffers} />
                )}
            </BoxCard>
            <button
                onClick={() => {
                    console.log("hello");
                    handleSubmit()
                }}
                className='bg-blue-600 ml-auto hover:bg-blue-700 text-white px-6 py-2 rounded-lg mt-6 mb-10 transition-all shadow-md shadow-blue-300 flex items-center'
            >Save</button>
        </PageContainer>
    );
};

export default AddItems;