import React from 'react';
import { useContext } from 'react';
import { Link, Redirect } from "react-router-dom";
import { UserContext } from '../../App';

const Dashboard = () => {
    const [userDetails, setUserDetails] = useContext(UserContext)
    return (
        <section className="text-gray-600 body-font relative">
            <div className="container px-5 py-10 mx-auto">
                <div className="lg:w-1/2 md:w-2/3 mx-auto">
                    <div className="flex flex-wrap -m-2">
                        {
                            !userDetails.isAdmin &&
                            <Redirect to="/" />
                        }
                        <div className="p-2 w-2/3 m-auto">
                            <Link to="/blog-list">
                                <div className="mt-8 border border-gray-200 p-6 rounded-lg text-center">
                                    <i className="fas fa-th-large" style={{ fontSize: 60 }}></i>
                                    <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Manage Blog Posts</h2>
                                </div>
                            </Link>
                            <Link to="/manage-admins">
                                <div className="mt-8 border border-gray-200 p-6 rounded-lg text-center">
                                    <i className="fas fa-users-cog" style={{ fontSize: 60 }}></i>
                                    <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Manage Admins</h2>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;