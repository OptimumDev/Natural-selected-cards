import React from "react";
import './AppName.css'

import darkLogo from '../../../../images/logo192x192-dark.png'
import logo from '../../../../images/logo192x192.png'

export default function AppName({onClick, isDarkTheme}) {
    return (
        <div className='app-name' onClick={onClick}>
            <img src={isDarkTheme ? logo : darkLogo} alt='NSC' className='logo'/>
            Natural Selected Cards
        </div>
    )
}