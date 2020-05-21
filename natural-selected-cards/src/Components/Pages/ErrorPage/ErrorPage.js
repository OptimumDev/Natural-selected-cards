import React from "react";
import './ErrorPage.css';

export default function ErrorPage() {
    return (
        <div className='page error-page'>
            <div className='page-name'>
                Ошибка
            </div>
            <div className='page-content'>
                <p className='error-message'>
                    Что-то пошло не так<br/>
                    Повторите попытку позже
                </p>
            </div>
        </div>
    );
}
