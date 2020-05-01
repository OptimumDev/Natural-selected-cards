import React from "react";
import './CardCarousel.css'

export default function CardCarousel({children, cardIndex, buttons, lastButton}) {
    const curIndex = Math.min(cardIndex, children.length);
    const shift = `calc(-${curIndex} * (var(--card-width) + 100vw))`;
    const isLast = cardIndex === children.length;

    return (
        <div className='cards-carousel'>
            <div className='cards-container'>
                <div className='cards' style={{transform: `translate(${shift})`}}>
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