import React from "react";
import './Deck.css'
import FlipCard from "../FlipCard/FlipCard";

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
                <div className='deck-statistics'>
                    Кол-во игр: 8<br/>
                    Кол-во карт: 37<br/>
                    Процент правильных ответов: 42%<br/>
                    Последняя тренировка: Вчера<br/>
                </div>
                <div className='controls'>
                    <button className='edit-button yellow shadow' onClick={onView}>Просмотр</button>
                    <button className='play-button green shadow' onClick={isUsers ? onPlay : onAdd}>
                        {isUsers ? 'Играть' : 'Добавить'}
                    </button>
                </div>
            </div>
        </FlipCard>
    )
}