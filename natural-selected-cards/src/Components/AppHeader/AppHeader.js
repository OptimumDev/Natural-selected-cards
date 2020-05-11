import React from "react";
import './AppHeader.css';
import AppName from "../AppName/AppName";
import * as PageNames from "../../Constants/PageNames";
import IconButton from "../IconButton/IconButton";
import brightThemeIcon from "../../images/brightness_4-white-48dp.svg";
import darkThemeIcon from "../../images/brightness_4-black-48dp.svg";
import User from "../User/User";

export default function AppHeader({isDarkTheme, isAuthorized, onLogout, setPageName, toggleDarkTheme}) {
    return (
        <header className='app-header shadow main-color'>
            <AppName onClick={() => setPageName(PageNames.MY_DECKS)} isDarkTheme={isDarkTheme}/>
            <IconButton
                className='theme-button'
                onClick={toggleDarkTheme}
                icon={isDarkTheme ? brightThemeIcon : darkThemeIcon}
                alt='🌗'
                size='3.5vw'
            />
            {isAuthorized && <User isDarkTheme={isDarkTheme} onLogout={onLogout}/>}
        </header>
    );
}
