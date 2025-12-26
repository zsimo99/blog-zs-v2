import Search from '@/components/Search'

export default function Home() {
  return (
    <div className='min-h-[calc(100vh-65px)] flex items-center justify-center px-4'>
      <div className='w-full max-w-2xl'>
        <div className='text-center mb-10'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#461F7C] to-[#9180FF] bg-clip-text text-transparent mb-4'>
            DEV Blog
          </h1>
          <p className='text-gray-600 dark:text-gray-400 text-lg md:text-xl'>
            Discover stories, insights, and knowledge from developers
          </p>
        </div>
        <Search />
        <div className='mt-8 text-center'>
          <p className='text-sm text-gray-500 dark:text-gray-500'>
            Press Enter or click Search to explore
          </p>
        </div>
      </div>
    </div>
  )
}
