import React from 'react';

const Pagination: React.FC<any> = (props) => {

    const expenseLen = props.expenseLen;

    const page = props.page;
    const setPage = props.setPage;
    const itemsPerPage = props.itemsPerPage;

    var pageCount = 1;
    if (expenseLen <= itemsPerPage) pageCount = 1;

    else if (expenseLen % itemsPerPage === 0) pageCount = expenseLen / itemsPerPage;

    else pageCount = Math.floor(expenseLen / itemsPerPage) + 1;


    const pageNos = Array.from({ length: pageCount }, (_, i) => i + 1);



    const chosePageNo = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        setPage(parseInt(e.currentTarget.textContent!));
    }

    const prevPage = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        if (page > 1)
            setPage(page - 1);

    }

    const nextPage = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        if (page < pageCount)
            setPage(page + 1);

    }

    const NotChosenPageStyle = 'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
    const chosenPageStyle = 'flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white';

    console.log(page);

    return (

        <nav aria-label="Page navigation example" className='mb-2'>
            <ul className="flex items-center -space-x-px h-8 text-sm">
                <li onClick={prevPage}>
                    <button className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="sr-only">Previous</span>
                        <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                        </svg>
                    </button>
                </li>
                {pageNos.map((pageNo, index) => {
                    return (
                        <li onClick={chosePageNo} key={index}>
                            <button className={`${index + 1 === page ? chosenPageStyle : NotChosenPageStyle}`}>{pageNo}</button>
                        </li>
                    );
                })}
                <li onClick={nextPage}>
                    <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="sr-only">Next</span>
                        <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                        </svg>
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination