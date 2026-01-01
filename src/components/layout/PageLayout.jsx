import React from 'react';

const PageLayout = ({ children, className = '' }) => {
  return (
    <div className={`max-w-7xl mx-auto p-8 animate-in fade-in duration-500 w-full ${className}`}>
      {children}
    </div>
  );
};

export default PageLayout;
