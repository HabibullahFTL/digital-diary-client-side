import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { UserContext } from '../../../App';
import { fileUploadHandle } from '../../Login/loginManager';
import { Redirect } from "react-router-dom";

const WriteBlog = () => {
    const [userDetails, setUserDetails] = useContext(UserContext);
    const [blogDetails, setBlogDetails] = useState({
        title: '',
        description: '',
        thumbnailFile: '',
        thumbnailDir: '',
        isPublished: false
    });
    const handleOnChange = (e) => {
        const newBlogDetails = { ...blogDetails };
        const dataTarget = e.target;
        // For blog title
        if (dataTarget.name === 'title' && dataTarget.value.length > 5) {
            newBlogDetails.title = dataTarget.value;
            setBlogDetails(newBlogDetails);
        }

        // For blog description
        if (dataTarget.name === 'description' && dataTarget.value.length > 5) {
            newBlogDetails.description = dataTarget.value;
            setBlogDetails(newBlogDetails);
        }

        // For blog thumbnail
        if (dataTarget.name === 'thumbnail') {
            const date = new Date();
            const presentTime = date.getTime();
            newBlogDetails.thumbnailFile = dataTarget.files[0];
            newBlogDetails.thumbnailDir = 'blog_thumbnails/' + presentTime + '_' + dataTarget.files[0].name;
            setBlogDetails(newBlogDetails);
        }
    }

    const handlePostBlog = () => {
        const { title, description, thumbnailFile, thumbnailDir } = blogDetails;
        const { displayName, email, phoneNumber } = userDetails;
        if (title && description && thumbnailFile && thumbnailDir) {
            fileUploadHandle(thumbnailFile, thumbnailDir, { title, description, createdBy: { displayName, email, phoneNumber } })
                .then(data => {
                    if (!data.message) {
                        delete data.message;
                        fetch('https://digital-diary-bd.herokuapp.com/write-blog', {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data)
                        })
                            .then(response => response.json())
                            .then(blogData => {
                                if (!blogData.message) {
                                    // For showing success aleart
                                    setBlogDetails({
                                        title: '',
                                        description: '',
                                        thumbnailFile: '',
                                        thumbnailDir: '',
                                        isPublished: true
                                    });
                                    document.getElementById('title').value = "";
                                    document.getElementById('thumbnail').value = "";
                                    document.getElementById('description').value = "";
                                }
                            })
                    } else {
                        console.log("message", data);
                        const newBlogDetails = { ...blogDetails };
                        newBlogDetails.message = data.message;
                        setBlogDetails(newBlogDetails);
                    }
                })
        }
    }
    return (
        <section className="text-gray-600 body-font relative">
            <div className="container px-5 py-10 mx-auto">
                <div className="lg:w-1/2 md:w-2/3 mx-auto">
                    <div className="flex flex-wrap -m-2">
                        <div className="flex flex-col text-center w-full mb-5">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Write a blog</h1>
                        </div>
                        {
                            !userDetails.isAdmin &&
                            <Redirect to="/" />
                        }

                        {
                            blogDetails.message &&
                            <div className="w-2/3 m-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                <span className="block sm:inline">{blogDetails.message}</span>
                            </div>
                        }
                        {
                            blogDetails.isPublished &&
                            <div className="w-2/3 m-auto bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                                <span className="block sm:inline">Your blog published!</span>
                            </div>
                        }

                        <div className="p-2 w-2/3 m-auto">
                            <div className="relative">
                                <label htmlFor="title" className="leading-7 text-lg block mb-3 text-gray-600">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    placeholder="Blog Title"
                                    onChange={handleOnChange} />
                            </div>
                        </div>
                        <div className="p-2 w-2/3 m-auto">
                            <div className="relative">
                                <label htmlFor="thumbnail" className="leading-7 text-lg block mb-3 text-gray-600">Cover Photo(Thumbnail)</label>
                                <input
                                    type="file"
                                    id="thumbnail"
                                    name="thumbnail"
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    style={{ cursor: "pointer" }}
                                    onChange={handleOnChange} />
                            </div>
                        </div>
                        <div className="p-2 w-2/3 m-auto">
                            <div className="relative">
                                <label htmlFor="description" className="leading-7 text-lg block mb-3 text-gray-600">Blog Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                                    placeholder="Blog Description"
                                    onChange={handleOnChange} ></textarea>
                            </div>
                        </div>
                        <div className="p-2 w-full text-center">
                            <button
                                className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
                                onClick={handlePostBlog}>Post The Blog</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WriteBlog;