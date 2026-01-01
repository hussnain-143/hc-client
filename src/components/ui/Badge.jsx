import React from 'react';

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: "bg-slate-100 text-slate-700",
    success: "bg-emerald-100 text-emerald-700 border border-emerald-200", 
    warning: "bg-amber-100 text-amber-700 border border-amber-200",  
    info: "bg-blue-100 text-blue-700 border border-blue-200",       
    danger: "bg-rose-100 text-rose-700 border border-rose-200",   
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide inline-flex items-center gap-1 ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
