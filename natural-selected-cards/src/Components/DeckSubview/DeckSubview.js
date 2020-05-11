import React from "react";
import './DeckSubview.css';

export default class DeckSubview extends React.Component {
    render() {
        return (
            <div className='deck-subview'>
                {this.props.deck.cards.map(this.renderCard)}
            </div>
        );
    }

    renderCard = (card, i) => (
        <div
            key={card.id}
            className='card-container'
            onClick={() => this.props.onCardChoice(i)}
        >
            <div className={`card ${this.props.chosenIndex === i ? 'chosen' : ''}`}>
                <div className='card-front main-color shadow'>
                    {card.front}
                </div>
                <div className='card-back main-color-light shadow'>
                    {card.back}
                </div>
            </div>
        </div>
    );
}
