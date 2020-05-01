import React from "react";
import {standardDecks, myDecks} from "../../../deckExamples";
import FlipCard from "../../FlipCard/FlipCard";
import './GamePage.css'
import CardCarousel from "../../CardCarousel/CardsCorusel";

export default class GamePage extends React.Component {
    constructor(props) {
        super(props);

        this.deck =
            standardDecks.find(deck => deck.id === this.props.deckId) ||
            myDecks.find(deck => deck.id === this.props.deckId);

        this.state = {
            cardIndex: 0,
            flipped: this.deck.cards.map(_ => false),
            knewCurrentCard: false
        };
    }

    render() {
        return (
            <div className='page game-page'>
                <div className='page-name'>
                    {this.deck.name}
                </div>
                <CardCarousel
                    cardIndex={this.state.cardIndex}
                    lastButton={this.createButton('Вернуться', this.props.onEnd, 'main-color back-button')}
                    buttons={this.getButtons()}
                >
                    {this.deck.cards.map(this.getCard)}
                </CardCarousel>
            </div>
        );
    }

    getCard = (card, index) => (
        <FlipCard flipped={this.state.flipped[index]} key={card.id}>
            <div className='card-side'>{card.front}</div>
            <div className='card-side'>{card.back}</div>
        </FlipCard>
    );

    getButtons = () => {
        if (this.isCurrentCardFlipped()) {
            if (this.state.knewCurrentCard) {
                return [
                    this.createButton('Действительно помню', this.actuallyKnowHandle, 'green', 1),
                    this.createButton('Все-таки не помню', this.actuallyDontKnowHandle, 'red', 2)
                ]
            } else {
                return [
                    this.createButton('Теперь запомню', this.moveToNextCard, 'green', 3)
                ]
            }
        } else {
            return [
                this.createButton('Помню', this.knowHandle, 'green', 4),
                this.createButton('Не помню', this.dontKnowHandle, 'red', 5)
            ]
        }
    };

    createButton = (label, handle, className = '', key) => (
        <button className={`shadow ${className}`} onClick={handle} key={key}>
            {label}
        </button>
    );

    knowHandle = () => {
        this.setState({
            flipped: this.updateFlipped(),
            knewCurrentCard: true
        });
    };

    dontKnowHandle = () => {
        this.setState({
            flipped: this.updateFlipped(),
            knewCurrentCard: false
        });
    };

    actuallyKnowHandle = () => {
        this.moveToNextCard();
    };

    actuallyDontKnowHandle = () => {
        this.moveToNextCard();
    };

    isCurrentCardFlipped = () => this.state.flipped[this.state.cardIndex];

    updateFlipped = () => this.state.flipped.map((f, i) => i === this.state.cardIndex ? true : f);

    moveToNextCard = () => this.setState({cardIndex: this.state.cardIndex + 1});
}