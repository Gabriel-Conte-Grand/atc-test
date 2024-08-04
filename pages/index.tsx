import { DesktopWelcome } from "@/components/DesktopWelcome"
import { MobileWelcome } from "@/components/MobileWelcome"
import Image from "next/image"
// import { Inter, Poppins } from "next/font/google"

// const inter = Inter({ subsets: ["latin"] })

export default function Welcome() {
  return (
    <div>
      <Head>
        <title>ATC | Bienvenido</title>
      </Head>
      <div className='flex md:hidden'>
        <MobileWelcome />
      </div>
      <div className='hidden md:flex'>
        <DesktopWelcome />
      </div>
    </div>
  )
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
import { GetStaticProps } from "next"
import Head from "next/head"

export const getStaticProps: GetStaticProps = async (ctx) => {
  // const { data } = await  // your fetch function here

  return {
    props: {},
  }
}
