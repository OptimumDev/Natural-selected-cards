import React from "react";
import FlipCard from "../../FlipCard/FlipCard";
import './GamePage.css'
import CardCarousel from "../../CardCarousel/CardsCorusel";

import * as server from "../../../Utils/server";

export default class GamePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cardIndex: 0,
            cards: [],
            flipped: [],
            knewCurrentCard: false
        };
    }
    
    async componentDidMount() {
        const response = await server.getGameCards(this.props.deckId);

        if (response.ok) {
            const cards = await response.json();
            this.setState({cards, flipped: this.createFlipped(cards)})
        }
    }

    render() {
        const {cards, cardIndex} = this.state;
        const {deckName} = this.props;
        return (
            <div className='page game-page'>
                <div className='page-name'>
                    {deckName}
                </div>
                <div className='page-content'>
                    <CardCarousel
                        cardIndex={cardIndex}
                        lastButton={this.createButton('Вернуться', this.props.onEnd, 'main-color back-button')}
                        buttons={this.getButtons()}
                    >
                        {cards.map(this.getCard)}
                    </CardCarousel>
                </div>
            </div>
        );
    }

    getCard = (card, index) => (
        <FlipCard flipped={this.state.flipped[index]} key={card.id}>
            <div className='card-side'>{card.question}</div>
            <div className='card-side'>{card.answer}</div>
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
                    this.createButton('Теперь запомню', this.actuallyDontKnowHandle, 'green', 3)
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
            flipped: this.getUpdatedFlipped(),
            knewCurrentCard: true
        });
    };

    dontKnowHandle = () => {
        this.setState({
            flipped: this.getUpdatedFlipped(),
            knewCurrentCard: false
        });
    };

    actuallyKnowHandle = async () => {
        this.moveToNextCard();
        await server.answerCard(this.getCurrentCard().id, true);
    };

    actuallyDontKnowHandle = async () => {
        this.moveToNextCard();
        await server.answerCard(this.getCurrentCard().id, false);
    };

    isCurrentCardFlipped = () => this.state.flipped[this.state.cardIndex];

    getUpdatedFlipped = () => this.state.flipped.map((f, i) => i === this.state.cardIndex ? true : f);

    createFlipped = cards => cards.map(_ => false);

    moveToNextCard = () => this.setState({cardIndex: this.state.cardIndex + 1});

    getCurrentCard = () => this.state.cards[this.state.cardIndex];
}