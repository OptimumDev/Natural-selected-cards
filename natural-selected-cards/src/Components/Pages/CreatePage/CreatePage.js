import React from "react";
import {myDecks} from "../../../deckExamples";
import ViewDeckPage from "../ViewDeckPage/ViewDeckPage";

const createDeck = () => {
    const newDeck = {
        name: '',
        id: myDecks.length,
        lastRepeatTime: null,
        cardsCount: 0,
        gamesCount: 0,
        userRating: 0,
        cards: [
            {id: 0, front: '', back: ''}
        ]
    };
    myDecks.push(newDeck);
    return newDeck.id;
};

export default function CreatePage({onBack}) {
    const id = createDeck();
    return (
        <ViewDeckPage
            deckId={id}
            isEditable={true}
            onBack={onBack}
        />
    );
}