import React from "react";
import './MainPage.css'
import GoogleLogin from "react-google-login";
import userIcon from '../../../images/account_circle-white-48dp.svg'
import {CLIENT_ID} from "../../../Constants/GoogleAuthorization";

const user = {id: 123, name: 'Неопознаный', surname: 'Пользователь', img: userIcon};

export default function MainPage({onLogin, isDarkTheme}) {
    return (
        <div className='page main-page page-content'>
            <p>
                Добро пожаловать!<br/>
                Данный сайт предоставляет возможность<br/>
                потренироваться в запоминании информации<br/>
                <a href='https://en.wikipedia.org/wiki/Flashcard' target="_blank" rel="noopener noreferrer">
                    по методу флэш-карточек
                </a>
            </p>
            <p>
                Для того, чтобы начать,<br/>
                <button onClick={() => onLogin(user)} className='main-color shadow enter-button'>Войдите</button><br/>
                и добавьте в коллекцию первую колоду<br/>
            </p>
            <GoogleLogin
                onSuccess={x => console.log(x) || onLogin(user)}
                onFailure={x => console.log(x)}
                clientId={CLIENT_ID}
                theme={isDarkTheme ? 'dark' : 'light'}
                scope='openid'
                responseType='code'
                accessType='offline'
                prompt='consent'
                buttonText='Войти через Google'
            />
            <p>
                Удачи!
            </p>
        </div>
    )
}