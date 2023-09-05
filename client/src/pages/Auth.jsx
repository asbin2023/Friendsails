import axios from "axios";
import { useState } from "react";
import friends from "../images/friends.avif";
import sign from "../images/sign.avif";
import '../styles/auth.css'

const regex = /[^A-Za-z0-9]+/g;

const Auth = () => {
    const [switchToggle, setSwitchToggle] = useState(false);

    function handleSwitchToggle() {
        setSwitchToggle(!switchToggle);
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
            window.location.reload(false);
        } catch (err) {
            console.log("error on signup");
            console.log(err.message);
            alert(err.response.data);
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
            window.location.reload(false);
        } catch (err) {
            console.log("err on login submit");
            console.log(err.message);
            console.log(err);
            alert(err.response.data);
        }

        handleLoginFormReset();
    }

    return (
        <div>
            <div className="auth-first-div">
                <h1 className="auth-heading">
                    Welcome to Placeholder. <br /> Make friends,
                    <br /> Meet Friends, <br /> Message Friends,
                    <br /> Friends Forever!
                </h1>
                <img className="auth-image" src={friends} alt="" />
            </div>
            <div className="auth-second-div">
                <img className="auth-image" src={sign} alt="" />
                {!switchToggle && (
                    <form className="auth-signup-form" onSubmit={handleSignupFormSubmit}>
                        <label className="auth-form-label">Create a new account</label>

                        <div className="auth-input-group">
                            <label htmlFor="signup-email">Your email</label>
                            <input
                                className="auth-input"
                                type="email"
                                placeholder="Email"
                                maxLength={40}
                                id="signup-email"
                                name="email"
                                required
                                value={signupForm.email}
                                onChange={handleSignupFormChange}
                            />
                        </div>

                        <div className="auth-input-group">
                            <label htmlFor="signup-username">Your username</label>
                            <input
                                className="auth-input"
                                type="text"
                                placeholder="Username"
                                minLength={5}
                                maxLength={20}
                                id="signup-username"
                                name="username"
                                required
                                value={signupForm.username}
                                onChange={handleSignupFormChange}
                            />
                        </div>

                        <div className="auth-input-group">
                            <label htmlFor="signup-password">Enter your password</label>
                            <input
                                className="auth-input"
                                type="password"
                                required
                                minLength={8}
                                placeholder="Password"
                                maxLength={30}
                                id="signup-password"
                                name="password"
                                value={signupForm.password}
                                onChange={handleSignupFormChange}
                            />
                        </div>

                        <div className="auth-button-group">
                            <button className="auth-button" type="submit">
                                Sign up!
                            </button>
                            <button
                                className="auth-button auth-secondary-button"
                                type="reset"
                                onClick={handleSwitchToggle}
                            >
                                Already a user? Sign in
                            </button>
                        </div>
                    </form>
                )}

                {switchToggle && (
                    <form className="auth-login-form" onSubmit={handleLoginFormSubmit}>
                        <label className="auth-form-label">Sign in to your account</label>

                        <div className="auth-input-group">
                            <label htmlFor="login-username">Enter your Username</label>
                            <input
                                className="auth-input"
                                type="text"
                                id="login-username"
                                name="username"
                                required
                                placeholder="Username"
                                value={loginForm.username}
                                onChange={handleLoginFormChange}
                            />
                        </div>

                        <div className="auth-input-group">
                            <label htmlFor="login-password">Enter your password</label>
                            <input
                                className="auth-input"
                                type="password"
                                id="login-password"
                                name="password"
                                placeholder="Password"
                                required
                                value={loginForm.password}
                                onChange={handleLoginFormChange}
                            />
                        </div>

                        <div className="auth-button-group">
                            <button className="auth-button" type="submit">
                                Login
                            </button>
                            <button
                                className="auth-button auth-secondary-button"
                                type="reset"
                                onClick={handleSwitchToggle}
                            >
                                Create a new account
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Auth;
