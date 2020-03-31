import React from "react";
import Deck from "../../Deck/Deck";
import './DeckPage.css'

const myDecks = [
    {name: 'Words', id: 'id-my-words'},
    {name: 'Cars', id: 'id-my-cars'}
];

const standardDecks = [
    {name: 'Family', id: 'id-standard-family'},
    {name: 'School', id: 'id-standard-school'}
];

export default function Decks({isMine, onPlay}) {
    const decks = isMine ? myDecks : standardDecks;
    return (
        <div>
            <div className='page-name'>
                {isMine ? 'My Decks' : 'Standard Decks'}
            </div>
            <div className='decks'>
                {decks.map(d => <Deck deck={d} />)}
            </div>
        </div>
    );
}