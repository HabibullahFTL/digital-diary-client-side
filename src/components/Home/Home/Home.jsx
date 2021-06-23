import React from 'react';
import Topbar from '../Topbar/Topbar';
import Header from '../Header/Header';
import RecentBlogs from '../../Blogs/RecentBlogs/RecentBlogs';
import Contact from '../../Contact/Conact.jsx'

const Home = () => {
    return (
        <div>
            <Topbar/>
            <Header/>
            <RecentBlogs/>
            <Comtact/>
        </div>
    );
};

export default Home;