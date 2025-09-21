import { useTranslation } from "react-i18next";

const Empty = () => {
    const { t } = useTranslation("constanst");

    return (
        <div
            className='w-full'
        >
            <img className='w-6/12 mx-auto' src='/empty.png' alt='empty' />
            <p className='text-gray-600 text-center'>{t("Nodata")}</p>
        </div>
    )
}

export default Empty