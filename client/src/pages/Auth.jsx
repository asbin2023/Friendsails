import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loggedIn } from "../../redux/loggedSlice";

const regex = /[^A-Za-z0-9]+/g;

const Auth = () => {
    const dispatch = useDispatch();

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
        }

        handleLoginFormReset();
    }

    return (
        <div>
            <div className="welcome-div">
                <h1>Welcome to placeholder. Let's get you started</h1>
            </div>
            <form onSubmit={handleSignupFormSubmit}>
                <label htmlFor="signup-email">Your email</label>
                <input
                    type="email"
                    maxLength={40}
                    id="signup-email"
                    name="email"
                    required
                    value={signupForm.email}
                    onChange={handleSignupFormChange}
                />
                <br />
                <label htmlFor="signup-username">Your username</label>
                <input
                    type="text"
                    minLength={5}
                    maxLength={20}
                    id="signup-username"
                    name="username"
                    required
                    value={signupForm.username}
                    onChange={handleSignupFormChange}
                />
                <br />
                <label htmlFor="signup-password">Enter your password</label>
                <input
                    type="password"
                    required
                    minLength={8}
                    maxLength={30}
                    id="signup-password"
                    name="password"
                    value={signupForm.password}
                    onChange={handleSignupFormChange}
                />
                {/* <br />
                <label htmlFor="password"> Re-Enter your password</label>
                <input type="password" required id="password" name="password" /> */}
                <br />
                <button type="submit">Signup!</button>
                <button onClick={handleSignupFormReset} type="reset">
                    Clear
                </button>
            </form>
            <h2>Already have an account ?</h2>
            <h3>sign in</h3>
            <div>
                <form onSubmit={handleLoginFormSubmit}>
                    <label htmlFor="login-username">Enter your Username</label>
                    <input
                        type="text"
                        id="login-username"
                        name="username"
                        required
                        value={loginForm.username}
                        onChange={handleLoginFormChange}
                    />
                    <br />
                    <label htmlFor="login-password">Enter your password</label>
                    <input
                        type="password"
                        id="login-password"
                        name="password"
                        required
                        value={loginForm.password}
                        onChange={handleLoginFormChange}
                    />
                    <br />
                    <button type="submit">Login</button>
                    <button onClick={handleLoginFormReset} type="reset">
                        Clear
                    </button>
                </form>
            </div>

        </div>
    );
};

export default Auth;
