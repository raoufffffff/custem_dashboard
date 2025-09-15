import toast from 'react-hot-toast'
import BoxCard from '../../CustomUi/BoxCard'
import CustomImg from '../../CustomUi/CustomImg'
import InputImg from '../../CustomUi/InputImg'
import handleImageUpload from '../../utility/UploadImages'
import { useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import UseUpdateStore from '../../hooks/UseUpdateStore'
import { Loader2 } from "lucide-react";

const UpdateLogo = () => {
    const user = useOutletContext() // get websiteStyle from context
    const { loading, UpdateStore } = UseUpdateStore()
    let { website, repoName } = user || {}
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
                            <CustomImg tabel={logo ? false : true} big logo={logo ? [logo] : [website.logo]} removeImage={removeImage} />
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
                        onClick={() => {
                            if (logo) {
                                UpdateStore({ ...website, logo: logo, repoName: repoName })
                                return
                            }
                            toast.error("upload your logo")
                        }}
                        className='w-full bg-purple-600 text-white px-4 py-2 rounded-xl shadow-purple-700 hover:bg-purple-700 transition'
                    >
                        {loading ? <Loader2 className="animate-spin h-8 w-8 " /> : "Save"}
                    </button>

                </div>
            </BoxCard>
        </div>
    )
}

export default UpdateLogo