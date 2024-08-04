import Image from "next/image"
import React from "react"

export const Searchbar = () => {
  return (
    <div className='relative w-full  flex justify-center'>
      <Image
        src={"/search-icon.svg"}
        alt=''
        height={25}
        width={25}
        className='bg-white absolute top-2 left-10'
      />
      <input
        type='text'
        placeholder='Buscar jugador..'
        className='rounded-full p-2 text-black  pl-10  w-10/12 items-center'
      />
    </div>
  )
}
