import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useRef } from "react"

export const MobileWelcome = () => {
  const clickSoundRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Crear el objeto de audio solo en el lado del cliente
      clickSoundRef.current = new Audio("/kick.wav")
    }
  }, [])
  const router = useRouter()
  const handleClick = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.play()
    }
  }

  return (
    <main className='w-screen h-screen relative flex  flex-col'>
      <div className='flex flex-col mx-auto text-center font-poppins w-11/12 shadow-lg shadow-gray-800 p-2  mt-12 gap-5 text-green-900 bg-gray-50 rounded text- z-50'>
        <h1 className='text-3xl  font-bold   z-20 text-green-500  w-auto justify-center'>
          ¡Bienvenido a ATC!
        </h1>
        <div className='flex flex-col gap-1'>
          <span className=' text-base text-green-700 font-medium '>
            ¿Quieres ver el partido de tus sueños?
          </span>
          <p className='text-black font-normal    text-xs'>
            En nuestra App podrás acceder a una gran base de datos de jugadores
            y crear equipos a tu gusto.
          </p>
        </div>
        <span className=' text-green-700 text-base font-medium '>
          ¿Qué estás esperando para formar parte?
        </span>
      </div>
      <Link
        href={"/home"}
        // onClick={handleClick}
        onPointerDown={handleClick}
        className='mx-auto text-center text-lg tracking-wide z-50 font-semibold  mt-16 bg-white text-green-500 shadow-xl uppercase leading-8 w-3/5 shadow-gray-800 rounded p-2  font-poppins'
      >
        Comenzar
      </Link>
      <div className='absolute inset-0 z-10 md:hidden'>
        <Image
          src={
            "https://1474899231.rsc.cdn77.org/api/gg-wallpaper-image/200/420/football-live-wallpaper"
          }
          alt=''
          layout='fill'
          objectFit='cover'
          className='w-full h-full  sepia'
        />
      </div>
    </main>
  )
}
