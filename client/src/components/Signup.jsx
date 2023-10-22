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
    <form
      className="flex w-full max-w-xs  flex-col gap-5"
      onSubmit={handleSignupFormSubmit}
    >
      <input
        className="p-2 outline-none border rounded-md text-xs"
        type="email"
        placeholder="Enter your email"
        maxLength={40}
        id="signup-email"
        name="email"
        required
        value={signupForm.email}
        onChange={handleSignupFormChange}
      />

      <input
        className="p-2 outline-none border rounded-md text-xs"
        type="text"
        placeholder="Create username"
        minLength={5}
        maxLength={20}
        id="signup-username"
        name="username"
        required
        value={signupForm.username}
        onChange={handleSignupFormChange}
      />

      <input
        className="p-2 outline-none border rounded-md text-xs"
        type="password"
        required
        minLength={8}
        placeholder="Create password"
        maxLength={30}
        id="signup-password"
        name="password"
        value={signupForm.password}
        onChange={handleSignupFormChange}
      />

      <button className="mt-2 text-sm w-9/12 p-1.5 bg-black ml-auto mr-auto rounded-md text-gray-100 hover:bg-gray-700  " type="submit">
        Continue
      </button>
    </form>
  );
};

export default Signup;
