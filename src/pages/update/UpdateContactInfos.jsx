import React from 'react'
import BoxCard from '../../CustomUi/BoxCard'
import { FaFacebook, FaInstagram, FaSnapchat, FaTiktok, FaWhatsapp, FaViber } from "react-icons/fa";

const UpdateContactInfos = () => {
    return (
        <div className='w-full'>
            <BoxCard
                about={"Contact information"}
                small={true}
                className={`py-1`}
            >
                <p className='text-sm text-gray-600'>
                    These details will be displayed in your store on the “Contact Us” page so your customers can contact you.
                </p>

                <div className='border-t border-[#ddd] py-5 mt-4 space-y-4'>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Phone Numbers */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="text"
                            placeholder="Enter phone number"
                            className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* WhatsApp & Viber */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                                <FaWhatsapp className="text-green-500 h-7 w-7" /> WhatsApp
                            </label>
                            <input
                                type="text"
                                placeholder="WhatsApp number"
                                className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                                <FaViber className="text-purple-600 h-7 w-7" /> Viber
                            </label>
                            <input
                                type="text"
                                placeholder="Viber number"
                                className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Social Media Links */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Social Media</label>
                        <div className="space-y-3">

                            <div className="flex items-center gap-2">
                                <FaFacebook className="text-blue-600 h-7 w-7" />
                                <input
                                    type="text"
                                    placeholder="Facebook page link"
                                    className="flex-1 px-3 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <FaInstagram className="text-pink-500 h-7 w-7" />
                                <input
                                    type="text"
                                    placeholder="Instagram account link"
                                    className="flex-1 px-3 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <FaSnapchat className="text-yellow-400 h-7 w-7" />
                                <input
                                    type="text"
                                    placeholder="Snapchat account link"
                                    className="flex-1 px-3 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <FaTiktok className="text-black h-7 w-7" />
                                <input
                                    type="text"
                                    placeholder="TikTok account link"
                                    className="flex-1 px-3 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
                                />
                            </div>

                        </div>
                    </div>
                </div>

                {/* Save button */}
                <div className='mt-5 flex justify-end'>
                    <button
                        className='w-full bg-blue-600 text-white px-4 py-2 rounded-xl shadow-blue-700 hover:bg-blue-700 transition'
                    >
                        Save
                    </button>
                </div>
            </BoxCard>
        </div>
    )
}

export default UpdateContactInfos
