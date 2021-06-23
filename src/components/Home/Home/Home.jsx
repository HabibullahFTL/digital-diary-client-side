import React from 'react';
import Topbar from '../Topbar/Topbar';
import Header from '../Header/Header';
import RecentBlogs from '../../Blogs/RecentBlogs/RecentBlogs';
import Contact from '../Contact/Contact.jsx'

const Home = () => {
    return (
        <div>
            <Topbar/>
            <Header/>
            <RecentBlogs/>
            <Contact/>
        </div>
    );
};

export default Home;