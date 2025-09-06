import React from 'react'

const CategoriesCard = () => {
    const [type, setType] = React.useState('default') // 'shadow' or 'flat'
    return (
        <div
            className='flex flex-col  '
        >
            <div
                className='flex justify-center sm:justify-start flex-wrap gap-4 items-center md:items-start mb-5'
            >
                <div
                    className='w-full sm:w-fit'

                >
                    <div
                        className='mb-2 flex items-center'
                        onClick={() => setType('default')}
                    >
                        default
                        <span
                            className='rounded-full w-6 h-6 border border-black flex justify-center items-center  ml-2 cursor-pointer'
                        >
                            <span
                                className={`rounded-full w-3 h-3 bg-black block m-1 ${type === 'default' ? '' : 'hidden'}`}
                            ></span>
                        </span>
                    </div>
                    <CategoriesCardDelult
                        image={'https://f003.backblazeb2.com/file/flex-storage/T5OrhK5aS0Kg3oQ8MNAHt-1721729707948.jpg'}
                        name={'Classic for men'}
                    />
                </div>
                <div
                    className='w-full sm:w-fit'
                >
                    <div
                        className='mb-2 flex items-center'
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
                    <CategoriesCardShadow
                        image={'https://f003.backblazeb2.com/file/flex-storage/T5OrhK5aS0Kg3oQ8MNAHt-1721729707948.jpg'}
                        name={'Classic for men'}
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
                                className={`rounded-full w-3 h-3 bg-black block m-1 ${type === 'normal' ? '' : 'hidden'}`}
                            ></span>
                        </span>
                    </div>
                    <CategoriesCardNormal
                        image={'https://f003.backblazeb2.com/file/flex-storage/T5OrhK5aS0Kg3oQ8MNAHt-1721729707948.jpg'}
                        name={'Classic for men'}
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

const CategoriesCardDelult = ({ name }) => {
    return (
        <div className="w-11/12 sm:w-52 h-36 relative rounded-2xl shadow-sm hover:shadow-lg overflow-hidden flex items-end">
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url(/cat.jpg)" }}
            >
                {/* Dark overlay only on image */}
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-3 text-white w-full">
                <strong>{name}</strong>
                <button className="bg-blue-600 text-white px-3 py-1 rounded-xl w-full mt-2">
                    explore
                </button>
            </div>
        </div>
    );
};


const CategoriesCardNormal = ({ name }) => {
    return (
        <div className="w-11/12 md:w-44 bg-white rounded-2xl   ">
            <img src="/cat.jpg" className='w-full hover:scale-105 rounded-xl h-40 object-cover' alt="" />
            <div
                className='mt-auto flex justify-center flex-col p-3 z-[500]  '
            >
                <span
                    className='text-center mx-auto'
                >{name}</span>
                <button
                    className='text-blue-600 border border-blue-600 hover:text-white hover:bg-blue-600  px-3 py-1 rounded-xl w-full mt-2'
                >
                    explore
                </button>
            </div>
        </div>
    )
}

const CategoriesCardShadow = ({ name }) => {
    return (
        <div className="w-11/12 md:w-44  bg-white rounded-2xl shadow-sm  hover:shadow-lg overflow-hidden  ">
            <img src="/cat.jpg" className='w-full hover:scale-105 rounded-xl h-40 object-cover' alt="" />
            <div
                className='mt-auto flex justify-center flex-col p-3 z-[500]  '
            >
                <span
                    className='text-center mx-auto'
                >{name}</span>
                <button
                    className='text-blue-600 border border-blue-600 hover:text-white hover:bg-blue-600  px-3 py-1 rounded-xl w-full mt-2'
                >
                    explore
                </button>
            </div>
        </div>)
}

export default CategoriesCard