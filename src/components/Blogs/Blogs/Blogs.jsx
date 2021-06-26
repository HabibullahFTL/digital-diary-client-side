import React, { useState, useEffect } from 'react';
import BlogCard from '../BlogCard/BlogCard';

const Blogs = () => {
    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        fetch('https://digital-diary-bd.herokuapp.com/all-blogs')
            .then(res => res.json())
            .then(data => setBlogs(data))
    }, [])
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-10 mx-auto">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 text-center mb-10">All the Blogs</h1>
                <div className="flex flex-wrap -m-4">
                    {
                        blogs.map(blog=><BlogCard blogInfo={blog}/>)
                    }
                </div>
            </div>
        </section>
    );
};

export default Blogs;