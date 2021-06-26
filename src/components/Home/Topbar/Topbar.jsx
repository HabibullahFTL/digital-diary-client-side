import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
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
                <Link className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-green-500 rounded-full" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    <span className="ml-3 text-xl">Digital Diary</span>
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
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </Link>
                    }
                    {
                        userDetails.success &&
                        <div class="mr-5 hover:text-gray-900">
                            <div class="dropdown inline-block relative">
                                <button
                                    class="bg-green-500 text-white py-1 px-3 rounded inline-flex items-center"
                                    onClick={() => setIsShowMenu(!isShowMenu)}>
                                    <span class="mr-1">{userDetails.displayName}</span>
                                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
                                </button>
                                {
                                    isShowMenu &&
                                    <ul class="dropdown-menu absolute bg-white text-gray-700 pt-1 mt-1 border">
                                        <li class="">
                                            <button class="border-b rounded-t hover:bg-green-400 py-2 px-4 block  w-full" >View Profile</button>
                                        </li>
                                        <li class="">
                                            <button class="border-b hover:bg-green-400 py-2 px-4 block  w-full" >Setting</button>
                                        </li>
                                        <li class="">
                                            <button class="border-b rounded-b hover:bg-green-400 py-2 px-4 block w-full" onClick={handleLogOut}>Logout</button>
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