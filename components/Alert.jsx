import React from 'react'

const Alert = ({ type, text, show }) => {
    return (
        <div className={`mb-3 py-1 rounded-md transition-[opacity,transform] opacity-0 -translate-x-4 duration-700 px-4 ${type === "error" && "bg-red-400 text-white"} ${type === "success" && "bg-green-400 text-white"} ${show && "opacity-100 -translate-x-0"}`}>{text}</div>
    )
}

export default Alert