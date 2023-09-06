import { signIn } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

const Providers = () => {
    return (
        <div className='flex gap-4 flex-wrap mt-4 w-fit mx-auto my-7'>
            <Image className='cursor-pointer' onClick={() => signIn("google")} src="/google.png" width={30} height={30} alt='google' />
            <Image className='cursor-pointer' onClick={() => signIn("github")} src="/github.png" width={30} height={30} alt='github' />
        </div>
    )
}

export default Providers