import React from "react";
import './MainPage.css'

export default function MainPage({onLogin}) {
    return (
        <div className='main-page'>
            <p>
                Добро пожаловать!<br/>
                Данный сайт предоставляет возможность<br/>
                потренироваться в запоминании информации<br/>
                по <a href='https://en.wikipedia.org/wiki/Flashcard'>методу флэш-карточек</a>.
            </p>
            <p>
                Для того, чтобы начать,<br/>
                <button onClick={onLogin} className='main-color shadow enter-button'>Войдите</button><br/>
                и добавьте в коллекцию первую колоду.<br/>
            </p>
            <p>
                Удачи!
            </p>

        </div>
    )
}