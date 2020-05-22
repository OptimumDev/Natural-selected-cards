import React from "react";
import './Deck.css'

import FlipCard from "../FlipCard/FlipCard";
import DeckStatistics from "../DeckStatistics/DeckStatistics";
import IconButton from "../IconButton/IconButton";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";

import crossIcon from '../../images/Flat_cross_icon.svg'


export default class Deck extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isDeleteDialogShown: false
        }
    }

    render() {
        const {deck, isUsers, onAdd, onPlay, onView, onDelete} = this.props;
        const {isDeleteDialogShown} = this.state;
        return (
            <>
                <FlipCard flipOnHover={true}>
                    <div className='deck-name'>
                        {deck.name}
                    </div>
                    <div className='deck-info'>
                        <div className='deck-name'>
                            {deck.name}
                        </div>
                        {
                            isUsers
                                ? <DeckStatistics
                                    cardsCount={deck.cardsCount}
                                    gamesCount={deck.gamesCount}
                                    userRating={deck.userRating}
                                    lastRepeatTime={deck.lastRepeatTime}
                                />
                                : <DeckStatistics
                                    cardsCount={deck.cardsCount}
                                />
                        }
                        <div className='controls'>
                            <button className='edit-button yellow shadow' onClick={onView}>Просмотр</button>
                            <button className='play-button green shadow' onClick={isUsers ? onPlay : onAdd}>
                                {isUsers ? 'Играть' : 'Добавить'}
                            </button>
                            {
                                isUsers &&
                                <IconButton
                                    className='delete-button'
                                    onClick={this.toggleDeleteDialog}
                                    icon={crossIcon}
                                    alt='X'
                                    size='2.5vw'
                                />
                            }
                        </div>
                    </div>
                </FlipCard>
                {
                    isDeleteDialogShown &&
                    <ConfirmDialog
                        onAccept={onDelete}
                        onCancel={this.toggleDeleteDialog}
                    >
                        Удалить колоду "{deck.name}"?
                    </ConfirmDialog>
                }
            </>
        )
    }

    toggleDeleteDialog = () => {
        this.setState({isDeleteDialogShown: !this.state.isDeleteDialogShown})
    }
}
