import React from "react";
import './GamePage.css'

import Card from "../../Cards/Card/Card";
import CardCarousel from "../../Cards/CardCarousel/CardsCorusel";
import Loading from "../../Helpers/Loading/Loading";
import Button from "../../Helpers/Buttons/Button/Button";

import * as server from "../../../Utils/server";

export default class GamePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cardIndex: 0,
            knewCurrentCard: false,
            isLoading: true
        };
    }

    async componentDidMount() {
        const cards = await server.getGameCards(this.props.deckId);

        this.setState({
            cards,
            flipped: this.createFlipped(cards),
            isLoading: false
        })
    }

    render() {
        const {cards, cardIndex, isLoading} = this.state;
        const {deckName, onEnd} = this.props;
        return isLoading
            ? <Loading/>
            : (
                <div className='page game-page'>
                    <div className='page-name'>
                        {deckName}
                    </div>
                    <div className='page-content'>
                        <CardCarousel
                            cardIndex={cardIndex}
                            lastButton={
                                this.createButton('Вернуться', onEnd, 'main-color back-button')
                            }
                            buttons={this.getButtons()}
                        >
                            {cards.map(this.getCard)}
                        </CardCarousel>
                    </div>
                </div>
            );
    }

    getCard = (card, index) => (
        <Card
            key={card.id}
            card={card}
            isFlipped={this.state.flipped[index]}
            isEditable={false}
        />
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

    createButton = (label, handle, className, key) => (
        <Button className={className} onClick={handle} key={key}>
            {label}
        </Button>
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