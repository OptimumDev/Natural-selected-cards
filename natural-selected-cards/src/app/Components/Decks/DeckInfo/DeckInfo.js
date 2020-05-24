import React from "react";
import './DeckInfo.css';

import DeckStatistics from "../DeckStatistics/DeckStatistics";
import Button from "../../Helpers/Buttons/Button/Button";
import DeleteButton from "../../Helpers/Buttons/DeleteButton/DeleteButton";

export default function DeckInfo({deck, isUsers, onView, onPlay, onAdd, onDelete}) {
    return (
        <div className='deck-info'>
            <div className='deck-name'>
                {deck.name}
            </div>
            <DeckStatistics
                cardsCount={deck.cardsCount}
                gamesCount={deck.gamesCount}
                userRating={deck.userRating}
                lastRepeatTime={deck.lastRepeatTime}
            />
            <div className='controls'>
                <Button className='edit-button yellow' onClick={onView}>Просмотр</Button>
                <Button className='play-button green' onClick={isUsers ? onPlay : onAdd}>
                    {isUsers ? 'Играть' : 'Добавить'}
                </Button>
                {isUsers && <DeleteButton onClick={onDelete}/>}
            </div>
        </div>
    );
}
