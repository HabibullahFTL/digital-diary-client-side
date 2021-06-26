import React from 'react';
import Topbar from '../Home/Topbar/Topbar';
import Footer from '../Home/Footer/Footer';

const NotFound = () => {
    return (
        <>
            <Topbar />
            <div style={{
                height: 300,
                width: 500,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
                fontSize: 30,
                fontWeight: "bold"
            }}>
                <h3 className="text-red-500 text-center">Page Not Found</h3>
            </div>
            <Footer />
        </>
    );
};

export default NotFound;