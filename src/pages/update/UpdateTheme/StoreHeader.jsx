import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Search, Menu } from "lucide-react"; // icons

const StoreHeader = () => {
    const websiteStyle = useOutletContext(); // get websiteStyle from context

    const [header, setHeader] = useState({
        name: true,
        logo: true,
        search: true,
        headercolor: "#ffffff",
        namecolor: "#000000",
        barcolor: "#333333",
    });
    const toggleOption = (key) => {
        setHeader((prev) => ({ ...prev, [key]: !prev[key] }));
    };
    return (
        <div className="w-full border-t border-[#ddd] pt-4  flex flex-col gap-6">
            <div className="grid w-[95%] mx-auto mb-5 grid-cols-2 gap-4 text-sm text-gray-700">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={header.logo}
                        onChange={() => toggleOption("logo")}
                    />
                    <span>Show logo?</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={header.name}
                        onChange={() => toggleOption("name")}
                    />
                    <span>Show store name?</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={header.search}
                        onChange={() => toggleOption("search")}
                    />
                    <span>Show search icon?</span>
                </label>
            </div>
            <div
                className="w-11/12 mx-auto flex flex-wrap gap-3 items-start "
            >
                <div>
                    <strong>The bar</strong>
                    <p
                        className="text-sm mb-3 text-gray-600"
                    >background color</p>
                    <div
                        className='border w-fit flex items-center px-5 py-3 rounded-xl border-gray-300 relative'
                    >
                        {header.headercolor}
                        <label className="w-6 h-6 ml-3 rounded-full border-2 border-gray-300 cursor-pointer flex items-center justify-center "
                            style={{ backgroundColor: header.headercolor }}
                        >
                            <input
                                type="color"
                                value={header.headercolor}
                                onChange={(e) => setHeader((prev) => ({ ...prev, headercolor: e.target.value }))
                                }
                                className="absolute w-0 h-0 opacity-0"
                            />
                        </label>
                    </div>
                </div>
                <div>
                    <strong>Menu button</strong>
                    <p
                        className="text-sm mb-3 text-gray-600"
                    >text color</p>
                    <div
                        className='border w-fit flex items-center px-5 py-3 rounded-xl border-gray-300 relative'
                    >
                        {header.barcolor}
                        <label className="w-6 h-6 ml-3 rounded-full border-2 border-gray-300 cursor-pointer flex items-center justify-center "
                            style={{ backgroundColor: header.barcolor }}
                        >
                            <input
                                type="color"
                                value={header.headercolor}
                                onChange={(e) => setHeader((prev) => ({ ...prev, barcolor: e.target.value }))
                                }
                                className="absolute w-0 h-0 opacity-0"
                            />
                        </label>
                    </div>
                </div>
                <div>
                    <strong>Store Name</strong>
                    <p
                        className="text-sm mb-3 text-gray-600"
                    >text color</p>
                    <div
                        className='border w-fit flex items-center px-5 py-3 rounded-xl border-gray-300 relative'
                    >
                        {header.namecolor}
                        <label className="w-6 h-6 ml-3 rounded-full border-2 border-gray-300 cursor-pointer flex items-center justify-center "
                            style={{ backgroundColor: header.namecolor }}
                        >
                            <input
                                type="color"
                                value={header.namecolor}
                                onChange={(e) => setHeader((prev) => ({ ...prev, namecolor: e.target.value }))
                                }
                                className="absolute w-0 h-0 opacity-0"
                            />
                        </label>
                    </div>
                </div>
            </div>
            {/* Preview Card */}
            <div
                className="w-[95%] mx-auto  rounded-xl border border-gray-200 py-1.5"
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
                    style={{ backgroundColor: header.headercolor }}
                    className="  shadow-sm border border-gray-200 p-3 flex items-center justify-between">
                    {/* Left side: Cart */}
                    <div
                        className="flex items-center gap-2"
                    >

                        <Menu className="w-6 h-6" color={header.barcolor} />

                        {/* Center: Search Bar */}
                        {header.search && (

                            <Search
                                color={header.barcolor}
                                className=" w-6 h-6 text-gray-800" />

                        )}
                    </div>

                    {/* Right side: Logo + Name + Menu */}
                    <div className="flex items-center gap-2">
                        {header.logo && (
                            <img
                                src={websiteStyle.logo}
                                alt="logo"
                                className="w-8 h-8 object-cover rounded-full"
                            />
                        )}
                        {header.name && <span
                            style={{ color: header.namecolor }}
                            className="font-medium text-xs md:text-lg">{websiteStyle.name}</span>}

                    </div>
                </div>
                <div className={` px-6 py-6 text-center border-b border-gray-300 animate-pulse`}>
                    <div className="h-4 md:h-6 w-full  bg-gray-200 rounded-xl" />
                    <div className="mt-3 h-3 md:h-5 w-5/12  rounded-xl bg-gray-200" />
                    <div className="mt-3 h-3 md:h-5 w-7/12  rounded-xl bg-gray-300" />
                </div>
            </div>


            <button
                className=' bg-blue-600 text-white px-4 py-2 rounded-xl  shadow-blue-700 hover:bg-blue-700 transition'
            >
                save
            </button>
        </div>
    );
};

export default StoreHeader;
