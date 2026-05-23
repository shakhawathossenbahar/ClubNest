import React from 'react';

const Button = ({children,className}) => {
    return (
        <button className={`bg-main text-white px-5 py-1.5 font-semibold hover:opacity-80 cursor-pointer ${className}`}>
            {children}
        </button>
    );
};

export default Button;