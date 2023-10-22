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
    <div
      style={{ height: 1300, maxWidth: 1500 }}
      className="flex justify-center p-10 items-center max-h-screen ml-auto mr-auto max-sm:p-4 max-sm:m-2 "
    >
      <div className="  flex w-full justify-center  shadow-sm border-2 xl:p-18 p-10 max-sm:p-4  bg-white ">
        <div className=" w-full pt-10 items-center flex flex-col max-sm:pt-2">
          <h1 className="mb-24 max-lg:mb-18 font-extrabold tracking-widest max-sm:mb-8 text-4xl">
            SOF
          </h1>

          {switchToggle ? (
            <div className="flex flex-col items-center w-full ">
              <h2 className="font-bold text-md mb-7">Welcome back</h2>
              <Login />
            </div>
          ) : (
            <div className="flex flex-col items-center w-full gap-5">
              <h2 className="font-bold text-md mb-7">Create account</h2>
              <Signup />
              <p className="text-xs mt-5 ">
                By signing up, I have read an agree to
                <br />{" "}
                <a className="font-bold text-blue-700" href="#">
                  Terms
                </a>{" "}
                and{" "}
                <a className="font-bold text-blue-700" href="#">
                  Privacy Policy
                </a>
              </p>
            </div>
          )}
          <h3 className="mt-14 text-sm mb-5 max-sm:mt-10">
            {switchToggle ? (
              <p>
                First time here?{" "}
                <span
                  onClick={handleSwitchToggle}
                  className=" cursor-pointer underline underline-offset-2"
                >
                  {" "}
                  Sign up
                </span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span
                  onClick={handleSwitchToggle}
                  className="cursor-pointer underline underline-offset-2"
                >
                  Sign in
                </span>
              </p>
            )}
          </h3>
        </div>

        <img
          className="max-w-md max-lg:w-5/12 max-lg:object-right object-cover max-md:hidden "
          width={430}
          src={guy}
          alt=""
        />
      </div>
    </div>
  );
};

export default Auth;
