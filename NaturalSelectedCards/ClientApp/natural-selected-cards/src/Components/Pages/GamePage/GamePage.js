import React from "react";
import {standardDecks, myDecks} from "../../../deckExamples";
import FlipCard from "../../FlipCard/FlipCard";
import './GamePage.css'

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
        };
    }

    flip = () => {
        this.setState({
            flipped: this.state.flipped.map(
                (f, i) => i === this.state.cardIndex ? true : f
            )
        });
    };

    next = () => {
        this.setState({
            cardIndex: this.state.cardIndex + 1
        });
    };

    render() {
        const shift = Math.max(-(1 + this.state.cardIndex) * 150, -(1 + this.deck.cards.length) * 150);
        const isLast = this.state.cardIndex === this.deck.cards.length;

        return (
            <div className='page game-page'>
                <div className='page-name'>
                    {this.deck.name}
                </div>
                <div className='game-area'>
                    <div className='cards-container'>
                        <div className='cards' style={{transform: `translate(${shift}vw)`}}>
                            {this.deck.cards.map((card, i) => (
                                <Card flipped={this.state.flipped[i]} card={card}/>
                            ))}
                            <button onClick={this.props.onEnd} className='main-color shadow back-button'>
                                Вернуться
                            </button>
                        </div>
                    </div>
                    <div className='buttons' style={isLast ? {transform: `translateY(100vh)`} : {}}>
                        <button className='main-color shadow' onClick={this.flip}>
                            Перевернуть
                        </button>
                        <button className='main-color shadow' onClick={this.next}>
                            Дальше
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}