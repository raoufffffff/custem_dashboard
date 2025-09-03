import React from 'react'

const Empty = () => {
    return (
        <div
            className='w-full'
        >
            <img className='w-6/12 mx-auto' src='/empty.png' alt='empty' />
            <p className='text-gray-600 text-center'>No data.</p>
        </div>
    )
}

export default Empty