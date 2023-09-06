"use client"
import React, { useState } from 'react'
import UpdateProfile from './UpdateProfile'
import Image from 'next/image'
import Alert from './Alert'

const Profile = ({ user }) => {
    const [userData, setUserData] = useState(user)
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({ message: "", type: "", show: false })

    return (
        <>
            <div className='bg-white text-black dark:text-white dark:bg-[#252525] md:min-w-[400px] max-w-full p-8 rounded-[20px] shadow-xl '>
                {loading && <div className='text-end'>Loading</div>}
                <Alert type={alert.type} text={alert.message} show={alert.show} />
                <Image priority={true} className='border w-[100px] aspect-square mb-4 border-black rounded-full dark:border-4 dark:border-white' width={100} height={100} src={userData.image} alt="profile image" />
                <table>
                    <tbody>
                        <tr>
                            <td>User Name </td>
                            <td>:<span className='ml-3'>{userData.name}</span></td>
                        </tr>
                        <tr>
                            <td>Email </td>
                            <td>:<span className='ml-3'>{userData.email}</span></td>
                        </tr>
                    </tbody>
                </table>
                <UpdateProfile setAlert={setAlert} setLoading={setLoading} user={userData} setUserData={setUserData} />
            </div>
        </>
    )
}

export default Profile