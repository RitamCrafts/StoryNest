import React,{useRef} from "react";
import CommonInput from "../components/Common/CommonInput";
import {CommonBox, CommonButton} from "../components/Common"
import Logo from "../components/Logo";
import { Link } from "react-router-dom";

function Login() {
  const emailRef = useRef(null);

  return (
    <div className="max-w-lg mx-auto my-4 px-4">
      <CommonBox>
        <div className="flex flex-col gap-y-1.5">

            <div className="circleLogo flex justify-center items-center">
                <div className="rounded-full
                    border border-green-100/70
                    bg-white/70
                    backdrop-blur-xl
                    shadow-[0_10px_35px_rgba(22,101,52,0.08)]
                    p-3" 
                >
                    <Logo width="50px"/>
                </div>
            </div>
            
            <div className="titleAndDesc mb-5">
                <div className="text-2xl font-bold flex gap-x-1.5 items-center justify-center">
                    <span className="text-green-700">Welcome</span><span className="text-gray-700">Back!</span>
                </div>
                <div className="text-gray-800/70 text-sm text-center mt-1">
                    Login to continue your reading journey.
                </div>
            </div>

            <CommonInput label={"Email Address"} placeholder={"Enter your email"} type="email" className="mb-2"/>
            <CommonInput label={"Password"} placeholder={"Enter your password"} type="password" className="mb-6"/>

            <CommonButton variant="primary">
                Login
            </CommonButton>

            <div className="mt-5 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                    to="/signup"
                    className="font-semibold text-green-700 transition-colors hover:text-green-800 hover:underline"
                >
                    Sign Up
                </Link>
            </div>
        </div>
      </CommonBox>
    </div>
  );
}

export default Login;