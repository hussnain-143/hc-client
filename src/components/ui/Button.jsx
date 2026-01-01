import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  type = 'button', 
  onClick, 
  className = '', 
  disabled = false,
  fullWidth = false,
}) => {
  const baseStyles = "font-semibold py-3 px-6 rounded-lg transition-all duration-200 active:transform active:scale-[0.98] outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-200",
    secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-amber-200",
    danger: "bg-white text-rose-600 border border-rose-100 hover:bg-rose-50",
    ghost: "text-slate-500 hover:text-amber-600 hover:bg-slate-50",
    outline: "border-2 border-amber-500 text-amber-600 hover:bg-amber-50"
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
