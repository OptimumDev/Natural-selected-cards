import React from "react";
import './User.css'
import userIcon from '../../images/account_circle-white-48dp.svg'

export default function User({user}) {
    return (
        <div className='user'>
            {user &&
            <>
                <img src={userIcon} alt='👤' className='user-image main-color-dark' draggable={false}/>
                <span className='user-name'>{user.name} {user.surname}</span>
            </>
            }
        </div>
    )
}