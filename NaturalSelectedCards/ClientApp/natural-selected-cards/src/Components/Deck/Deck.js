import React from "react";
import './Deck.css'

export default function Deck({deck, onPlay, onEdit, onDelete}) {
    //TODO: change to FlipCard: add option and class from this option (.card.flip-by-hover:hover, .card.flipped {})
    return (
        <div className='deck-container'>
            <div className='deck shadow'>
                <div className='deck-cover main-color'>
                    <div className='deck-name'>
                        {deck.name}
                    </div>
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
                    {/*TODO: make optional*/}
                    <div className='settings-buttons'>
                        <button className='edit-button yellow shadow' onClick={() => onEdit(deck.id)}>Изменить</button>
                        <button className='delete-button red shadow' onClick={onDelete}>Удалить</button>
                    </div>
                    <button className='play-button main-color shadow' onClick={() => onPlay(deck.id)}>Играть</button>
                </div>
            </div>
        </div>
    )
}