import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
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
    <form className=" w-full max-w-xs flex flex-col gap-5" onSubmit={handleLoginFormSubmit}>
      <input
        className="sans p-2 outline-none border rounded-md text-xs"
        type="text"
        id="login-username"
        name="username"
        required
        placeholder="Enter your username"
        value={loginForm.username}
        onChange={handleLoginFormChange}
      />

      <input
        className=" sans p-2 outline-none border rounded-md text-xs"
        type="password"
        id="login-password"
        name="password"
        placeholder="Enter your password"
        required
        value={loginForm.password}
        onChange={handleLoginFormChange}
      />

      <button className="sans cursor-pointer text-sm w-9/12 p-1.5 bg-black ml-auto mr-auto rounded-md text-gray-100 mt-2" type="submit">
        Continue
      </button>
    </form>
  );
};

export default Login;
