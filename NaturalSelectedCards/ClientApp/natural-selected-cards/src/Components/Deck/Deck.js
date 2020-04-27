import React from "react";
import './Deck.css'
import FlipCard from "../FlipCard/FlipCard";

export default function Deck({deck, isUsers, onAdd, onPlay, onEdit, onDelete}) {
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
                </div>
                <div className='settings-buttons'>
                    {isUsers &&
                    <>
                        <button className='edit-button yellow shadow' onClick={() => onEdit(deck.id)}>Изменить</button>
                        <button className='delete-button red shadow' onClick={onDelete}>Удалить</button>
                    </>
                    }
                </div>
                <button className='play-button green shadow' onClick={() => isUsers ? onPlay(deck.id) : onAdd(deck.id)}>
                    {isUsers ? 'Играть' : 'Добавить'}
                </button>
            </div>
        </FlipCard>
    )
}