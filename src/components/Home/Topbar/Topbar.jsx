import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { UserContext } from '../../../App';
import './Topbar.css';

const Topbar = () => {
    const [userDetails, setUserDetails] = useContext(UserContext)
    const [isShowMenu, setIsShowMenu] = useState(false);
    const handleLogOut = () => {
        setUserDetails({
            displayName: '',
            email: '',
            phoneNumber: '',
            photoURL: '',
            password: '',
            error: '',
            success: false
        })
    }
    return (
        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link className="flex title-font font-medium items-center text-green-500 text-lg mb-4 md:mb-0 " to="/">
                    <img src="/digital-diary-logo.png" className="w-8 h-8 mr-2" alt="" /> Digital Diary
                </Link>

                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    <Link className="mr-5 hover:text-gray-900" to="/">Home</Link>
                    <Link className="mr-5 hover:text-gray-900" to="/blogs">Blogs</Link>
                    <Link className="mr-5 hover:text-gray-900" to="/write-blog">Write a blog</Link>
                    {
                        userDetails.success &&
                        <Link className="mr-5 hover:text-gray-900" to="/dashboard">Dashboard</Link>
                    }
                    <Link className="mr-5 hover:text-gray-900" to="/contact">Contact Us</Link>
                    {
                        !userDetails.success &&
                        <Link className="mr-5 inline-flex items-center bg-green-500 border-0 py-1 px-3 focus:outline-none hover:bg-green-600 rounded text-base mt-4 md:mt-0 text-white" to="/login">Login
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </Link>
                    }
                    {
                        userDetails.success &&
                        <div className="mr-5 hover:text-gray-900">
                            <div className="dropdown inline-block relative">
                                <button
                                    className="bg-green-500 text-white py-1 px-3 rounded inline-flex items-center"
                                    onClick={() => setIsShowMenu(!isShowMenu)}>
                                    <span className="mr-1">{userDetails.displayName}</span>
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
                                </button>
                                {
                                    isShowMenu &&
                                    <ul className="dropdown-menu absolute bg-white text-gray-700 pt-1 mt-1 border">
                                        <li className="">
                                            <button className="border-b rounded-t hover:bg-green-400 py-2 px-4 block  w-full" >View Profile</button>
                                        </li>
                                        <li className="">
                                            <button className="border-b hover:bg-green-400 py-2 px-4 block  w-full" >Setting</button>
                                        </li>
                                        <li className="">
                                            <button className="border-b rounded-b hover:bg-green-400 py-2 px-4 block w-full" onClick={handleLogOut}>Logout</button>
                                        </li>
                                    </ul>
                                }
                            </div>
                        </div>
                    }
                </nav>
            </div>


        </header>
    );
};

export default Topbar;