import React from 'react'
import { useTranslation } from 'react-i18next';

const ContactUs = () => {
    const { t } = useTranslation("constanst");

    return (
        <div
            className='w-full pt-4'
        >
            <h1
                className=' flex justify-center px-5 md:px-0 w-full  mx-auto text-2xl md:text-3xl font-bold text-neutral-900 ltr:first-letter:uppercase '
            >{t("Contact")}
                <span
                    className='text-teal-500 mx-3'
                >
                    {t("Us")}
                </span>
            </h1>
            <p
                className='text-gray-600 w-10/12 mx-auto text-sm text-center my-5'
            >{t("contacttext")}</p>
            <div
                className='flex gap-5 justify-center'
            >
                <a
                    href='#'>

                    <img
                        className='w-10 h-10 rounded-full'
                        src='https://f003.backblazeb2.com/file/flex-storage/3iCF2TDOxp3bPyLetMWqo-1732896223843.png' />
                </a>
                <a
                    href='#'>

                    <img
                        className='w-10 h-10 rounded-full'
                        src='https://f003.backblazeb2.com/file/flex-storage/8e_Q6aE3kZjg0MF80AdBl-1732896223768.png' />
                </a>
                <a
                    href='#'>

                    <img
                        className='w-10 h-10 rounded-full'
                        src='https://f003.backblazeb2.com/file/flex-storage/iIpdFi_ynEWVoUkKE7fTj-1732896163852.png' />
                </a>
            </div>
        </div>
    )
}

export default ContactUs