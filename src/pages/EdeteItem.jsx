import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import handleImageUpload from '../utility/UploadImages';
// import { submitNewItem } from '../utility/itemHelper';
import InputImg from '../CustomUi/InputImg';
import CustomImg from '../CustomUi/CustomImg';
import BoxCard from '../CustomUi/BoxCard';
import PageContainer from '../CustomUi/PageContainer';
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-hot-toast";
import VariantsContainer from '../compunent/additem/Variants';
import OffersContainer from '../compunent/additem/OffersContainer';
import UseUpdateStore from '../hooks/UseUpdateStore';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const EdeteItem = () => {
    const { t } = useTranslation("ProductsAndCategories");
    const router = useNavigate()
    const { id } = useParams()
    const [witing, setWiting] = useState(true)
    const { loading, Categories, _id, repoName } = UseUpdateStore()
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
    const [lanImg, setlanImg] = useState([]);
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const getItem = async () => {
            try {
                const res = await axios.get(`https://true-fit-dz-api.vercel.app/item/${id}`);
                setFormData(res.data.result)
                setVariants(res.data.result.Variants)
                setlanImg(res.data.result.lanImg)
                setImages(res.data.result.images)
            } catch {
                toast.error("something went wrong")
            } finally {
                setWiting(false);
            }
        }
        getItem()
    }, [])


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



    // Tiptap Editor Setup
    if (loading || witing) {
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

    const handleSubmit = async () => {

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
        const item = {
            ...formData,
            Variants,
            Offers,
            lanImg,
            images,
            userId: _id
        }
        try {
            const result = await axios.put(`https://true-fit-dz-api.vercel.app/item/edete/${id}`, {
                item: item,
                repoName: repoName,
                userId: _id
            })
            if (result.data.good) {
                router("/Items");
                toast.success("successfully");
            }
        } catch {
            toast.error("somthing went wrong");
        }

    };

    return (
        <PageContainer
            titel={t("EditeProduct")}
            about={formData?.name}
            className={"px-4"}
        >
            <BoxCard
                small={true}
                about={t("General")}
            >
                <div
                    className='my-2'
                >
                    <label className="block mb-2 font-medium text-gray-600">{t("Productname")}</label>
                    <input
                        type="text"
                        name="name"
                        placeholder={t("Productname")}
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all ${err && !formData.name ? "border-red-500 focus:ring-red-500" : ""}`}
                    />
                </div>
                <div
                    className='my-2'
                >
                    <label className="block mb-2 font-medium text-gray-600">{t("ProductShort")}</label>
                    <textarea
                        type="text"
                        name={t("Description")}
                        placeholder="Product Description"
                        value={formData.Description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    />
                </div>

            </BoxCard>
            <BoxCard
                small={true}
                about={t("Photo")}
                className={err && images.length === 0 ? "border-red-500" : ""}
            >
                {images.length === 0 && <p
                    className='text-sm text-gray-500 mb-2'
                >{t("Productimagesshould")}</p>}
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
                about={t("LandingPages")}
            >
                <p
                    className='text-sm text-gray-500 mb-2'
                >{t("Yourlandingpage")}</p>
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
                about={t("Prices")}
            >
                <div
                    className='my-2 flex flex-col  md:flex-row gap-4'
                >

                    <div
                        className='flex-1'
                    >
                        <label className="block  mb-2 font-medium text-gray-600">{t("Price")}</label>
                        <input
                            type="text"
                            name="price"
                            placeholder={t("Price")}
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all ${err && !formData.price ? "border-red-500 focus:ring-red-500" : ""}`}
                        />
                    </div>
                    <div
                        className='flex-1'

                    >
                        <label className="block mb-2 font-medium text-gray-600">{t("Comparisonprice")}</label>
                        <input
                            type="text"
                            name="oldPrice"
                            placeholder={t("Comparisonprice")}
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
                about={t("Variants")}
                button={t("Add Variants")}
                buttonicon={<IoMdAdd className='size-6 md:size-8' />}
                onclick={addVariant}
            >
                {Variants.length === 0 ? (<p
                    className={'text-sm text-center mt-10 text-teal-500'}>
                    {t("Youvariantsyet")}
                </p>) : (
                    <VariantsContainer err={err} Variants={Variants} setVariants={setVariants} />
                )}
            </BoxCard>
            <BoxCard
                className={'relative'}
                small={true}
                about={t("Offers")}
                button={t("AddOffer")}
                buttonicon={<IoMdAdd className='size-6 md:size-8' />}
                onclick={addOffers}
            >
                {Offers.length === 0 ? (<p
                    className={'text-sm text-center mt-10 text-teal-500'}>
                    {t("YouOffersyet")}
                </p>) : (
                    <OffersContainer err={err} Offers={Offers} setOffers={setOffers} />
                )}
            </BoxCard>
            <BoxCard
                small={true}
                about={t("CategoriesOptional")}
            >
                {Categories.length === 0 ? (<p
                    className={'text-sm text-center mt-10 text-teal-500'}>
                    {("YouCategoriesyet")}
                </p>) : (

                    <select
                        value={formData.type}
                        onChange={(e) => {
                            setFormData({ ...formData, type: e.currentTarget.value })
                        }}
                        className={`px-3 py-2 mt-1 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none ${err && !formData.type ? "border-red-500 focus:ring-red-500" : ""}`}
                    >
                        <option value="" disabled>{t("Productstype")}</option>
                        {Categories.map((e, i) => (
                            <option
                                value={e.name}
                                key={i}>{e.name}</option>
                        ))}
                    </select>
                )}
            </BoxCard>
            <button
                onClick={() => {
                    handleSubmit()
                }}
                className='bg-teal-600 ml-auto hover:bg-teal-700 text-white px-6 py-2 rounded-lg mt-6 mb-10 transition-all shadow-md shadow-teal-300 flex items-center'
            >{t("Save")}</button>
        </PageContainer>
    );
};

export default EdeteItem;