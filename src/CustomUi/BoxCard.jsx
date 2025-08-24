import { LuArrowRight } from "react-icons/lu"
import { Link } from "react-router-dom"

const BoxCard = ({ className, children, about, link, small }) => {
    return (
        <div
            className={`bg-white  w-[95%] md:w-[90%] mx-auto p-6 rounded-2xl shadow-md border border-[#ddd] ${className}`}
        >
            <div className={`flex items-center justify-between ${small ? "mb-2" : "mb-6"}`}>
                <h2 className="text-lg font-semibold text-gray-800">{about}</h2>
                {link && <Link
                    to={`/${link}`}
                    className="text-sm flex items-center underline  hover:underline">
                    View Details
                    <LuArrowRight
                        className="mt-1 mx-1"

                    />

                </Link>}
            </div>
            {children}</div>
    )
}

export default BoxCard