import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loggedIn } from "../../redux/loggedSlice";
import friends from "../images/friends.avif";
import sign from '../images/sign.avif'


const regex = /[^A-Za-z0-9]+/g;

const Auth = () => {
    const dispatch = useDispatch();
    const [switchToggle, setSwitchToggle] = useState(false)

    function handleSwitchToggle() {
        setSwitchToggle(!switchToggle)
    }

    const [loginForm, setLoginForm] = useState({
        username: "",
        password: "",
    });
    const [signupForm, setSignupForm] = useState({
        email: "",
        username: "",
        password: "",
    });

    function handleSignupFormReset() {
        setSignupForm({
            email: "",
            username: "",
            password: "",
        });
    }
    function handleSignupFormChange(e) {
        if (e.target.name !== "email") {
            let form = {
                ...signupForm,
                [e.target.name]: e.target.value.replace(regex, ""),
            };
            setSignupForm(form);
        } else {
            let form = {
                ...signupForm,
                [e.target.name]: e.target.value,
            };
            setSignupForm(form);
        }
    }

    async function handleSignupFormSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.post("/api/user/signup", signupForm);
            const data = response.data;
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            const token = localStorage.getItem("token");
            dispatch(loggedIn(token));
        } catch (err) {
            console.log("error on signup");
            console.log(err.message);
            alert(err.response.data)
        }

        handleSignupFormReset();
    }
    function handleLoginFormReset() {
        setLoginForm({
            username: "",
            password: "",
        });
    }

    function handleLoginFormChange(e) {
        let data = {
            ...loginForm,
            [e.target.name]: e.target.value,
        };
        setLoginForm(data);
    }

    async function handleLoginFormSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.post("/api/user/login", loginForm);
            let data = response.data;
            localStorage.setItem("username", data.username);
            localStorage.setItem("token", data.token);
            let token = localStorage.getItem("token");
            dispatch(loggedIn(token));
        } catch (err) {
            console.log("err on login submit");
            console.log(err.message);
            console.log(err)
            alert(err.response.data)

        }

        handleLoginFormReset();
    }

    return (
        <div>
            <div className="bg-gray-100 flex justify-evenly items-center p-6 max-w-screen-lg m-auto mt-10 rounded-xl">
                <h1 className="text-3xl leading-normal">
                    Welcome to placeholder. <br /> Make friends,
                    <br /> Meeet Friends, <br /> Message Friends,
                    <br /> Friends Friends!
                </h1>
                <img className=" max-w-md rounded-xl" src={friends} alt="" />
            </div>
            <div className=" bg-gray-100 flex justify-center items-center p-6 gap-20 max-w-screen-lg m-auto mt-10 rounded-xl">
                <img className="max-w-xs p-4" src={sign} style={{ borderRadius: '30px' }} alt="" />
                {
                    !switchToggle && <form className="gap-10 w-2/6 flex flex-col" onSubmit={handleSignupFormSubmit}>
                        <label className="border-b-4 border-gray-300 p-2 bg-indigo-100">Create a new account</label>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="signup-email">Your email</label>
                            <input className="outline-none p-1"
                                type="email"
                                placeholder="email"
                                maxLength={40}
                                id="signup-email"
                                name="email"
                                required
                                value={signupForm.email}
                                onChange={handleSignupFormChange}
                            />
                        </div>


                        <div className="flex flex-col gap-2">
                            <label htmlFor="signup-username">Your username</label>
                            <input className="outline-none p-1"
                                type="text"
                                placeholder="username"
                                minLength={5}
                                maxLength={20}
                                id="signup-username"
                                name="username"
                                required
                                value={signupForm.username}
                                onChange={handleSignupFormChange}
                            />
                        </div>


                        <div className="flex flex-col gap-2">

                            <label htmlFor="signup-password">Enter your password</label>
                            <input
                                className="outline-none p-1"
                                type="password"
                                required
                                minLength={8}
                                placeholder="password"
                                maxLength={30}
                                id="signup-password"
                                name="password"
                                value={signupForm.password}
                                onChange={handleSignupFormChange}
                            />

                        </div>


                        <div className="flex gap-9">
                            <button className="bg-blue-300 p-2 rounded" type="submit">Sign up!</button>
                            <button className="bg-white p-2 rounded" type="reset" onClick={handleSwitchToggle} >
                                Already a user? Sign in
                            </button>
                        </div>

                    </form>
                }

                {switchToggle && <form className=" gap-10 w-2/6 flex flex-col" onSubmit={handleLoginFormSubmit}>

                    <label className="border-b-4 border-gray-300 p-2 bg-indigo-100">Sign in your account!</label>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="login-username">Enter your Username</label>
                        <input
                            className="outline-none p-1"
                            type="text"
                            id="login-username"
                            name="username"
                            required
                            value={loginForm.username}
                            placeholder="username"
                            onChange={handleLoginFormChange}
                        />
                    </div>



                    <div className="flex flex-col gap-2">
                        <label htmlFor="login-password">Enter your password</label>
                        <input
                            className="outline-none p-1"
                            type="password"
                            id="login-password"
                            name="password"
                            placeholder="password"
                            required
                            value={loginForm.password}
                            onChange={handleLoginFormChange}
                        />
                    </div>



                    <div className="flex gap-9">
                        <button className="bg-blue-300 p-2 rounded" type="submit">Login</button>
                        <button className="bg-white p-2 rounded" type='reset' onClick={handleSwitchToggle}>
                            Create a new account
                        </button>
                    </div>

                </form>}
            </div >
        </div >

    );
};

export default Auth;
