import React from "react";
import './ConfirmDialog.css';

export default function ConfirmDialog({onAccept, onCancel, children}) {
    return (
        <div className='dialog-container'>
            <div className='confirm-dialog shadow'>
                <div className='confirm-message'>
                    {children}
                </div>
                <footer className='confirm-dialog-footer'>
                    <button className='shadow main-color-light' onClick={onCancel}>
                        Отмена
                    </button>
                    <button className='shadow red' onClick={onAccept}>
                        Удалить
                    </button>
                </footer>
            </div>
        </div>
    );
}
