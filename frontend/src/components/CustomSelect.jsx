import React from "react";

const CustomSelect = ({
  id,
  name,
  value,
  onChange,
  className = "",
  label,
  options = [],
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={id} className=" font-medium text-white text-base">
          {label}
        </label>
      )}
      <div className=" magic-gradient p-0.5 rounded ">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full rounded py-3 bg-[#09011C] text-white focus:outline-none focus:ring-2 focus:ring-[#5A00F2] transition-shadow cursor-pointer"
        >
          <option value="" disabled>
            Select {label}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CustomSelect;
