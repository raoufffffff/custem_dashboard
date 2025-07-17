import React from 'react'
import { Link } from 'react-router-dom'

const AddLivrion = ({ text }) => {
    return (
        <div
            className='shadow-2xl bg-white w-11/12 mx-auto mt-20 p-4 flex flex-col justify-center items-center rounded-xl'
        >
            <h1
                className='font-[600]'
            >{text}</h1>
            <h2
                className='text-[#777] my-2'
            >we suport multepol companys </h2>
            <Link
                className='bg-blue-600 mt-4 text-white rounded-xl px-4 py-2'
                to={'/LivCompany'}
            >
                ship company
            </Link>
        </div>
    )
}

export default AddLivrion