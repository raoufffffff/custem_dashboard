import toast from 'react-hot-toast'
import BoxCard from '../../CustomUi/BoxCard'
import CustomImg from '../../CustomUi/CustomImg'
import InputImg from '../../CustomUi/InputImg'
import handleImageUpload from '../../utility/UploadImages'
import { useState } from 'react'
import UseUpdateStore from '../../hooks/UseUpdateStore'
import { Loader2 } from "lucide-react";
import { useTranslation } from 'react-i18next';
import useUser from '../../hooks/useUser'
import LoadingBar from '../../CustomUi/LoadingBar'

const UpdateLogo = () => {

    const { website, repoName, loading: userLoading } = useUser();

    if (userLoading) return <LoadingBar />

    return (
        <div
            className='w-full'
        >
            <Logo website={website} repoName={repoName} />
        </div>
    )
}


const Logo = ({ website, repoName }) => {
    const { t } = useTranslation("store");

    const { loading, UpdateStore } = UseUpdateStore()
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
        <BoxCard
            about={t("Logo")}
            small={true}
            className={`py-1`}
        >
            <p
                className='text-sm text-gray-600'
            >{t("logotext")}</p>
            <div
                className='border-t border-[#ddd] py-5 mt-4'
            >
                <p
                    className='text-xs text-gray-600'
                >{t("logoabout")}</p>
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
                    {loading ? <Loader2 className="animate-spin h-8 w-8 mx-auto" /> : t("Save")}
                </button>

            </div>
        </BoxCard>
    )
}

export default UpdateLogo