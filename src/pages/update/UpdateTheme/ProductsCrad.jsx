import { useState } from 'react'
const ProductsCrad = () => {
    const [type, setType] = useState('shadow') // 'shadow' or 'flat'
    return (
        <div
            className='flex flex-col  '
        >
            <div
                className='flex justify-center sm:justify-start flex-wrap gap-4 items-center'
            >
                <div
                    className='w-full sm:w-fit'

                >
                    <div
                        className='mb-2 flex  items-center'
                        onClick={() => setType('shadow')}
                    >
                        shadow
                        <span
                            className='rounded-full w-6 h-6 border border-black flex justify-center items-center  ml-2 cursor-pointer'
                        >
                            <span
                                className={`rounded-full w-3 h-3 bg-black block m-1 ${type === 'shadow' ? '' : 'hidden'}`}
                            ></span>
                        </span>
                    </div>
                    <ProductCardShadow
                        image={'https://f003.backblazeb2.com/file/flex-storage/hQEmYrJWMRB4JsHEKCzeu-1721729707950.jpg'}
                        name={'nake shoes'}
                        price={3000}
                    />
                </div>
                <div
                    className='w-full sm:w-fit'
                >
                    <div
                        className='mb-2 flex items-center'
                        onClick={() => setType('normal')}
                    >
                        normal
                        <span
                            className='rounded-full w-6 h-6 border border-black flex justify-center items-center  ml-2 cursor-pointer'
                        >
                            <span
                                className={`rounded-full w-3 h-3 bg-black block m-1 ${type != 'shadow' ? '' : 'hidden'}`}
                            ></span>
                        </span>
                    </div>
                    <ProductCardFlat
                        image={'https://f003.backblazeb2.com/file/flex-storage/hQEmYrJWMRB4JsHEKCzeu-1721729707950.jpg'}
                        name={'nake shoes'}
                        price={3000}
                    />
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

const ProductCardFlat = ({ image, name, price }) => {
    return (
        <div className="w-11/12 sm:w-52 bg-white rounded-2xl  transition">
            {/* Image */}
            <img src={image} alt={name} className="object-center rounded-2xl hover:scale-105 shadow h-44 w-full" />

            {/* Content */}
            <div className="p-4 flex flex-col">
                <h2 className="text-lg text-center font-semibold text-gray-800 truncate">{name}</h2>
                <p className=" text-center font-bold  mt-1">DA{price}</p>

                <button
                    className="mt-4 border border-blue-600 text-blue-600 py-2 rounded-lg shadow hover:bg-blue-700 hover:text-white transition"
                >
                    Buy Now
                </button>
            </div>
        </div>
    );
};

// Product Card without shadow
const ProductCardShadow = ({ image, name, price }) => {
    return (
        <div className="w-11/12 sm:w-52 bg-white rounded-2xl shadow-sm  hover:shadow-lg overflow-hidden">
            <img src={image} alt={name} className="object-center  hover:scale-105 shadow h-44 w-full" />

            {/* Content */}
            <div className="p-4 flex flex-col">
                <h2 className="text-lg font-semibold  text-gray-800 truncate">{name}</h2>
                <p className=" font-bold  mt-1">DA{price}</p>

                <button
                    className="mt-4 border border-blue-600 text-blue-600 py-2 rounded-lg shadow hover:bg-blue-700 hover:text-white transition"
                >
                    Buy Now
                </button>
            </div>
        </div>
    );
};

export default ProductsCrad