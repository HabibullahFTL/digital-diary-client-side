import React, { useState, useEffect } from 'react';
import BlogCard from '../BlogCard/BlogCard';
import { Link } from "react-router-dom";

const RecentBlogs = () => {
    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        fetch('https://digital-diary-bd.herokuapp.com/all-blogs')
            .then(res => res.json())
            .then(data => {
                const isRecentBlogsLong = data.length > 5; 
                let recentBlogs = []; 
                if (isRecentBlogsLong) {
                    for (let i = 0; i < 6; i++) {
                        recentBlogs.push(data[i]);
                    }
                    setBlogs(recentBlogs)
                }else{
                    recentBlogs = [...data];
                    setBlogs(recentBlogs)
                }
            })
    }, [])
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 text-center mb-10">Recent Blogs</h1>
                <div className="flex flex-wrap -m-4">
                {
                        blogs.map(blog=><BlogCard blogInfo={blog}/>)
                    }
                </div>
                <div className="button text-center">
                    <Link to="/blogs" className="ml-4 inline-flex bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg text-white px-10 my-10">View All Blogs</Link>
                </div>
            </div>
        </section>
    );
};

export default RecentBlogs;