import React from "react";

const CustomInput = ({
  id,
  name,
  value,
  onChange,
  className = "",
  label,
  options = [],
  type = "text", // Default type is text
  placeholder = "",
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={id} className="font-medium text-white text-base">
          {label}
        </label>
      )}
      <div className="magic-gradient p-0.5 rounded">
        {type === "multiSelect" ? (
          <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            multiple
            className="w-full rounded py-3 bg-[#09011C] text-white focus:outline-none focus:ring-2 focus:ring-[#5A00F2] transition-shadow cursor-pointer"
          >
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            type={type}
            placeholder={placeholder || `Enter ${label}`}
            className="w-full rounded py-3 bg-[#09011C] text-white focus:outline-none focus:ring-2 focus:ring-[#5A00F2] transition-shadow cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default CustomInput;
