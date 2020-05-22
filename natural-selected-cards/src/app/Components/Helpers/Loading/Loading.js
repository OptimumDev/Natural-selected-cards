import React from "react";
import "./Loading.css"

import ReactLoading from 'react-loading';

export default function Loading() {
    return (
        <div className='page loading-page'>
            <ReactLoading type='bubbles' color='#66E2FF' width='30vw' height='30vw'/>
        </div>
    );
}
