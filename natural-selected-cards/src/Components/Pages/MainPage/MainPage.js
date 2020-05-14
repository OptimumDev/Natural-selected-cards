import React from "react";
import './MainPage.css'
import GoogleLogin from "react-google-login";
import {CLIENT_ID} from "../../../Constants/GoogleAuthorization";
import * as server from "../../../Utils/server"

export default class MainPage extends React.Component {
    render() {
        const {isDarkTheme} = this.props;
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
                    Для того, чтобы начать, войдите<br/>
                    и добавьте в коллекцию первую колоду<br/>
                </p>
                <GoogleLogin
                    onSuccess={response => this.authorize(response.code)}
                    onFailure={error => console.log(error)}
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

    authorize = async code => {
        const response = await server.authorizeUser(code);
        if (response.ok)
            this.props.onLogin();
    }
}