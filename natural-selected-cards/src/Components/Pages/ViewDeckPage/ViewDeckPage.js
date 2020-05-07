import React from "react";
import DeckSubview from "../../DeckSubview/DeckSubview";
import {myDecks, standardDecks} from "../../../deckExamples";
import CardCarousel from "../../CardCarousel/CardsCorusel";
import FlipCard from "../../FlipCard/FlipCard";
import './ViewDeckPage.css'
import crossIcon from "../../../images/Flat_cross_icon.svg";
import IconButton from "../../IconButton/IconButton";

export default class ViewDeckPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        const deck =
            standardDecks.find(deck => deck.id === this.props.deckId) ||
            myDecks.find(deck => deck.id === this.props.deckId);

        this.state = {
            cardIndex: 0,
            flipped: deck.cards.map(_ => false),
            deck
        };
    }

    render() {
        return (
            <div className='page view-page'>
                <div className='page-name'>
                    {this.getHeading()}
                </div>
                <div className='page-content'>
                    <div className='middle'>
                        <CardCarousel
                            cardIndex={this.state.cardIndex}
                            buttons={this.getButtons()}
                        >
                            {this.state.deck.cards.map(this.renderCard)}
                        </CardCarousel>
                        <button className='main-color shadow return-button' onClick={this.props.onBack}>
                            &lt; Вернуться
                        </button>
                    </div>
                    <DeckSubview
                        deck={this.state.deck}
                        chosenIndex={this.state.cardIndex}
                        onCardChoice={this.setCardIndex}
                    />
                </div>
            </div>
        );
    }

    getHeading = () => {
        const ref = React.createRef();
        const heading = this.state.deck.name;
        return this.props.isEditable
            ? <input
                type='text'
                className='deck-heading'
                defaultValue={heading}
                onBlur={this.editDeckHeading}
                ref={ref}
                onKeyPress={this.enterHandler(ref)}
            />
            : heading
    };

    getButtons = () => {
        const buttons = [
            <button key={1} className='main-color shadow' onClick={this.flip}>Перевернуть</button>
        ];
        if (this.props.isEditable)
            buttons.push(
                <button key={2} className='main-color shadow' onClick={this.create}>Добавить новую карту</button>
            );
        return buttons;
    };

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
                        ? <>
                            <input
                                type='text'
                                defaultValue={label}
                                onBlur={onBlur}
                                ref={ref}
                                onKeyPress={this.enterHandler(ref)}
                            />
                            {
                                this.state.deck.cards.length > 1 &&
                                <IconButton
                                    className='delete-button'
                                    onClick={this.delete}
                                    icon={crossIcon}
                                    alt='X'
                                    size='2.5vw'
                                />
                            }
                        </>
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
    };

    create = () => {
        const {deck, flipped} = this.state;
        this.setState({
            deck: {
                ...deck,
                cards: deck.cards.concat({id: deck.cards.length, front: '', back: ''})
            },
            cardIndex: deck.cards.length,
            flipped: flipped.concat(false)
        });
    };

    delete = () => {
        const {deck, cardIndex} = this.state;
        this.setState({
            deck: {
                ...deck,
                cards: deck.cards.filter((c, i) => i !== cardIndex)
            },
            cardIndex: cardIndex === deck.cards.length - 1 ? cardIndex - 1 : cardIndex
        });
    };

    editDeckHeading = e => {
        const {deck} = this.state;
        this.setState({
            deck: {
                ...deck,
                name: e.target.value
            }
        });
    };

    editCard = card => {
        const {deck, cardIndex} = this.state;
        this.setState({
            deck: {
                ...deck,
                cards: deck.cards.map((c, i) => i === cardIndex ? card : c)
            }
        });
    };

    enterHandler = ref => e => {
        if (e.key === "Enter")
            ref.current.blur();
    }

}