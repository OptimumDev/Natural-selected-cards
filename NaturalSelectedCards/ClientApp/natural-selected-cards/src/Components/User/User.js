import React from "react";
import './User.css'

export default function User({user}) {
    return (
        <div className='user'>
            <span className='user-image' role='img' aria-label='avatar'>👤</span>
            <span className='user-name'>
                {user.name} {user.surname}
            </span>
        </div>
    )
}