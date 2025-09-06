import React, { useState } from 'react'
import PageContainer from '../CustomUi/PageContainer'
import BoxCard from '../CustomUi/BoxCard'
import InputImg from '../CustomUi/InputImg'
import handleImageUpload from '../utility/UploadImages'
import toast from 'react-hot-toast'
import CustomImg from '../CustomUi/CustomImg'

const AddCategories = () => {
    const [Categori, setCategori] = useState({
        name: "",
        img: null,
        show: true
    })
    const [uploading, setUploading] = useState(false);
    const ImageUpload = async (event) => {
        setUploading(true);
        try {
            const res = await handleImageUpload(event)
            setCategori({ ...Categori, img: res })
        } catch (err) {
            console.error('Upload error:', err);
            toast.error('Failed to upload image. Please try again.');
        } finally {
            setUploading(false);
        }
    };


    const removeImage = () => {
        setCategori({ ...Categori, img: null })
    };
    return (
        <PageContainer
            titel={'add'}
            about={"Categories"}
        >
            <div
                className='flex flex-col sm:flex-row gap-3'
            >

                <BoxCard
                    about={"general"}
                    className={"h-fit"}
                >
                    <label>Categori Name</label>
                    <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 mb-5 mt-2 focus:ring-blue-500 focus:outline-none"
                        value={Categori.name}
                        onChange={(e) => setCategori({ ...Categori, name: e.currentTarget.value })}
                        placeholder='categori Name'
                    />
                    <label className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">
                            Enable <span className="text-purple-500">Navigatiob bar</span> Product page
                        </span>
                        <input
                            type="checkbox"
                            checked={Categori.show}
                            onChange={(e) => setCategori({ ...Categori, show: e.target.checked })}
                            className="toggle toggle-primary"
                        />
                    </label>
                </BoxCard>
                <BoxCard
                    about={"image"}

                >
                    <p
                        className='text-sm text-gray-600 mb-3'
                    >The category image should preferably be square, for example 500x500 pixels.</p>
                    {Categori.img && <CustomImg
                        logo={[Categori.img]}
                        removeImage={removeImage}
                    />}
                    <InputImg label='' uploading={uploading} ImageUpload={ImageUpload} />
                </BoxCard>
            </div>
            <button
                className='w-full bg-teal-600 text-white px-4 py-2 rounded-xl shadow-teal-700 hover:bg-teal-700 transition'            >save</button>
        </PageContainer>
    )
}

export default AddCategories