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
    <div>
      <form className="flex flex-col" onSubmit={handleLoginFormSubmit}>
        <input
          className=""
          type="text"
          id="login-username"
          name="username"
          required
          placeholder="Username"
          value={loginForm.username}
          onChange={handleLoginFormChange}
        />

        <input
          className=""
          type="password"
          id="login-password"
          name="password"
          placeholder="Password"
          required
          value={loginForm.password}
          onChange={handleLoginFormChange}
        />

        <button className="" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
