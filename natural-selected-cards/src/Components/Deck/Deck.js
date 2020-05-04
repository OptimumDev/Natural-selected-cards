import React from "react";
import './Deck.css'
import FlipCard from "../FlipCard/FlipCard";
import crossIcon from '../../images/Flat_cross_icon.svg'
import DeckStatistics from "../DeckStatistics/DeckStatistics";

export default function Deck({deck, isUsers, onAdd, onPlay, onView, onDelete}) {
    return (
        <FlipCard flipOnHover={true}>
            <div className='deck-name'>
                {deck.name}
            </div>
            <div className='deck-info'>
                <div className='deck-name'>
                    {deck.name}
                </div>
                {
                    isUsers
                        ? <DeckStatistics
                            cardsCount={deck.cardsCount}
                            gamesCount={deck.gamesCount}
                            userRating={deck.userRating}
                            lastRepeatTime={deck.lastRepeatTime}
                        />
                        : <DeckStatistics
                            cardsCount={deck.cardsCount}
                        />
                }
                <div className='controls'>
                    <button className='edit-button yellow shadow' onClick={onView}>Просмотр</button>
                    <button className='play-button green shadow' onClick={isUsers ? onPlay : onAdd}>
                        {isUsers ? 'Играть' : 'Добавить'}
                    </button>
                    {
                        isUsers &&
                        <button className='delete-button' onClick={onDelete}>
                            <img src={crossIcon} alt='X' draggable={false}/>
                        </button>
                    }
                </div>
            </div>
        </FlipCard>
    )
}