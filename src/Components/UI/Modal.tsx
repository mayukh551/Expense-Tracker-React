import React from 'react';
import { motion } from "framer-motion";

const Modal: React.FC<{
    isOpen: boolean;
    style?: string;
    children: React.ReactNode;
}> = ({ isOpen, children, style }) => {

    if (!isOpen) return null;


    return (
        <>
            <div className="fixed inset-0 z-40 bg-black bg-opacity-50"></div>
            <motion.div
                // className={`fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg + ${style}`}
                className={`fixed z-50 top-1/2 left-1/2 bg-white p-6 rounded-md shadow-lg + ${style}`}
                initial={{ opacity: 0, scale: 0.5, y: "-50%", x: "-50%" }}
                animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
            >
                {children}
            </motion.div >
        </>
    );
};

export default Modal;