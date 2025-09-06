import toast from 'react-hot-toast'
import BoxCard from '../../CustomUi/BoxCard'
import CustomImg from '../../CustomUi/CustomImg'
import InputImg from '../../CustomUi/InputImg'
import handleImageUpload from '../../utility/UploadImages'
import { useState } from 'react'
import { useOutletContext } from 'react-router-dom';

const UpdateLogo = () => {
    const user = useOutletContext() // get websiteStyle from context

    const { websiteStyle } = user.website || {}
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
                className={`py-1`}
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
                    <div

                    >

                        <div
                            layout
                            className="flex flex-wrap gap-3 mt-3"
                        >
                            <CustomImg tabel={logo ? false : true} big logo={logo ? [logo] : [websiteStyle.logo]} removeImage={removeImage} />
                        </div>
                        {!logo && <div
                            className='mt-4'
                        >
                            <InputImg label='' uploading={uploading} ImageUpload={ImageUpload} />
                        </div>}
                    </div>
                </div>
                <div
                    className='flex justify-between items-center mt-5'
                >


                </div>
                <div
                    className='mt-5 flex justify-end'
                >


                    <button
                        className='w-full bg-teal-600 text-white px-4 py-2 rounded-xl shadow-teal-700 hover:bg-teal-700 transition'
                    >
                        Save
                    </button>

                </div>
            </BoxCard>
        </div>
    )
}

export default UpdateLogo