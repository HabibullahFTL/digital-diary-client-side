import React from 'react';
import BlogCard from '../BlogCard/BlogCard';

const RecentBlogs = () => {
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <h1 className="text-3xl text-center mb-10">Recent Blogs</h1>
                <div className="flex flex-wrap -m-4">
                    <BlogCard/>
                    <BlogCard/>
                    <BlogCard/>
                </div>
                <div className="button text-center">
                    <a href="#" className="ml-4 inline-flex bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg text-white px-10 my-10">Load More</a>
                </div>
            </div>
        </section>
    );
};

export default RecentBlogs;