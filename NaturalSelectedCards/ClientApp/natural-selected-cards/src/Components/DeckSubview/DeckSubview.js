import React from "react";
import './DeckSubview.css';

export default function DeckSubview({deck}) {
    return (
        <div className='deck-subview'>
            {deck.cards.map(renderCard)}
        </div>
    );
}

const renderCard = card => (
    <div key={card.id} className='card'>
        <div className='card-front main-color shadow'>
            {card.front}
        </div>
        <div className='card-back main-color-light shadow'>
            {card.back}
        </div>
    </div>
);
