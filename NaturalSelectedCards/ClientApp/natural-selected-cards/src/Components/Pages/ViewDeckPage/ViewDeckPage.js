import React from "react";
import DeckSubview from "../../DeckSubview/DeckSubview";
import {myDecks, standardDecks} from "../../../deckExamples";
import CardCarousel from "../../CardCarousel/CardsCorusel";
import FlipCard from "../../FlipCard/FlipCard";
import './ViewDeckPage.css'

export default class ViewDeckPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        const deck =
            standardDecks.find(deck => deck.id === this.props.deckId) ||
            myDecks.find(deck => deck.id === this.props.deckId);

        this.inputRef = React.createRef();

        this.state = {
            cardIndex: 0,
            flipped: deck.cards.map(_ => false),
            deck
        };
    }

    render() {
        return (
            <div className='page'>
                <div className='page-name'>
                    {this.state.deck.name}
                </div>
                <CardCarousel
                    cardIndex={this.state.cardIndex}
                    buttons={[
                        <button key={1} className='main-color shadow' onClick={this.flip}>Перевернуть</button>
                    ]}
                >
                    {this.state.deck.cards.map(this.renderCard)}
                </CardCarousel>
                <DeckSubview deck={this.state.deck}
                             chosenIndex={this.state.cardIndex}
                             onCardChoice={this.setCardIndex}
                />
            </div>
        );
    }

    renderCard = (card, i) => (
        <FlipCard key={card.id} flipped={this.state.flipped[i]}>
            {this.getCardSide(card.front, e => this.editCard({...card, front: e.target.value}))}
            {this.getCardSide(card.back, e => this.editCard({...card, back: e.target.value}))}
        </FlipCard>
    );

    getCardSide = (label, onBlur) => {
        const ref = React.createRef();
        return (
            <div className='card-side'>
                {
                    this.props.isEditable
                        ? <input
                            type='text'
                            defaultValue={label}
                            onBlur={onBlur}
                            ref={ref}
                            onKeyPress={e => {
                                if (e.key === "Enter")
                                    ref.current.blur();
                            }}
                        />
                        : label
                }
            </div>
        );
    };

    setCardIndex = i => this.setState({
        cardIndex: i,
        flipped: this.state.deck.cards.map(_ => false)
    });

    flip = () => {
        const {flipped, cardIndex} = this.state;
        this.setState({
            flipped: flipped.map((f, i) => i === cardIndex ? !f : f)
        });
    }

    editCard = card => {
        const {deck, cardIndex} = this.state;
        this.setState({
            deck: {
                ...deck,
                cards: deck.cards.map((c, i) => i === cardIndex ? card : c)
            }
        });
    }
}