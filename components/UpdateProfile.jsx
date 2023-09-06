"use client"
import React, { useState } from 'react'
import Input from "@/components/forms/input"
import Image from 'next/image'

const UpdateProfile = ({ user, setUserData, setLoading, setAlert }) => {
    const [formData, setFormData] = useState({ name: user.name, image: user.image })
    const [updatePassword, setupdatePassword] = useState({ update: false, oldPassword: "", newPassword: "", comNewPassword: "" })
    const [showPopup, setShowPopup] = useState(false)
    const handleChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setFormData({ ...formData, image: e.target.result })
            }
            reader.readAsDataURL(file);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setUserData(prev => ({ ...prev, ...formData }))
        setShowPopup(false)
        setLoading(true)
        try {
            const res = await fetch(`/api/auth/users/${user._id}`, {
                method: "PATCH",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ ...formData, updatePassword })
            })
            const data = await res.json()
            if (data.user) setAlert({ type: "success", message: "done", show: true })
        } catch (error) {
            console.log(error)
            setAlert({ type: "error", message: error.message, show: true })
        } finally {
            setLoading(false)
            setTimeout(() => {
                setAlert(prev => ({ ...prev, show: false }))
            }, 3000);
            setTimeout(() => {
                setAlert({ message: "", type: "", show: false })
            }, 4000);
        }
    }
    return (
        <>
            {showPopup && <div className='absolute w-full px-4 h-full grid place-items-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-[#00000070]'>
                <form className='bg-white dark:bg-[#1F1F1F] py-8 px-4 md:px-12 absolute rounded-[20px]' onSubmit={handleSubmit}>
                    <div className='w-fit cursor-pointer flex items-center gap-4 mb-4'>
                        {/* <div className='bg-[#00000050] absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full' /> */}
                        <Image priority={true} className='border mb-4 border-black rounded-full w-[100px] aspect-square object-cover' width={100} height={100} src={formData.image} alt="profile image" />
                        <label htmlFor='chooseImage' className='text-sm z-10 text-center cursor-pointer text-green-500 hover:underline'>Choose Image</label>
                        <input type="file" className='hidden' id='chooseImage' onChange={handleChange} />
                    </div>
                    <span onClick={() => setShowPopup(false)} className='absolute right-0 top-0 bg-red-500 text-xl flex justify-center items-center text-white font-semibold w-[25px] h-[25px] rounded-full translate-x-1/4 -translate-y-1/4 cursor-pointer'>X</span>
                    <div className='flex flex-col gap-4'>
                        <Input id="name" type="text" value={formData.name} setDataForm={setFormData} text="Update Name" style="bg-white dark:bg-[#1F1F1F]" />
                        {updatePassword.update &&
                            <>
                                <Input id="oldPassword" type="password" value={updatePassword.oldPassword} setDataForm={setupdatePassword} text="Your password" style="bg-white dark:bg-[#1F1F1F] " />
                                <Input id="newPassword" type="password" value={updatePassword.newPassword} setDataForm={setupdatePassword} text="New password" style="bg-white dark:bg-[#1F1F1F] " />
                                <Input id="comNewPassword" type="password" value={updatePassword.comNewPassword} setDataForm={setupdatePassword} text="confirme new password" style="bg-white dark:bg-[#1F1F1F] " />
                            </>}
                    </div>
                    <p className='text-sm text-gray-600 mt-4 cursor-pointer hover:underline' onClick={() => setupdatePassword(prev => ({ ...prev, update: !prev.update }))}>{updatePassword.update ? "Dont Update The password" : "Update password"}</p>
                    <button className='bg-[#461F7C] text-white px-4 py-1 rounded-md mt-8'>Update</button>
                </form>
            </div>}
            <div className='flex justify-end'>
                <button onClick={() => setShowPopup(true)} className='text-green-500 text-sm mt-8 underline'>Update profile</button>
            </div>
        </>
    )
}

export default UpdateProfile