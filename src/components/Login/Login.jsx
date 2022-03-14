import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { signInWithEmail, signUpWithEmail } from './loginManager';
import { Redirect, useHistory, useLocation } from "react-router-dom";

const Login = () => {
    const [userDetails, setUserDetails] = useContext(UserContext);
    const [loginInfo, setLoginInfo] = useState({ email: '', password: '', error: '' });
    const [isSingIn, setIsSignIn] = useState(true);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const updateDetails = (e) => {
        const target = e.target;
        const checkPhoneNumber = /^(\+)?(88)?01[0-9]{9}$/;
        const checkEmail = /^[a-zA-Z0-9._]{3,}[@]{1}[a-zA-Z]{3,}[.]{1}[a-zA-Z.]{2,6}$/;
        const newUserDetails = { ...userDetails };
        const newLoginInfo = { ...loginInfo };

        // For setting DisplayName to new newUserDetails
        if (target.name === 'displayName') {
            newUserDetails.displayName = target.value;
            setUserDetails(newUserDetails)
        }

        // For setting Mobile Number to new newUserDetails
        if (target.name === 'mobile' && checkPhoneNumber.test(target.value)) {
            newUserDetails.phoneNumber = target.value;
            setUserDetails(newUserDetails)
            // For hiding alert
            document.getElementById('alert-mobile-number').classList.add('hidden');
        } else if (target.name === 'mobile') {
            // For showing alert
            document.getElementById('alert-mobile-number').classList.remove('hidden');
        }

        // For setting Email to new newUserDetails
        if (target.name === 'email' && checkEmail.test(target.value)) {
            newLoginInfo.email = target.value;
            setLoginInfo(newLoginInfo)
            // For hiding alert
            document.getElementById('alert-email').classList.add('hidden')
        } else if (target.name === 'email') {
            // For showing alert
            document.getElementById('alert-email').classList.remove('hidden')
        }


        // For setting Registration Email to new newUserDetails
        if (target.name === 'regEmail' && checkEmail.test(target.value)) {
            newUserDetails.email = target.value;
            setUserDetails(newUserDetails)
            // For hiding alert
            document.getElementById('alert-reg-email').classList.add('hidden');
        } else if (target.name === 'regEmail') {
            // For showing alert
            document.getElementById('alert-reg-email').classList.remove('hidden')
        }

        // For setting Password to new newUserDetails
        if (target.name === 'password' && target.value.length >= 8) {
            newLoginInfo.password = target.value;
            setLoginInfo(newLoginInfo)
            // For hiding alert
            document.getElementById('alert-password').classList.add('hidden');
        } else if (target.name === 'password') {
            // For showing alert
            document.getElementById('alert-password').classList.remove('hidden');
        }

        // For setting Registration Password to new newUserDetails
        if (target.name === 'regPassword' && target.value.length >= 8) {
            newUserDetails.password = target.value;
            setUserDetails(newUserDetails)
            // For hiding alert
            document.getElementById('alert-reg-password').classList.add('hidden');
        } else if (target.name === 'regPassword') {
            // For showing alert
            document.getElementById('alert-reg-password').classList.remove('hidden');
        }
    }

    // For Handling Sign UP
    const signUpHandler = () => {
        const { displayName, phoneNumber, email, password } = userDetails;
        if (displayName && phoneNumber && email && password) {
            const newUserDetails = { ...userDetails };
            newUserDetails.error = '';
            setLoginInfo(newUserDetails);
            signUpWithEmail(email, password, userDetails)
                .then(data => {
                    setUserDetails(data);
                    history.replace(from);
                })
        } else {
            const newUserDetails = { ...userDetails };
            newUserDetails.error = "Any field must not empty!";
            setUserDetails(newUserDetails);
        }
    }

    // For Handling Sing In
    const signInHandler = () => {
        const { email, password } = loginInfo;
        if (email && password) {
            const newLoginInfo = { ...loginInfo };
            newLoginInfo.error = '';
            setLoginInfo(newLoginInfo)
            signInWithEmail(email, password, loginInfo)
                .then(data => {
                    const newData = { ...data };
                    history.replace(from);

                    fetch('https://digital-diary-bd.herokuapp.com/all-admins')
                        .then(res => res.json())
                        .then(admins => {
                            const isAdminFound = admins.find(admin => admin.email === data.email);
                            if (isAdminFound) {
                                newData.isAdmin = true;
                                setUserDetails(newData);
                                console.log(newData);
                            }else{
                                newData.isAdmin = false;
                                setUserDetails(newData);
                                console.log(newData);
                            }
                        })
                })
        } else {
            const newLoginInfo = { ...loginInfo };
            newLoginInfo.error = "Any field must not empty!";
            setLoginInfo(newLoginInfo);
        }
    }
    return (
        <section className="text-gray-600 body-font relative">
            <div className="container px-5 py-10 mx-auto">
                {
                    userDetails.success &&
                    <Redirect to="/" />
                }
                {
                    isSingIn && !userDetails.success &&
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <div className="flex flex-wrap -m-2">
                            <div className="flex flex-col text-center w-full mb-5">
                                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900" id="login">Login to your account</h1>
                            </div>
                            {
                                loginInfo.error &&
                                <div className="w-2/3 m-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                    <span className="block sm:inline">{loginInfo.error}</span>
                                </div>
                            }
                            {
                                userDetails.error &&
                                <div className="w-2/3 m-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                    <span className="block sm:inline">{userDetails.error}</span>
                                </div>
                            }
                            <div className="p-2 w-2/3 m-auto text-center">
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        placeholder="Email Address"
                                        onChange={updateDetails} />
                                    <p className="text-xs text-red-400 mt-3 hidden font-bold" id="alert-email">Email is not valid.</p>
                                </div>
                            </div>
                            <div className="p-2 w-2/3 m-auto text-center">
                                <div className="relative">
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        placeholder="Password"
                                        onChange={updateDetails} />
                                    <p className="text-xs text-red-500 mt-3 hidden font-bold" id="alert-password">Password length must be 8 or more.</p>
                                </div>
                            </div>
                            <div className="p-2 w-full text-center">
                                <button
                                    className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
                                    onClick={signInHandler}>Login</button>
                                <button
                                    className="text-green-500 my-5"
                                    onClick={() => setIsSignIn(!isSingIn)}>You don't hvae an account? Register Here</button>
                            </div>
                        </div>
                    </div>
                }

                {
                    !isSingIn && !userDetails.success &&
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <div className="flex flex-wrap -m-2">
                            <div className="flex flex-col text-center w-full mb-5">
                                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900" id="registration">Registration</h1>
                            </div>
                            <div className="p-2 w-2/3 m-auto text-center">
                                {
                                    userDetails.error &&
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                        <span className="block sm:inline">{userDetails.error}</span>
                                    </div>
                                }
                            </div>
                            <div className="p-2 w-2/3 m-auto text-center">
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="name"
                                        name="displayName"
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        placeholder="Full Name"
                                        onChange={updateDetails} />
                                </div>
                            </div>
                            <div className="p-2 w-2/3 m-auto  text-center">
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="mobile"
                                        name="mobile"
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        placeholder="Mobile Number"
                                        onChange={updateDetails} />
                                    <p className="text-xs text-red-500 mt-3 hidden  font-bold" id="alert-mobile-number"><b>Note:</b> Only Bangladeshi number accepts.</p>
                                </div>
                            </div>
                            <div className="p-2 w-2/3 m-auto text-center">
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="regEmail"
                                        name="regEmail"
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        placeholder="Email Address"
                                        onChange={updateDetails} />
                                    <p className="text-xs text-red-400 mt-3 hidden font-bold" id="alert-reg-email">Email is not valid.</p>
                                </div>
                            </div>
                            <div className="p-2 w-2/3 m-auto text-center">
                                <div className="relative">
                                    <input
                                        type="password"
                                        id="regPassword"
                                        name="regPassword"
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        placeholder="Password"
                                        onChange={updateDetails} />
                                    <p className="text-xs text-red-500 mt-3 hidden font-bold" id="alert-reg-password">Password length must be 8 or more.</p>
                                </div>
                            </div>
                            <div className="p-2 w-full text-center">
                                <button
                                    onClick={signUpHandler}
                                    className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">Registration</button>
                                <button
                                    className="text-green-500 my-5"
                                    onClick={() => setIsSignIn(!isSingIn)}>Already hvae an account? Login Here</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </section>
    );
};

export default Login;