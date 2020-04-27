import React from "react";
import Deck from "../../Deck/Deck";
import './DeckPage.css'
import {myDecks, standardDecks} from "../../../deckExamples";
import ChooseDialog from "../../ChooseDialog/ChooseDialog";

export default class Decks extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            decks: props.isMine ? myDecks : standardDecks,
            showBlackout: false
        }
    }

    render() {
        const {isMine, onCreate, onChooseStandard} = this.props;
        return (
            <>
                <div className='page'>
                    <div className='page-name'>
                        {isMine ? 'My Decks' : 'Standard Decks'}
                    </div>
                    <div className='decks'>
                        {this.state.decks.map(this.createDeck)}
                        {isMine && <div className='create-button' onClick={this.toggleChooseDialog}>+</div>}
                    </div>
                </div>
                {
                    isMine &&
                    <ChooseDialog isShown={this.state.showBlackout} onCancel={this.toggleChooseDialog}>
                        <div className='main-color shadow deck-like' onClick={onCreate}>
                            Создать новую колоду
                        </div>
                        <div className='main-color shadow deck-like' onClick={onChooseStandard}>
                            Выбрать из стандартных
                        </div>
                    </ChooseDialog>
                }
            </>
        );
    }

    toggleChooseDialog = () =>  this.setState({showBlackout: !this.state.showBlackout});

    createDeck = deck => (
        <Deck
            deck={deck}
            onPlay={this.props.onPlay}
            onEdit={this.props.onEdit}
            onDelete={() => this.delete(deck.id)}
            key={deck.id}
        />
    );

    delete = deckId => this.setState({decks: this.state.decks.filter(d => d.id !== deckId)})
}