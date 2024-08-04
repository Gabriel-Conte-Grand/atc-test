import "@/styles/globals.css"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className='h-screen md:h-full bg-gray-100'>
      <Component {...pageProps} />
    </div>
  )
}
