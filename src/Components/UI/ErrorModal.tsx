import React from 'react'


const ErrorModal: React.FC<any> = ({ isOpen, onClose, message }) => {

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={onClose}></div>
            <div role="alert" className='fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <div className="bg-red-500 text-white text-xl font-bold rounded-t px-4 py-2">
                    Oops!
                </div>
                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-6 py-8">
                    <div className='text-black text-lg font-semibold'>{message}</div>
                </div>
            </div>
        </>
    )
}

export default ErrorModal