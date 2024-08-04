import React, { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"

export const DesktopWelcome = () => {
  const clickSoundRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Crear el objeto de audio solo en el lado del cliente
      clickSoundRef.current = new Audio("/kick.wav")
    }
  }, [])

  const handleClick = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.play()
    }
  }
  return (
    <main className='flex w-full flex-row-reverse mt-32 mr-64 h-full'>
      <div className=''>
        <Image
          src={
            "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/GettyImages-950679390_1.width-1200.format-webp.webp"
          }
          alt=''
          layout='fill'
          objectFit='cover'
          className='w-full h-full sepia'
        />
      </div>
      <div className='w-6/12 z-50'>
        <div className='flex flex-col font-poppins gap-5 border text-black w-full justify-center items-center text-center z-50 bg-gray-50 rounded shadow shadow-green-400  p-2'>
          <h1 className='text-3xl tracking-wide  font-bold   z-20 text-green-500  w-auto justify-center'>
            ¡Bienvenido a ATC!
          </h1>
          <div className='flex flex-col gap-1'>
            <span className=' text-lg text-green-700 font-medium '>
              ¿Quieres ver el partido de tus sueños?
            </span>
            <p className='text-black text-sm w-4/5 mx-auto  font-normal'>
              En nuestra App podrás acceder a una gran base de datos de
              jugadores y crear equipos a tu gusto.
            </p>
          </div>
          <div className='flex flex-col gap-1'>
            <span className='text-lg text-green-700 font-medium '>
              ¿Qué estás esperando para formar parte?
            </span>
            <p className='text-black text-sm w-4/5 mx-auto  font-normal'>
              ¡Únete a la comunidad futbolera!
            </p>
          </div>
        </div>
        <Link
          href={"/home"}
          // onClick={handleClick}
          onPointerDown={handleClick}
          className='mx-auto  border hover:shadow-lg hover:shadow-green-400 duration-100 flex  justify-center text-lg tracking-wide z-50 font-semibold  mt-16 bg-white text-green-500 shadow uppercase leading-8 w-3/5 shadow-green-400 rounded p-2  font-poppins'
        >
          Comenzar
        </Link>
      </div>
    </main>
  )
}
