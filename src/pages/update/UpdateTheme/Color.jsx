import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'

const Color = () => {
    const websiteStyle = useOutletContext() // get websiteStyle from context
    const [color, setColor] = useState(websiteStyle.main_color || '#ffffff');
    return (
        <div
            className='w-full flex flex-col gap-6'
        >

            <div
                className='w-full flex justify-between items-center'
            >
                <h2
                    className='text-lg font-[400] capitalize'
                >main color</h2>
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
                            onChange={(e) => setColor(e.target.value)}
                            className="absolute w-0 h-0 opacity-0"
                        />
                    </label>
                </div>

            </div>
            <div className='mt-5 flex justify-end'>
                <button
                    className='w-full bg-teal-600 text-white px-4 py-2 rounded-xl shadow-teal-700 hover:bg-teal-700 transition'
                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default Color