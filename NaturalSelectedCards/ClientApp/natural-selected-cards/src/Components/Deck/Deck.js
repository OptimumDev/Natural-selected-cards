import React from "react";
import './Deck.css'

export default function Deck({deck, onPlay}) {
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
                        Процент правильных ответов: 42%<br/>
                    </div>
                    <div className='settings-buttons'>
                        <button className='edit-button yellow shadow'>Изменить</button>
                        <button className='delete-button red shadow'>Удалить</button>
                    </div>
                    <button className='play-button main-color shadow' onClick={onPlay}>Играть</button>
                </div>
            </div>
        </div>
    )
}