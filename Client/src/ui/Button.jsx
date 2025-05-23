import React from 'react';

const Button = ({ text, onClick, className, icon, children, variant = "default", bgNone = false, textColor }) => {
    if (variant === "Square") {
        return (
            <button
                onClick={onClick}
                className={`px-4 py-2 font-semibold border-2 ${bgNone ? 'bg-transparent' : 'bg-[#E3B577]'} border-[#E3B577] ${textColor || 'text-white'} hover:bg-[#c9995e] hover:border-[#c9995e] transition duration-300 ease-in-out cursor-pointer ${className} rancho`}
            >
                {text || children || 'Button Text'}
            </button>
        );
    }

    return (
        <button
            onClick={onClick}
            className={`mt-8 py-3 rancho text-xl relative overflow-hidden border-2 border-[#331A15] rounded-md cursor-pointer group ${className}`}
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
        >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white flex items-center justify-center gap-2">
                <span>{text || children || 'Button Text'}</span>
                {icon && <span className="inline-flex">{icon}</span>}
            </span>
            <span className="absolute inset-0 bg-[#E3B577] transition-transform duration-300 ease-in-out"></span>
            <span className="absolute inset-0 bg-[#331A15] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-center"></span>
        </button>
    );
};

export default Button;