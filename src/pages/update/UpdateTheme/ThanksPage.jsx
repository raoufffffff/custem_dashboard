import { useState } from "react";
import { ArrowRight, BookmarkCheck, Copy, Loader2 } from 'lucide-react';
import { useOutletContext } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import UseUpdateStore from "../../../hooks/UseUpdateStore";
import toast from "react-hot-toast";
import { useTranslation } from 'react-i18next';

const ThanksPage = () => {
    const { t } = useTranslation("store");

    const user = useOutletContext(); // get websiteStyle from context
    const [change, SetChange] = useState(false)
    const { loading, UpdateStore } = UseUpdateStore()
    const [thanks, setthanks] = useState({
        img: true,
        title: true,
        about: true,
        homebutton: true,
        phone: true,
        media: true,
        titleText: "Thank you for your order!",
        aboutText: "We will contact you soon. Have a nice day.",
    });
    const toggleOption = (key) => {
        SetChange(true)
        setthanks((prev) => ({ ...prev, [key]: !prev[key] }));
    };
    return (
        <div className="w-full  pt-4  flex flex-col gap-6">
            <div className="grid w-[95%] mx-auto mb-5 grid-cols-2 gap-4 text-sm text-gray-700">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={thanks.img}
                        onChange={() => toggleOption("img")}
                    />
                    <span>{t("ShowImage")}?</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={thanks.title}
                        onChange={() => toggleOption("title")}
                    />
                    <span>{t("Showtitle")}?</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={thanks.about}
                        onChange={() => toggleOption("about")}
                    />
                    <span>{t("Showsidetitle")}?</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={thanks.phone}
                        onChange={() => toggleOption("phone")}
                    />
                    <span>{t("ShowyourphoneNumber")}?</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={thanks.homebutton}
                        onChange={() => toggleOption("homebutton")}
                    />
                    <span>{t("Showhomepageredirectbutton")}?</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={thanks.media}
                        onChange={() => toggleOption("media")}
                    />
                    <span>{t("Showsocialmedialinkbuttons")}?</span>
                </label>
            </div>

            {/* Preview Card */}
            <div
                className="w-[95%] mx-auto text-center  rounded-xl border border-gray-200 pb-1.5"
            >
                <div
                    className="flex px-5 py-3"
                >
                    <span
                        className="w-3 h-3 rounded-full bg-gray-300 mr-2"
                    ></span>
                    <span
                        className="w-3 h-3 rounded-full bg-gray-300 mr-2"
                    ></span>
                    <span
                        className="w-3 h-3 rounded-full bg-gray-300 mr-2"
                    ></span>
                </div>
                <div
                    className="border-t px-3 flex flex-col justify-center items-center border-gray-200 py-2"
                >
                    {thanks.img && <BookmarkCheck
                        className="text-green-500 size-18 mt-10" />}
                    {thanks.title && <h1
                        className="text-lg md:text-3xl font-bold text-gray-800 mt-4 mb-2"
                    >{thanks.title}</h1>}
                    {thanks.about && <p
                        className="text-xs md:text-sm text-gray-600 mt-1 md:mt-2 "
                    >{thanks.about}</p>}
                    <div
                        className={`mt-5 mb-2 w-10/12 ${(thanks.phone || thanks.homebutton) && "border-y border-gray-200"} pt-4 pb-6  flex flex-col justify-center items-center`}
                    >
                        {thanks.phone && <>
                            <h2
                                className="text-gray-600 mt-3 text-xs md:text-sm mb-2"
                            >You can inquire and call the number</h2>
                            <p
                                className="border border-gray-200  font-semibold flex items-center  shadow-2xl px-4 py-2 rounded-xl text-gray-700 text-xs md:text-sm cursor-pointer mt-3"
                            >
                                <Copy className="mr-2" />
                                {user.website.phone}</p>
                        </>}
                        {thanks.homebutton && <button
                            className=" text-white px-4 py-2 rounded-xl text-xs     transition mt-5 flex items-center shadow-2xl "
                            style={{
                                backgroundColor: user.website.main_color, // ✅ dynamic color from JSON
                                boxShadow: `0 4px 14px ${user.website.main_color}80` // 80 = opacity in hex
                            }}
                        >
                            {t("HomePage")}
                            <ArrowRight />
                        </button>}
                    </div>
                </div>
                {thanks.media && <div
                    className=" py-3 px-5 flex flex-col justify-between items-center text-sm text-gray-600"
                >
                    <h3>{t("Followuson")}</h3>
                    <div
                        className="flex gap-4 mt-4"
                    >
                        <FaTiktok className="text-white bg-gray-700 rounded-full w-6 h-6 p-1 cursor-pointer" />
                        <FaInstagram className="text-white bg-gray-700 rounded-full w-6 h-6 p-1 cursor-pointer" />
                        <FaFacebookF className="text-white bg-gray-700 rounded-full w-6 h-6 p-1 cursor-pointer" />

                    </div>
                </div>}

            </div>
            <div
                className="w-[95%] mx-auto flex flex-col"
            >
                <div>
                    <label
                        className="block text-sm font-medium text-gray-700"
                    >
                        {t("Title")}
                    </label>
                    <input
                        type="text"
                        value={thanks.titleText}
                        onChange={(e) => {
                            SetChange(true)
                            setthanks((prev) => ({ ...prev, titleText: e.target.value }))
                        }
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
                        placeholder="Thank you for your order!"
                    />
                </div>
                <div
                    className="mt-4"
                >
                    <label
                        className="block text-sm font-medium text-gray-700"
                    >
                        {t("About")}
                    </label>
                    <textarea
                        type="text"
                        rows={3}
                        value={thanks.aboutText}
                        onChange={(e) => {
                            SetChange(true)
                            setthanks((prev) => ({ ...prev, aboutText: e.target.value }))
                        }
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
                        placeholder="We will contact you soon. Have a nice day."
                    />
                </div>

            </div>

            <div className='mt-5 flex justify-end'>
                <button
                    onClick={() => {
                        if (change) {
                            UpdateStore({
                                ...user.website,
                                repoName: user.repoName,
                                thanks: thanks
                            })
                            return
                        }
                        toast.error("upload your inpormation")

                    }}
                    className='w-full bg-teal-600 text-white px-4 py-2 rounded-xl shadow-teal-700 hover:bg-teal-700 transition'
                >
                    {loading ? <Loader2 className="animate-spin mx-auto h-8 w-8 " /> : t("Save")}                </button>
            </div>
        </div>
    )
}

export default ThanksPage