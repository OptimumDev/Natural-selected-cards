import React from "react";
import './CardCarousel.css'

export default function CardCarousel({children, cardIndex, buttons, lastButton}) {
    const curIndex = Math.min(cardIndex, children.length);
    const shift = -curIndex * 135;
    const isLast = cardIndex === children.length;

    return (
        <div className='cards-carousel'>
            <div className='cards-container'>
                <div className='cards' style={{transform: `translate(${shift}vw)`}}>
                    {children}
                    {lastButton}
                </div>
            </div>
            <div className='buttons' style={isLast ? {transform: `translateY(100vh)`} : {}}>
                {buttons}
            </div>
        </div>
    );
}