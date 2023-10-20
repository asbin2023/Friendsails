import axios from "axios";
import { useState } from "react";

const regex = /[^A-Za-z0-9]+/g;

const Signup = () => {
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

  return (
    <div>
      <form className="auth-signup-form" onSubmit={handleSignupFormSubmit}>
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
        </div>
      </form>
    </div>
  );
};

export default Signup;
