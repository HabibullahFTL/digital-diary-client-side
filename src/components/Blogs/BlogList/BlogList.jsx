import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../App';
import { Redirect } from "react-router-dom";

const BlogList = () => {
    const [userDetails, setUserDetails] = useContext(UserContext)
    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        fetch('https://digital-diary-bd.herokuapp.com/all-blogs')
            .then(res => res.json())
            .then(data => setBlogs(data))
    }, [])
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-10 mx-auto">
                <div className="lg:w-6/7 w-full mx-auto overflow-auto">
                        {
                            !userDetails.isAdmin &&
                            <Redirect to="/" />
                        }
                    <table className="table-auto w-full text-left whitespace-no-wrap">
                        <thead>
                            <tr>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Blog Id</th>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Preview</th>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                blogs.map(blog => {
                                    const { _id, title, description, photo } = blog;
                                    const blogTitle = title.slice(0, 50);
                                    const blogDescription = description.slice(0, 150);
                                    return (
                                        <tr className="border-b">
                                            <td className="px-4 py-3">{_id}</td>
                                            <td className="px-4 py-3 ">

                                                <div className="p-4 w-full">
                                                    <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                                                        <img alt="team" style={{ width: 100 }} className="flex-shrink-0 rounded-lg object-cover object-center sm:mb-0 mb-4" src={photo} />
                                                        <div className="flex-grow sm:pl-8">
                                                            <h2 className="title-font font-medium text-lg text-gray-900">{blogTitle}</h2>
                                                            <p className="mb-4">{blogDescription}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </td>
                                            <td className="px-4 py-3">
                                                <button className="mr-5 inline-flex items-center bg-red-500 border-0 py-1 px-3 focus:outline-none hover:bg-red-600 rounded text-base mt-4 md:mt-0 text-white mb-2">Delete</button>
                                                <button className="mr-5 inline-flex items-center bg-green-500 border-0 py-1 px-3 focus:outline-none hover:bg-green-600 rounded text-base mt-4 md:mt-0 text-white">Edit</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default BlogList;