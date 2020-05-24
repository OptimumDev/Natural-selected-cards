import React from "react";
import './IconButton.css';

import Button from "../Button/Button";

export default function IconButton({icon, alt, onClick, className, size}) {
    return (
        <Button onClick={onClick} className={`icon-button ${className ?? ''}`}>
            <img src={icon} alt={alt} onClick={onClick} style={{height: size, width: size}} draggable={false}/>
        </Button>
    );
}
