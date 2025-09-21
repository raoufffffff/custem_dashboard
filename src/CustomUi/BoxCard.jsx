import { useTranslation } from "react-i18next";
import { LuArrowRight } from "react-icons/lu"
import { Link } from "react-router-dom"

const BoxCard = ({ className, children, about, link, small, button, onclick, buttonicon }) => {
    const { t } = useTranslation("constanst"); // 👈 load dashboard.json

    return (
        <div
            className={`bg-white w-[95%]  md:w-full  mx-auto py-3 px-6 rounded-2xl shadow-md border border-[#ddd] ${className}`}
        >
            <div className={`flex items-center justify-between ${small ? "mb-2" : "mb-6"}`}>
                <h2 className="text-lg font-semibold text-gray-800">{about}</h2>
                {button && <button
                    onClick={onclick}
                    className="text-purple-600 flex cursor-pointer items-center text-xs  hover:text-purple-700 "
                >{buttonicon}{button}</button>}
                {link && <Link
                    to={`/${link}`}
                    className="text-sm text-purple-600 flex items-center underline  hover:underline">
                    {t("ViewDetails")}
                    <LuArrowRight
                        className="mt-1 mx-1"

                    />

                </Link>}
            </div>
            {children}</div>
    )
}

export default BoxCard