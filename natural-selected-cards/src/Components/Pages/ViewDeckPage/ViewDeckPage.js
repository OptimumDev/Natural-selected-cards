import React from "react";
import DeckSubview from "../../DeckSubview/DeckSubview";
import CardCarousel from "../../CardCarousel/CardsCorusel";
import FlipCard from "../../FlipCard/FlipCard";
import './ViewDeckPage.css'
import crossIcon from "../../../images/Flat_cross_icon.svg";
import IconButton from "../../IconButton/IconButton";

import * as server from "../../../Utils/server"

export default class ViewDeckPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            cardIndex: 0,
            flipped: [],
            cards: [],
            deckName: this.props.deckName
        };
    }

    async componentDidMount() {
        const response = await server.getDeck(this.props.deckId);

        if (response.ok) {
            const cards = await response.json();
            this.setState({
                cards,
                flipped: this.createFlipped(cards)
            });
        }
    }

    render() {
        const {cardIndex, cards} = this.state;
        return (
            <div className='page view-page'>
                <div className='page-name'>
                    {this.getHeading()}
                </div>
                <div className='page-content'>
                    <div className='middle'>
                        <CardCarousel
                            cardIndex={cardIndex}
                            buttons={this.getButtons()}
                        >
                            {cards.map(this.renderCard)}
                        </CardCarousel>
                        <button className='main-color shadow return-button' onClick={this.props.onBack}>
                            &lt; Вернуться
                        </button>
                    </div>
                    <DeckSubview
                        cards={this.state.cards}
                        chosenIndex={this.state.cardIndex}
                        onCardChoice={this.setCardIndex}
                    />
                </div>
            </div>
        );
    }

    getHeading = () => {
        const ref = React.createRef();

        const {isEditable} = this.props;
        const {deckName} = this.state;

        return isEditable
            ? <input
                type='text'
                className='deck-heading'
                defaultValue={deckName}
                onBlur={this.editDeckHeading}
                ref={ref}
                onKeyPress={this.enterHandler(ref)}
            />
            : deckName
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
            {this.getCardSide(card.question, e => this.editCard({...card, question: e.target.value}))}
            {this.getCardSide(card.answer, e => this.editCard({...card, answer: e.target.value}))}
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
                                this.state.cards.length > 1 &&
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
        flipped: this.createFlipped(this.state.cards)
    });

    flip = () => {
        const {flipped, cardIndex} = this.state;
        this.setState({
            flipped: flipped.map((f, i) => i === cardIndex ? !f : f)
        });
    };

    create = () => {
        const {cards, flipped} = this.state;
        this.setState({
            cards: cards.concat({id: cards.length, question: '', answer: ''}), // TODO server
            cardIndex: cards.length,
            flipped: flipped.concat(false)
        });
    };

    delete = () => {
        const {cards, cardIndex} = this.state;
        this.setState({
            cards: cards.filter((c, i) => i !== cardIndex),
            cardIndex: cardIndex === cards.length - 1 ? cardIndex - 1 : cardIndex
        });
    };

    editDeckHeading = e => {
        this.setState({
            deckName: e.target.value
        });
    };

    editCard = card => {
        const {cards, cardIndex} = this.state;
        this.setState({
            cards: cards.map((c, i) => i === cardIndex ? card : c)
        });
    };

    enterHandler = ref => e => {
        if (e.key === "Enter")
            ref.current.blur();
    };

    createFlipped = cards => cards.map(_ => false);
}