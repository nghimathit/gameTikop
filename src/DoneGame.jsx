import React from 'react'

const DoneGame = ({ point }) => {
    return (
        <div>
            <p className='bg-yellow-50 rounded-lg'>Bạn đã chiến thắng được <span className='text-red-600 font-bold'>{point}</span> điểm</p>
        </div>
    )
}

export default DoneGame