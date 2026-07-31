import React, { useId } from "react";
import { ChevronDown } from "lucide-react";

function CommonSelect(
  {
    label,
    options = [],
    className = "",
    ...props
  },
  ref
) {
  const id = useId();

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block select-none text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <div className="relative group">
        <select
          id={id}
          ref={ref}
          className="
            peer
            w-full
            appearance-none
            cursor-pointer
            rounded-md
            border
            border-gray-300
            bg-white
            px-4
            py-3
            pr-11
            text-sm
            text-gray-800
            shadow-sm

            transition-all
            duration-200

            hover:border-gray-400

            focus:border-green-600
            focus:outline-none
            focus:ring-2
            focus:ring-green-100
          "
          {...props}
        >
          {options.map((option) => (
            <option
              key={option.value ?? option}
              value={option.value ?? option}
            >
              {option.label ?? option}
            </option>
          ))}
        </select>

        <ChevronDown
          size={18}
          strokeWidth={2.25}
          className="
            pointer-events-none
            absolute
            right-4
            top-1/2
            -translate-y-1/2

            text-gray-400

            transition-all
            duration-200

            group-hover:scale-110
            peer-focus:text-green-600
            peer-focus:scale-110
          "
        />
      </div>
    </div>
  );
}

export default React.forwardRef(CommonSelect);