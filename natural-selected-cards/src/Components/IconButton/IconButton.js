import React from "react";
import './IconButton.css';

export default function IconButton({icon, alt, onClick, className, size}) {
    return (
        <button className={`icon-button ${className}`}>
            <img src={icon} alt={alt} onClick={onClick} style={{height: size, width: size}} draggable={false}/>
        </button>
    );
}
