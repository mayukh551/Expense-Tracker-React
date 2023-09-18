import savings from '../../assets/savings.png'
import budget from '../../assets/budgeting.svg';
import stats from '../../assets/stats.svg';

import { Link } from 'react-router-dom';
import { useState } from 'react';

const ProductPage = () => {

    const [isNavOpen, setIsNavOpen] = useState(false);


    return (
        <div className='h-screen overflow-y-scroll overflow-x-hidden'>
            <nav className='w-screen h-[10%] flex flex-row justify-between px-14 pt-6 mb-9'>

                {/* Logo */}
                <div className='text-2xl md:text-4xl font-extrabold'>CoinWise</div>

                {/* Hamburger Menu */}
                <div className='md:hidden flex items-center'>
                    <input type="checkbox" id="menu-toggle" className="hidden" />
                    <label htmlFor="menu-toggle" className="cursor-pointer" onClick={() => setIsNavOpen(prev => !prev)}>
                        <div className="w-6 h-1 mb-1 bg-black"></div>
                        <div className="w-6 h-1 mb-1 bg-black"></div>
                        <div className="w-6 h-1 mb-1 bg-black"></div>
                    </label>
                    <div id="menu" className={`${isNavOpen ? "visible" : "hidden"} absolute top-[60px] right-10 bg-white p-4 border border-gray-300 rounded-lg mt-2`}>
                        <ul className="flex flex-col space-y-2">
                            <Link to='/login'><li className='bg-black text-white px-6 py-2 rounded-md hover:bg-purple-600 transition-colors duration-150'>Login</li></Link>
                            <Link to='/signup'><li className='bg-black text-white px-6 py-2 rounded-md hover:bg-purple-600 transition-colors duration-150'>SignUp</li></Link>
                        </ul>
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className='hidden md:flex flex-row space-x-5'>
                    <Link to='/login'>
                        <div className='bg-black text-white px-6 py-2 rounded-md hover:bg-purple-600 transition-colors duration-150'>Login</div>
                    </Link>
                    <Link to='/signup'>
                        <div className='bg-black text-white px-6 py-2 rounded-md hover:bg-purple-600 transition-colors duration-150'>SignUp</div>
                    </Link>
                </div>
                {/* <div className='flex flex-row space-x-5'>
                    <Link to='/login'>
                        <div className='bg-black text-white px-6 py-2 rounded-md hover:bg-purple-600 transition-colors duration-150'>Login</div>
                    </Link>
                    <Link to='/signup'>
                        <div className='bg-black text-white px-6 py-2 rounded-md hover:bg-purple-600 transition-colors duration-150'>SignUp</div>
                    </Link>
                </div> */}
            </nav>

            <div onClick={() => setIsNavOpen(prev => false)}>
                <div className='space-y-28 pt-6 pb-16'>

                    {/* Intro */}

                    <div className='flex flex-row flex-wrap lg:flex-nowrap justify-center items-center'>

                        {/* Image */}
                        <div className='w-full lg:w-1/2 h-[60%] lg:h-full flex justify-center order-1 lg:order-2'>
                            <img src={savings} alt="" className='w-full h-auto lg:h-full max-w-full' />
                        </div>

                        {/* Product Tagline */}
                        <div className='flex flex-col space-y-3 items-center lg:items-start pt-5 lg:pt-0 order-2 lg:order-1'>
                            <h1 className='text-xl md:text-3xl font-extrabold'>Master your</h1>
                            <h1 className='text-2xl md:text-4xl font-extrabold'>MONEY with
                                <span className='rounded-md ml-3 bg-purple-600 px-4 py-2 text-white'>CoinWise</span>
                            </h1>
                            <p className='font-light pt-4'>Your Financial GPS for Smart Spending!</p>
                        </div>

                    </div>


                    {/* Budget */}


                    <div className='w-screen h-full flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:justify-center items-center px-14'>

                        {/* Image */}
                        <div className='flex flex-row justify-center order-1'>
                            <img src={budget} alt="" className='w-[70%] h-[80%]' />
                        </div>

                        {/* Product Tagline */}
                        <div className='flex flex-col items-center lg:items-end pt-5 pr-0 lg:pr-24 lg:pt-0 order-2'>
                            <h1 className='rounded-md bg-purple-600 px-4 py-2 text-white text-xl md:text-2xl lg:text-3xl font-extrabold'>Budgeting</h1>
                            <p className='font-light pt-4 w-[60%] text-center lg:text-right'>Set your monthly and yearly budgets to track your expenses are under the limit.</p>
                        </div>
                    </div>


                    {/* Statistics */}


                    <div className='w-screen h-full flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:justify-center items-center px-14'>
                        {/* Product Tagline */}
                        <div className='flex flex-col items-center lg:items-start pt-5 lg:pt-0 order-2 lg:order-1'>
                            <h1 className='rounded-md bg-purple-600 px-4 py-2 text-white text-xl md:text-2xl lg:text-3xl font-extrabold'>Statistics</h1>
                            <p className='font-light pt-4 w-[60%] text-center lg:text-start'>Track your expenditure and spending behaviour using line and pie charts</p>
                        </div>
                        {/* Image */}
                        <div className='flex flex-row justify-center order-1 lg:order-2'>
                            <img src={stats} alt="" className='w-[60%] h-[80%]' />
                        </div>
                    </div>

                </div>

                {/* Footer */}

                <div className='w-screen h-[10%] flex flex-row justify-center items-center bg-black text-white'>
                    <p className='text-sm md:text-lg font-light'>
                        Made with ❤️ by {" "}
                        <a href="https://www.linkedin.com/in/mayukhbhowmick" rel="noreferrer" target="_blank" className='no-underline'>
                            Mayukh Bhowmick</a> and {" "}
                        <a href="https://www.linkedin.com/in/rounak-hazra-b5a743147/" rel="noreferrer" target="_blank" className='no-underline'>
                            Rounak Hazra</a>
                    </p>
                </div>
            </div>

        </div>
    )
}

export default ProductPage;