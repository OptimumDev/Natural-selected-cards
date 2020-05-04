import React from "react";
import './ChooseDialog.css';

export default function ChooseDialog({children, onCancel, isShown}) {
    return (
        <>
            <div className={`blackout ${isShown ? 'shown' : 'hidden'}`}/>
            <div className='choose-dialog'>
                <div className='choices'>
                    {children}
                </div>
                <button className='cancel-button shadow red' onClick={onCancel}>
                    Отмена
                </button>
            </div>
        </>
    );
}
