import React from 'react';

const Card = ({ children, className = '', padding = 'p-8' }) => {
  return (
    <div className={`bg-white ${padding} rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
