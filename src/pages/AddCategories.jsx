import React, { useState } from 'react'
import PageContainer from '../CustomUi/PageContainer'
import BoxCard from '../CustomUi/BoxCard'
import InputImg from '../CustomUi/InputImg'
import handleImageUpload from '../utility/UploadImages'
import toast from 'react-hot-toast'
import CustomImg from '../CustomUi/CustomImg'
import { useOutletContext } from 'react-router-dom'
import UseUpdateStore from '../hooks/UseUpdateStore'
import { Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const AddCategories = () => {
    const { t } = useTranslation("ProductsAndCategories");

    const user = useOutletContext()
    const [Categori, setCategori] = useState({
        name: "",
        image: null,
        show: true
    })
    const { loading, UpdateCategories, Categories } = UseUpdateStore()
    const [uploading, setUploading] = useState(false);
    const ImageUpload = async (event) => {
        setUploading(true);
        try {
            const res = await handleImageUpload(event)
            setCategori({ ...Categori, image: res })
        } catch (err) {
            console.error('Upload error:', err);
            toast.error('Failed to upload image. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const update = async () => {

        if (Categori.img === null || Categori.name === "") {
            toast.error("fill all inputs")
            return
        }
        const result = await UpdateCategories({
            Categories: [...Categories, { ...Categori, id: Categories.length + 1 }],
            repoName: user.repoName,
            id: user.id
        })
        if (result) {
            setCategori({ image: null, name: "", show: true })
        }
    }
    const removeImage = () => {
        setCategori({ ...Categori, image: null })
    };
    return (
        <PageContainer
            titel={t('Add')}
            about={t("Categories")}
        >
            <div
                className='flex flex-col sm:flex-row gap-3'
            >
                <BoxCard
                    about={t("General")}
                    className={"h-fit"}
                >
                    <label>{t("CategoriName")}</label>
                    <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 mb-5 mt-2 focus:ring-blue-500 focus:outline-none"
                        value={Categori.name}
                        onChange={(e) => setCategori({ ...Categori, name: e.currentTarget.value })}
                        placeholder='categori Name'
                    />
                    <label className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">
                            {t("Enable")} <span className="text-purple-500">{t("Navigatiobbar")}</span> {t("inhomepage")}
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
                    about={t("Photo")}
                >
                    <p
                        className='text-sm text-gray-600 mb-3'
                    >{t("Thecategoryimage")}</p>
                    {Categori.image && <CustomImg
                        logo={[Categori.image]}
                        removeImage={removeImage}
                    />}
                    <InputImg label='' uploading={uploading} ImageUpload={ImageUpload} />
                </BoxCard>
            </div>
            <button
                onClick={update}
                className='w-full bg-teal-600 text-white px-4 py-2 rounded-xl shadow-teal-700 hover:bg-teal-700 transition'
            >
                {loading ? <Loader2 className="animate-spin mx-auto h-8 w-8 " /> : t("save")}                </button>
        </PageContainer>
    )
}

export default AddCategories