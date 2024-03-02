import Image from 'next/image'
import React from 'react'
import path from '@/public/map-pin-line.svg'

const LocationIcon = () => {
  return (
    <>
    <Image src={path}
           alt='Location symbol'
           width={40}
           height={40}
           className='px-2'   />
    </>
  )
}

export default LocationIcon