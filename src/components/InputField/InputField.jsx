import React from "react";

function InputField({
  label,
  placeholder,
  value,
  onChange,
  error,
  handleBlur,
  id,
  name,
  disabled,
}) {
  return (
    <div className="flex flex-col ">
      <label htmlFor="productName" className="text-sm mb-1">
        {label}
      </label>
      <input
        type="text"
        className="outline-none text-sm border-2 border-black border-opacity-30 focus:border-link_color rounded px-2 h-10 max-w-full"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        name={name}
        id={id}
        disabled={disabled}
      />
      <span
        className={`mb-0 text-xs mt-1 text-red-600 ${
          error ? "opacity-100" : "opacity-0"
        }`}
      >
        {error ? error : "error"}
      </span>
    </div>
  );
}

export default InputField;
