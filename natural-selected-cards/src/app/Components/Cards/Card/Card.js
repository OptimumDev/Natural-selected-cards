import React from "react";
import './Card.css';

import FlipCard from "../FlipCard/FlipCard";
import DeleteButton from "../../Helpers/Buttons/DeleteButton/DeleteButton";
import Input from "../../Helpers/Input/Input";

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
        const {card, isOnly, onDelete} = this.props;

        return (
            <>
                <Input className='card-side-input' onBlur={this.editHandler(key)}>
                    {card[key]}
                </Input>
                {!isOnly && <DeleteButton onClick={onDelete}/>}
            </>
        );
    };

    editHandler = key => value => {
        const {card, onEdit} = this.props;

        onEdit({...card, [key]: value})
    };
}
