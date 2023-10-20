import React from "react";

function Button({
  className,
  type,
  onClick,
  disabled,
  icon,
  iconSize,
  clr,
  animation,
  text,
}) {
  return (
    <>
      <button
        type={type}
        className={`rounded-md h-9 font-roboto flex justify-center items-center ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        <div className="flex justify-center items-center ">
          {text}
          {icon != null &&
            React.createElement(icon, {
              size: iconSize,
              color: `${clr}`,
              className: `${animation}`,
            })}
        </div>
      </button>
    </>
  );
}

export default Button;
