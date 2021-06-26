import React from 'react';
import blogFeatured from '../../../img/blog_feature.svg';

const Header = () => {
    return (
        <section className="text-gray-600 body-font">
            <div className="container mx-auto flex px-3 pt-10 pb-20 md:flex-row flex-col items-center">
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                    <img className="object-cover object-center rounded" alt="hero" src={blogFeatured} />
                </div>
                <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Be connected with the
                        <br className="hidden lg:inline-block" />Digital Diary Blogs
                    </h1>
                    <p className="mb-8 leading-relaxed">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis quas odit officiis nostrum velit ab asperiores odio facilis? Officia suscipit quis illo consectetur tenetur itaque cupiditate harum ab error, reprehenderit autem debitis consequatur! Hic aliquid nesciunt cumque culpa sapiente impedit.</p>
                    <div className="flex justify-center">
                        <button className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">Be a Blogger</button>
                        <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Read All Blogs</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Header;