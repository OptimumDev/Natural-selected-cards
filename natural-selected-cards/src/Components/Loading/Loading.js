import React from "react";
import ReactLoading from 'react-loading';

export default function Loading() {
    return (
        <div className='page'>
            <ReactLoading type='bubbles' color='#66E2FF' width='30vw' height='30vw'/>
        </div>
    );
}
