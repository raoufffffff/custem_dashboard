import React, { useState } from 'react'
import toast from 'react-hot-toast';
import UseUpdateStore from '../../../hooks/UseUpdateStore';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useUser from '../../../hooks/useUser';

const Color = () => {
    const { website, repoName, loading: userLoading } = useUser();
    if (userLoading) {
        return (
            <div className="flex justify-center py-10">
                <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
            </div>
        );
    }

    return (
        <div
            className='w-full flex flex-col gap-6'
        >

            <UpdateColor website={website} repoName={repoName} />
        </div>
    )
}

const UpdateColor = ({ website, repoName }) => {
    const { t } = useTranslation("store");

    const [color, setColor] = useState(website.main_color || '#ffffff');
    const [change, SetChange] = useState(false)
    const { loading, UpdateStore } = UseUpdateStore()
    return (
        <>
            <div
                className='w-full flex justify-between items-center'
            >
                <h2
                    className='text-lg font-[400] capitalize'
                >{t("maincolor")}</h2>
                <div
                    className='border-2 flex items-center p-3 rounded-xl border-gray-300 relative'
                >
                    {color}
                    <label className="w-6 h-6 ml-3 rounded-full border-2 border-gray-300 cursor-pointer flex items-center justify-center"
                        style={{ backgroundColor: color }}
                    >
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => {
                                SetChange(true)
                                setColor(e.target.value)
                            }}
                            className="absolute w-0 h-0 opacity-0"
                        />
                    </label>
                </div>

            </div>
            <div className='mt-5 flex justify-end'>
                <button
                    onClick={() => {
                        if (change) {
                            UpdateStore({
                                ...website,
                                repoName: repoName,
                                main_color: color,

                            })
                            return
                        }
                        toast.error("upload your logo")

                    }}
                    className='w-full bg-teal-600 text-white px-4 py-2 rounded-xl shadow-teal-700 hover:bg-teal-700 transition'
                >
                    {loading ? <Loader2 className="animate-spin mx-auto h-8 w-8 " /> : t("Save")}                </button>
            </div>
        </>
    )
}

export default Color