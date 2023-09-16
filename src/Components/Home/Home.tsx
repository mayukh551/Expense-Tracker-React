import React from 'react'
import expenseImg from '../../assets/expense.png';
import savings from '../../assets/savings.png'
import { Link } from 'react-router-dom';

const ProductPage = () => {
    return (
        <div className='h-screen overflow-y-hidden'>
            <nav className='w-screen h-[10%] flex flex-row justify-between px-14 pt-6 mb-9'>
                <div className='text-4xl font-extrabold'>CoinWise</div>
                <div className='flex flex-row space-x-5'>
                    <Link to='/login'>
                        <div className='bg-black text-white px-6 py-2 rounded-md hover:bg-purple-600 transition-colors duration-150'>Login</div>
                    </Link>
                    <Link to='/signup'>
                        <div className='bg-black text-white px-6 py-2 rounded-md hover:bg-purple-600 transition-colors duration-150'>SignUp</div>
                    </Link>
                </div>
            </nav>
            <div className='h-[80%]'>
                <div className='flex flex-row justify-center items-center'>
                    <div className='w-screen h-full flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:justify-center items-center px-14'>
                        {/* Product Tagline */}
                        <div className='flex flex-col space-y-4'>
                            <h1 className='text-xl md:text-2xl lg:text-3xl font-extrabold'>Master your</h1>
                            <h1 className='text-2xl md:text-3xl lg:text-4xl font-extrabold'>MONEY with
                                <span className='rounded-md ml-3 bg-purple-600 px-4 py-2 text-white'>CoinWise</span>
                            </h1>
                            <p className='font-light pt-4'>Your Financial GPS for Smart Spending!</p>
                        </div>
                        {/* Image */}
                        <div className='w-[100%] h-[100%] md:w-[50%] md:h-[60%] flex flex-row justify-center'>
                            {/* <img src={expenseImg} alt="" className='' /> */}
                            <img src={savings} alt="" className='' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage;