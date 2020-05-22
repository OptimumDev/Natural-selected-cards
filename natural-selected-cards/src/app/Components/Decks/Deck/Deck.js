import React from "react";
import './Deck.css'

import FlipCard from "../../Cards/FlipCard/FlipCard";
import ConfirmDialog from "../../Helpers/Dialogs/ConfirmDialog/ConfirmDialog";
import DeckInfo from "../DeckInfo/DeckInfo";

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
                    <DeckInfo
                        deck={deck}
                        isUsers={isUsers}
                        onAdd={onAdd}
                        onPlay={onPlay}
                        onView={onView}
                        onDelete={this.toggleDeleteDialog}
                    />
                </FlipCard>
                {
                    isDeleteDialogShown &&
                    <ConfirmDialog onAccept={onDelete} onCancel={this.toggleDeleteDialog}>
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
