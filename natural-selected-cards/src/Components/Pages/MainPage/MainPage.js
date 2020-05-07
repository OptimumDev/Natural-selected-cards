import React from "react";
import './MainPage.css'

const user = {id: 123, name: 'Неопознаный', surname: 'Пользователь'};

export default function MainPage({onLogin, isDarkTheme}) {
    return (
        <div className='page main-page page-content'>
            <p>
                Добро пожаловать!<br/>
                Данный сайт предоставляет возможность<br/>
                потренироваться в запоминании информации<br/>
                по <a href='https://en.wikipedia.org/wiki/Flashcard'>методу флэш-карточек</a>.
            </p>
            <p>
                Для того, чтобы начать,<br/>
                <button onClick={() => onLogin(user)} className='main-color shadow enter-button'>Войдите</button><br/>
                и добавьте в коллекцию первую колоду.<br/>
            </p>
            <p>
                Удачи!
            </p>
        </div>
    )
}