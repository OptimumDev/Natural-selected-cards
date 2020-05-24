import React from "react";
import './DeleteButton.css';

import IconButton from "../IconButton/IconButton";

import crossIcon from "../../../../../images/Flat_cross_icon.svg";

export default function DeleteButton({onClick}) {
    return (
        <IconButton
            className='delete-button'
            onClick={onClick}
            icon={crossIcon}
            alt='X'
            size='2.5vw'
        />
    );
}
