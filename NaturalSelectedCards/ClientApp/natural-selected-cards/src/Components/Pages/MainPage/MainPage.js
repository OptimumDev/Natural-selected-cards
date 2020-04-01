import React from "react";
import './MainPage.css'

export default function MainPage({onMyDecks, onStandardDecks}) {
    return (
        <div className='main-page'>
            <button className='shadow main-color' onClick={onMyDecks}>
                Мои колоды
            </button>
            <button className='shadow main-color' onClick={onStandardDecks}>
                Стандартные колоды
            </button>
        </div>
    )
}