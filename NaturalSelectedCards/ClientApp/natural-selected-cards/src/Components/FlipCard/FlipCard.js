import React from "react";
import './FlipCard.css'

export default function FlipCard({flipped, flipOnHover = false, children}) {
    return (
        <div className={'flip-container' + (flipOnHover ? ' flip-on-hover' : '') + (flipped ? ' flipped' : '')}>
            <div className='flip-card'>
                <div className='front-side shadow main-color'>
                    {children[0]}
                </div>
                <div className='back-side shadow main-color-light'>
                    {children[1]}
                </div>
            </div>
        </div>
    );
}