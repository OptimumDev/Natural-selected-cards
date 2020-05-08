import React from "react";
import './User.css'
import userIcon from '../../images/account_circle-white-48dp.svg'
import exitIcon from '../../images/exit_to_app-white-48dp.svg'
import exitIconDark from '../../images/exit_to_app-black-48dp.svg'
import IconButton from "../IconButton/IconButton";

export default function User({user, isDarkTheme, onLogout}) {
    return (
        <div className='user'>
            {user &&
            <>
                <img src={user.img || userIcon} alt='👤' className='user-image main-color-dark' draggable={false}/>
                <span className='user-name'>{user.name} {user.surname}</span>
                <IconButton
                    className='exit-button'
                    onClick={onLogout}
                    icon={isDarkTheme ? exitIcon : exitIconDark}
                    alt='🚪'
                    size='3.5vw'
                />
            </>
            }
        </div>
    )
}