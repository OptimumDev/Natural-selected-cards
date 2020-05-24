import React from "react";
import './ConfirmDialog.css';

import Button from "../../Buttons/Button/Button";

export default function ConfirmDialog({onAccept, onCancel, children}) {
    return (
        <div className='dialog-container'>
            <div className='confirm-dialog shadow'>
                <div className='confirm-message'>
                    {children}
                </div>
                <footer className='confirm-dialog-footer'>
                    <Button className='main-color-light' onClick={onCancel}>
                        Отмена
                    </Button>
                    <Button className='red' onClick={onAccept}>
                        Удалить
                    </Button>
                </footer>
            </div>
        </div>
    );
}
