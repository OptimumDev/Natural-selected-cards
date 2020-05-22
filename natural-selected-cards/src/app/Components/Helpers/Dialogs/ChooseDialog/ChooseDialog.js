import React from "react";
import './ChooseDialog.css';

import Button from "../../Buttons/Button/Button";

export default function ChooseDialog({children, onCancel, isShown}) {
    return (
        <>
            <div className={`blackout ${isShown ? 'shown' : 'hidden'}`}/>
            <div className='choose-dialog'>
                <div className='choices'>
                    {children}
                </div>
                <Button className='cancel-button red' onClick={onCancel}>
                    Отмена
                </Button>
            </div>
        </>
    );
}
