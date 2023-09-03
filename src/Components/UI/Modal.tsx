import React from 'react';

const Modal: React.FC<any> = ({ isOpen, onClose, children, style }) => {

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50"></div>
            <div className={`fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg + ${style}`}>
                {children}
            </div>
        </>
    );
};

export default Modal;