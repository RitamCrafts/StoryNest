import React,{useRef} from "react";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import Login from "../components/Login";
import { CommonBox } from "../components/Common";

function LoginPage() {
  const emailRef = useRef(null);

  return (
    <div className="max-w-lg mx-auto my-4 px-4">
      <CommonBox>
        <div className="flex flex-col gap-y-1.5 select-none">

            <div className="circleLogo flex justify-center items-center">
                <div className="rounded-full
                    border border-green-100/70
                    bg-white/70
                    backdrop-blur-xl
                    shadow-[0_10px_35px_rgba(22,101,52,0.08)]
                    p-3" 
                >
                    <Logo width="60px"/>
                </div>
            </div>
            <Login/>
            
        </div>
      </CommonBox>
    </div>
  );
}

export default LoginPage;