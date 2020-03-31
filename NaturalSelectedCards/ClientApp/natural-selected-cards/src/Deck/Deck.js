import React from "react";
import './Deck.css'

export default function Deck({deck}) {
    return (
        <div className='deck shadow main-color' key={deck.id}>
            {deck.name}
        </div>
    )
}