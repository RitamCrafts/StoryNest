import React, { useState } from "react";
import { useId } from "react";
import { Eye,EyeOff } from "lucide-react";

function CommonInput({
  label,
  type = "text",
  className = "",
  ref,
  ...props
}) {
  const inputId = useId();
  const [passwordShow,setPasswordShow] = useState(false);
  return (
    <div className={`w-full ${className}`}>
      <label className="mb-1 block text-sm font-medium text-gray-800 select-none" htmlFor={inputId}>
        {label}
      </label>
      <div className="text-box-wrapper relative">
        <input
          ref={ref}
          id={inputId}
          type={type==="password"?(passwordShow?"text":"password"):type}
          className={`
            w-full
            rounded-md
            border
            border-gray-300
            bg-white
            px-4
            ${type==="password" && "pr-12"}
            py-3
            text-sm
            text-gray-800
            shadow-sm
            transition-colors
            duration-200
            placeholder:text-gray-400

            focus:border-green-600
            focus:outline-none
          `}
          {...props}
        />

        {type==="password" &&  
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setPasswordShow(prev => !prev)}
              className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  z-10
                  text-gray-500
                  hover:text-gray-700
                  transition-colors
                  duration-200
                  cursor-pointer
              "
          >
              {passwordShow?<EyeOff size={18} />:<Eye size={18} />}
          </button>
        }
        
      </div>
    </div>
  );
}

export default CommonInput;