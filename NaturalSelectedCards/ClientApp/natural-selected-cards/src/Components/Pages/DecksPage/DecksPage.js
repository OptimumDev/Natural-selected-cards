import React from "react";
import Deck from "../../Deck/Deck";
import './DeckPage.css'
import {myDecks, standardDecks} from "../../../deckExamples";

export default function Decks({isMine, onPlay, onCreate}) {
    const decks = isMine ? myDecks : standardDecks;
    return (
        <div className='page'>
            <div className='page-name'>
                {isMine ? 'My Decks' : 'Standard Decks'}
            </div>
            <div className='decks'>
                {decks.map(d => <Deck deck={d} onPlay={() => onPlay(d.id)}/>)}
                {isMine && <div className='create-button deck-container' onClick={onCreate}>+</div>}
            </div>
        </div>
    );
}