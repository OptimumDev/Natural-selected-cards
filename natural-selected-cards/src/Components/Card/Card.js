import React from "react";
import './Card.css';

import FlipCard from "../FlipCard/FlipCard";
import IconButton from "../IconButton/IconButton";

import crossIcon from "../../images/Flat_cross_icon.svg";

export default class Card extends React.Component {
    render() {
        const {isFlipped} = this.props;

        return (
            <FlipCard flipped={isFlipped}>
                {this.getCardSide('question')}
                {this.getCardSide('answer')}
            </FlipCard>
        );
    }

    getCardSide = key => {
        const {card, isEditable} = this.props;

        return (
            <div className='card-side'>
                {isEditable ? this.getEditableCardSide(key) : card[key]}
            </div>
        );
    };

    getEditableCardSide = key => {
        const ref = React.createRef();
        const {card, isOnly, onDelete} = this.props;

        return (
            <>
                <input
                    type='text'
                    className='card-side-input'
                    defaultValue={card[key]}
                    onBlur={this.editHandler(key)}
                    ref={ref}
                    onKeyPress={this.enterHandler(ref)}
                />
                {
                    !isOnly &&
                    <IconButton
                        className='delete-button'
                        onClick={onDelete}
                        icon={crossIcon}
                        alt='X'
                        size='2.5vw'
                    />
                }
            </>
        );
    };

    enterHandler = ref => e => {
        if (e.key === "Enter")
            ref.current.blur();
    };

    editHandler = key => e => {
        const {card, onEdit} = this.props;

        onEdit({...card, [key]: e.target.value})
    };
}
