import React from 'react';
import Topbar from '../Topbar/Topbar';
import Header from '../Header/Header';
import RecentBlogs from '../../Blogs/RecentBlogs/RecentBlogs';
import WeHave from '../WeHave/WeHave';
import Contact from '../Contact/Contact.jsx';
import Footer from '../Footer/Footer';

const Home = () => {
    return (
        <>
            <Topbar />
            <Header />
            <RecentBlogs />
            <WeHave/>
            <Contact />
            <Footer />
        </>
    );
};

export default Home;