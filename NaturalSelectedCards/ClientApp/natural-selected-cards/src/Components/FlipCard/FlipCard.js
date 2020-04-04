import React from "react";
import './FlipCard.css'

export default function FlipCard({flipped, children}) {
    return (
        <div className={`flip-container ${flipped ? 'flipped' : ''}`}>
            <div className='flip-card'>
                <div className='front-side'>
                    {children[0]}
                </div>
                <div className='back-side'>
                    {children[1]}
                </div>
            </div>
        </div>
    );
}