import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import blogImg from '../../../img/blogs.jfif';
import hb from '../../../img/hb.png';

const ViewBlog = () => {
    const { blogId } = useParams();
    const [blogInfo,setBlogInfo] = useState({});
    useEffect(() => {
        fetch('https://digital-diary-bd.herokuapp.com/blog/?blog_id='+blogId)
            .then(res => res.json())
            .then(data => {
                setBlogInfo(data);
            })
    }, [blogId])
    console.log(blogId);
    return (
        <section className="showBlog">
            <div className="container py-5 mx-auto  ">
                <div class="flex flex-col w-full mb-20">
                    <div className="w-4/5 border rounded p-10 m-auto">
                        <img src={blogInfo?.photo} alt="" className="lg:w-1/2 w-full m-auto mb-3 rounded" />
                        <h1 class="sm:text-3xl text-2xl font-medium title-font my-4 text-gray-900">{blogInfo?.title}</h1>
                        <p className="py-3">{blogInfo?.description}</p>
                        <div class="mt-8 border border-gray-200 p-6 rounded-lg">
                            <div class="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
                                <img src={hb} alt="" />
                            </div>
                            <h2 class="text-lg text-gray-900 font-medium title-font mb-2">{blogInfo?.createdBy?.displayName}</h2>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ViewBlog;