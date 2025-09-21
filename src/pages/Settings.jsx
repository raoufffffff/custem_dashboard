import { IoIosArrowForward } from "react-icons/io";
import { Link, useOutletContext } from 'react-router-dom'
import { useTranslation } from "react-i18next";

const Settings = () => {
    const { t } = useTranslation("Account");

    const user = useOutletContext()
    const SettingsLinks = [
        {
            to: "/settings/Update-name",
            title: t("name"),
            value: user.name
        },
        {
            to: "/settings/Update-phone",
            title: t("phonenumber"),
            value: user.phone
        },
        {
            to: "/settings/Update-email",
            title: t("email"),
            value: user.email
        },
        {
            to: "/settings/Update-password",
            title: t("password"),
            value: user.password
        },
    ]
    return (
        <div
            className={"px-4"}
        >
            <h1
                className='mt-3 md:px-5  w-full   text-2xl md:text-3xl font-bold text-neutral-900 ltr:first-letter:uppercase '
            >{t("StoreOwner")}
                <span
                    className='text-teal-500 mx-3'
                >
                    {t("Settings")}
                </span>
            </h1>
            <p
                className='text-gray-600 md:px-5 mx-auto text-sm my-2'
            >{t("text")}</p>
            <div
                className='w-full border-t flex justify-center items-center pt-5 flex-col gap-4 border-t-gray-300 mt-5'
            >
                {SettingsLinks.map((e, i) => (
                    <Link
                        key={i}
                        to={e.to}
                        className="flex items-center w-full md:w-11/12 bg-gray-100 hover:bg-gray-200 px-5 capitalize py-2 rounded-2xl"
                    >
                        <div
                            className="flex flex-col flex-1"
                        >
                            <strong
                                className="text-sm block mb-2"
                            >
                                {e.title}
                            </strong>
                            <span
                                className={`text-gray-500 text-sm`}
                            >
                                {e.title == "password" ? "**********" : e.value}
                            </span>
                        </div>
                        <IoIosArrowForward />

                    </Link>
                ))}
            </div>

        </div>
    )
}

export default Settings 