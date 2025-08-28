import toast from 'react-hot-toast'
import BoxCard from '../CustomUi/BoxCard'
import CustomImg from '../CustomUi/CustomImg'
import InputImg from '../CustomUi/InputImg'
import handleImageUpload from '../utility/UploadImages'
import { useState } from 'react'

const UpdateLogo = () => {
    const [logo, setlogo] = useState(null);
    const [uploading, setUploading] = useState(false);
    const ImageUpload = async (event) => {
        setUploading(true);
        try {
            const res = await handleImageUpload(event)
            setlogo(res)
        } catch (err) {
            console.error('Upload error:', err);
            toast.error('Failed to upload image. Please try again.');
        } finally {
            setUploading(false);
        }
    };


    const removeImage = () => {
        setlogo(null);
    };
    return (
        <div
            className='w-full'
        >

            <BoxCard
                about={"Logo"}
                small={true}
            >
                <p
                    className='text-sm text-gray-600'
                >Upload your logo and introduce your store.</p>
                <div
                    className='border-t border-[#ddd] py-5 mt-4'
                >
                    <p
                        className='text-xs text-gray-600'
                    >It is best if the logo is in PNG format with a transparent background for better visibility and is square in shape, for example 250x250 pixels.</p>
                    {logo && <div
                        layout
                        className="flex flex-wrap gap-3 mt-3"
                    >
                        <CustomImg big logo={[logo]} removeImage={removeImage} />
                    </div>}
                    <div
                        className='mt-4'
                    >
                        <InputImg label='' uploading={uploading} ImageUpload={ImageUpload} />
                    </div>
                </div>
                <div
                    className='mt-5 flex justify-end'
                >

                    <button
                        className=' bg-blue-600 text-white px-4 py-2 rounded-xl  shadow-blue-700 hover:bg-blue-700 transition'
                    >
                        save
                    </button>
                </div>
            </BoxCard>
        </div>
    )
}

export default UpdateLogo