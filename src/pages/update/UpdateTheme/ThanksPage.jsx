import { useState } from "react";
import { ArrowRight, BookmarkCheck, Copy } from 'lucide-react';
import { useOutletContext } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

const ThanksPage = () => {
    const websiteStyle = useOutletContext(); // get websiteStyle from context
    const [thanksPageText, setthanksPageText] = useState({
        title: "Thank you for your order!",
        about: "We will contact you soon. Have a nice day.",
    });
    const [thanks, setthanks] = useState({
        img: true,
        title: true,
        about: true,
        homebutton: true,
        phone: true,
        media: true,
    });
    const toggleOption = (key) => {
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
                    <span>Show Image?</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={thanks.title}
                        onChange={() => toggleOption("title")}
                    />
                    <span>Show title?</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={thanks.about}
                        onChange={() => toggleOption("about")}
                    />
                    <span>Show side title?</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={thanks.phone}
                        onChange={() => toggleOption("phone")}
                    />
                    <span>Show your phone Number?</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={thanks.homebutton}
                        onChange={() => toggleOption("homebutton")}
                    />
                    <span>Show home page redirect button?</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={thanks.media}
                        onChange={() => toggleOption("media")}
                    />
                    <span>Show social media link buttons?</span>
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
                    >{thanksPageText.title}</h1>}
                    {thanks.about && <p
                        className="text-xs md:text-sm text-gray-600 mt-1 md:mt-2 "
                    >{thanksPageText.about}</p>}
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
                                {websiteStyle.phone}</p>
                        </>}
                        {thanks.homebutton && <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs   shadow-blue-500 hover:bg-blue-700 transition mt-5 flex items-center shadow-2xl "
                        >
                            Home Page
                            <ArrowRight />
                        </button>}
                    </div>
                </div>
                {thanks.media && <div
                    className=" py-3 px-5 flex flex-col justify-between items-center text-sm text-gray-600"
                >
                    <h3>Follow us on</h3>
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
                        Title
                    </label>
                    <input
                        type="text"
                        value={thanksPageText.title}
                        onChange={(e) => setthanksPageText((prev) => ({ ...prev, title: e.target.value }))}
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
                        About
                    </label>
                    <textarea
                        type="text"
                        rows={3}
                        value={thanksPageText.about}
                        onChange={(e) => setthanksPageText((prev) => ({ ...prev, about: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
                        placeholder="We will contact you soon. Have a nice day."
                    />
                </div>

            </div>

            <button
                className=' bg-blue-600 text-white px-4 py-2 rounded-xl  shadow-blue-700 hover:bg-blue-700 transition'
            >
                save
            </button>
        </div>
    )
}

export default ThanksPage