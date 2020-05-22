import React from "react";
import './Button.css';

export default function Button({onClick, className, children}) {
    return (
        <button className={`shadow ${className ?? ''}`} onClick={onClick}>
            {children}
        </button>
    );
}
