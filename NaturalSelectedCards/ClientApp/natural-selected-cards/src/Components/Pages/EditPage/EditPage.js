import React from "react";
import DeckSubview from "../../DeckSubview/DeckSubview";
import {myDecks, standardDecks} from "../../../deckExamples";
import CardCarousel from "../../CardCarousel/CardsCorusel";
import FlipCard from "../../FlipCard/FlipCard";
import './EditPage.css'

export default function EditPage({deckId}) {
    const deck =
        standardDecks.find(deck => deck.id === deckId) ||
        myDecks.find(deck => deck.id === deckId);

    return (
        <div className='page'>
            <div className='page-name'>
                Edit page
            </div>
            <CardCarousel cardIndex={0}>
                {deck.cards.map(renderCard)}
            </CardCarousel>
            <DeckSubview deck={deck}/>
        </div>
    );
}

const renderCard = card => (
    <FlipCard key={card.id}>
        <div className='card-side'>
            <input type='text' defaultValue={card.front} className='main-color'/>
        </div>
        <div className='card-side'>
            <input type='text' defaultValue={card.back} className='main-color-light'/>
        </div>
    </FlipCard>
);