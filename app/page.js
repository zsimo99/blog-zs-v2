import Search from '@/components/Search'
import Image from 'next/image'

export default function Home() {
  return (
    <div className=' min-h-screen grid place-items-center'>
      <div className='px-4 sm:px-8 w-full md:max-w-3xl text-[#461F7C] dark:text-gray-300 font-bold'>
        <h1 className='text-center text-3xl lg:text-4xl xl:text-5xl mb-8'>Search for somthing...? </h1>
        <Search />
      </div>
    </div>
  )
}
