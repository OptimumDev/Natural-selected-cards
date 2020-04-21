import React from "react";
import {standardDecks, myDecks} from "../../../deckExamples";
import FlipCard from "../../FlipCard/FlipCard";
import './GamePage.css'
import CardCarousel from "../../CardCarousel/CardsCorusel";

function CardSide({label}) {
    return (
        <div className='card-side main-color shadow'>
            {label}
        </div>
    );
}

function Card({card, flipped}) {
    return (
        <FlipCard flipped={flipped}>
            <CardSide label={card.front}/>
            <CardSide label={card.back}/>
        </FlipCard>
    );
}

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
                    backButton={this.createButton('Вернуться', this.props.onEnd, 'back-button')}
                    buttons={this.getButtons()}
                >
                    {this.deck.cards.map((card, i) => (
                        <Card flipped={this.state.flipped[i]} card={card} key={i}/>
                    ))}
                </CardCarousel>
            </div>
        );
    }

    getButtons = () => {
        if (this.isCurrentCardFlipped()) {
            if (this.state.knewCurrentCard) {
                return [
                    this.createButton('Действительно помню', this.actuallyKnowButtonHandle),
                    this.createButton('Все-таки не помню', this.actuallyDontKnowHandle, 'red')
                ]
            } else {
                return [
                    this.createButton('Теперь запомню', this.moveToNextCard)
                ]
            }
        } else {
            return [
                this.createButton('Помню', this.knowButtonHandle),
                this.createButton('Не помню', this.dontKnowButtonHandle, 'red')
            ]
        }
    };

    createButton = (label, handle, className = '') => (
        <button className={`main-color shadow ${className}`} onClick={handle}>
            {label}
        </button>
    );

    knowButtonHandle = () => {
        this.setState({
            flipped: this.updateFlipped(),
            knewCurrentCard: true
        });
    };

    dontKnowButtonHandle = () => {
        this.setState({
            flipped: this.updateFlipped(),
            knewCurrentCard: false
        });
    };

    actuallyKnowButtonHandle = () => {
        this.moveToNextCard();
    };

    actuallyDontKnowHandle = () => {
        this.moveToNextCard();
    };

    isCurrentCardFlipped = () => this.state.flipped[this.state.cardIndex];

    updateFlipped = () => this.state.flipped.map((f, i) => i === this.state.cardIndex ? true : f);

    moveToNextCard = () => this.setState({cardIndex: this.state.cardIndex + 1});
}