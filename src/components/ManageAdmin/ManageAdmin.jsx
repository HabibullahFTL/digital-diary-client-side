import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const ManageAdmin = () => {
    const [userDetails, setUserDetails] = useContext(UserContext);
    const [admins, setAdmins] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [newAdmin, setNewAdmin] = useState('')
    useEffect(() => {
        fetch('https://digital-diary-bd.herokuapp.com/all-admins')
            .then(res => res.json())
            .then(data => setAdmins(data))
    }, [isUpdate])

    // Handle add user
    const handleAddAdmin = ()=>{
        if (newAdmin) {
            const newAdminDetails = {};
            newAdminDetails.email = newAdmin;
            newAdminDetails.addedBy = userDetails.email;
            fetch('https://digital-diary-bd.herokuapp.com/add-admin', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newAdminDetails)
            })
                .then(response => response.json())
                .then(adminData =>{
                    setIsUpdate(!isUpdate);
                })
        }
    }

    // Handle on Change
    const handleOnChange = (e) => {
        const target = e.target;
        const checkEmail = /^[a-zA-Z0-9._]{3,}[@]{1}[a-zA-Z]{3,}[.]{1}[a-zA-Z.]{2,6}$/;

        // For setting Email to new newUserDetails
        if (target.name === 'admin-email' && checkEmail.test(target.value)) {
            const newAdminEmail = target.value;
            setNewAdmin(newAdminEmail)
            // For hiding alert
            document.getElementById('alert-admin-email').classList.add('hidden')
        } else if (target.name === 'admin-email') {
            // For showing alert
            document.getElementById('alert-admin-email').classList.remove('hidden')
        }
    }

    return (
        <section className="text-gray-600 body-font relative">
            <div className="container px-5 py-10 mx-auto">
                <div className="lg:w-1/2 md:w-2/3 mx-auto">
                    <div className="flex flex-wrap -m-2">
                        <div className="flex flex-col text-center w-full mb-1">
                            <h3 className="text-2xl font-medium title-font mb-4 text-gray-900">Add admin via email address</h3>
                        </div>
                        <div className="p-2 w-2/3 m-auto">
                            <div className="relative">
                                <input
                                    type="text"
                                    id="admin-email"
                                    name="admin-email"
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    placeholder="mailaddress@domain.xyz"
                                    onChange={handleOnChange}
                                />
                                <p class="text-xs text-red-400 mt-3 hidden font-bold" id="alert-admin-email">Email is not valid.</p>
                            </div>
                        </div>
                        <div className="p-2 w-full text-center">
                            <button
                                className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
                            onClick={handleAddAdmin}>Add Admin</button>
                        </div>
                        <div className="flex flex-col text-center w-full mb-2 mt-2">
                            <h3 className="text-2xl font-medium title-font mb-1 mt-4 text-gray-900">Admin List</h3>
                        </div>
                        <div className="p-2 w-full m-auto">
                            <table className="table-auto w-full text-left whitespace-no-wrap">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Admin Email</th>
                                        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Added By</th>
                                        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        admins.map(admin => {
                                            const { _id, email, addedBy } = admin;
                                            return (
                                                <tr className="border-b">
                                                    <td className="px-4 py-3">{email}</td>
                                                    <td className="px-4 py-3 ">{addedBy}</td>
                                                    <td className="px-4 py-3">
                                                        <button className="mr-5 inline-flex items-center bg-red-500 border-0 py-1 px-3 focus:outline-none hover:bg-red-600 rounded text-base mt-4 md:mt-0 text-white mb-2">Delete</button>
                                                        <button className="mr-5 inline-flex items-center bg-green-500 border-0 py-1 px-3 focus:outline-none hover:bg-green-600 rounded text-base mt-4 md:mt-0 text-white">Edit</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ManageAdmin;