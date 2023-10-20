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
    <div style={{height: 1000, maxWidth: 1500}} className="flex justify-center items-center max-h-screen ml-auto mr-auto">
      <div className="m-14  flex w-full justify-center  shadow-sm border-2 p-14 bg-white ">
        <div className="w-7/12 pt-10 items-center flex flex-col">
          <h1 className="mb-24 font-extrabold tracking-widest text-2xl">
            SEA OF FRIENDS
          </h1>

          {switchToggle ? (
            <div className="flex flex-col items-center w-full ">
              <h2 className="sans font-bold text-md mb-7">Welcome back</h2>
              <Login />
            </div>
          ) : (
            <div className="flex flex-col items-center w-full gap-5">
              <h2 className="sans font-bold text-md mb-7">Create account</h2>
              <Signup />
              <p className="text-xs mt-5 ">
                By signing up, I have read an agree to
                <br /> <a>Terms</a> and <a>Privacy Policy</a>
              </p>
            </div>
          )}
          <h3 className="mt-20 cursor-pointer" onClick={handleSwitchToggle}>
            {switchToggle
              ? "First time here? Sign up"
              : "Already have an account? Sign in"}
          </h3>
        </div>

        <img className=" pt-10 object-cover" width={450} src={guy} alt="" />
      </div>
    </div>
  );
};

export default Auth;
