import axios from "axios";
import { useState } from "react";
import guy from "../images/guy.avif";


import Login from "../components/Login";
import Signup from "../components/Signup";

const regex = /[^A-Za-z0-9]+/g;

const Auth = () => {
  const [switchToggle, setSwitchToggle] = useState(false);

  function handleSwitchToggle() {
    setSwitchToggle(!switchToggle);
  }

  return (
    <div>
      <div className="auth-con">
        <h1 className="auth-title">SEA OF FRIENDS</h1>

        {switchToggle ? (
          <div>
            <h2>Welcome back</h2>
            <Login />
          </div>
        ) : (
          <div>
            <h2>Create account</h2>
            <Signup />
            <p>By signing up, I have read an agree to<br/> <a>Terms</a> and <a>Privacy Policy</a></p>

          </div>
        )}
        <h3 onClick={handleSwitchToggle}>{switchToggle? 'First time here? Sign up': 'Already have an account? Sign in'}</h3>
      </div>

      <img className="auth-image" src={guy} alt="" />
    </div>
  );
};

export default Auth;
