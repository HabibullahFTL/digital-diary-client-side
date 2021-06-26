import React from 'react';
import blogImg from '../../../img/blogs.jfif';
import { Link } from "react-router-dom";

const BlogCard = ({blogInfo}) => {
    const {_id,title,description,photo} = blogInfo;
    const blogTitle = title.slice(0,50);
    const isTitleLong = title.length > 50 ? true : false;
    const blogDescription = description.slice(0,150);
    const isDescriptionLong = description.length > 150 ? true : false;
    
    return (
        <div className="p-4 md:w-1/3">
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <Link to={"/view-blog/"+_id}>
                    <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={photo} alt="blog" />
                </Link>
                <div className="p-6">
                    <Link to={"/view-blog/"+_id}>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{blogTitle}{isTitleLong && <>...</>}</h1>
                        <p className="leading-relaxed mb-3">{blogDescription}{isTitleLong && <b> [Read More...]</b>}</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;