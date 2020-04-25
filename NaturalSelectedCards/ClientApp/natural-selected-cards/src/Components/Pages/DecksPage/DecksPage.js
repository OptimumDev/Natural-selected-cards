import React from "react";
import Deck from "../../Deck/Deck";
import './DeckPage.css'
import {myDecks, standardDecks} from "../../../deckExamples";

export default class Decks extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            decks: props.isMine ? myDecks : standardDecks
        }
    }

    render() {
        const {isMine, onCreate} = this.props;
        return (
            <div className='page'>
                <div className='page-name'>
                    {isMine ? 'My Decks' : 'Standard Decks'}
                </div>
                <div className='decks'>
                    {this.state.decks.map(this.createDeck)}
                    {isMine && <div className='create-button' onClick={onCreate}>+</div>}
                </div>
            </div>
        );
    }

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