import React from "react";
import './AppName.css'

export default function AppName({onClick}) {
    return (
        <div className='app-name' onClick={onClick}>
            Natural Selected Cards
        </div>
    )
}