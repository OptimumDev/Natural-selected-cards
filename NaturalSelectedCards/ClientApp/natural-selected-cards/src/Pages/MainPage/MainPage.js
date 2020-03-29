import React from "react";
import './MainPage.css'

export default function MainPage({onMyDecks, onStandardDecks}) {
    return (
        <div className='main-page'>
            <button onClick={onMyDecks}>
                Мои колоды
            </button>
            <button onClick={onStandardDecks}>
                Стандартные колоды
            </button>
        </div>
    )
}