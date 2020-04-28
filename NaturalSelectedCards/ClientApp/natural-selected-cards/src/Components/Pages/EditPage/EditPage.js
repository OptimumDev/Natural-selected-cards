import React from "react";
import DeckSubview from "../../DeckSubview/DeckSubview";
import {myDecks, standardDecks} from "../../../deckExamples";
import CardCarousel from "../../CardCarousel/CardsCorusel";
import FlipCard from "../../FlipCard/FlipCard";
import './EditPage.css'

export default class EditPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.deck =
            standardDecks.find(deck => deck.id === this.props.deckId) ||
            myDecks.find(deck => deck.id === this.props.deckId);

        this.state = {
            cardIndex: 0,
            flipped: this.deck.cards.map(_ => false)
        };
    }

    render() {
        return (
            <div className='page'>
                <div className='page-name'>
                    Edit page
                </div>
                <CardCarousel
                    cardIndex={this.state.cardIndex}
                    buttons={[
                        <button key={1} className='main-color shadow' onClick={this.flip}>Перевернуть</button>
                    ]}
                >
                    {this.deck.cards.map(this.renderCard)}
                </CardCarousel>
                <DeckSubview deck={this.deck} chosenIndex={this.state.cardIndex} onCardChoice={this.setCardIndex}/>
            </div>
        );
    }

    renderCard = (card, i) => (
        <FlipCard key={card.id} flipped={this.state.flipped[i]}>
            <div className='card-side'>
                <input type='text' defaultValue={card.front} className='main-color'/>
            </div>
            <div className='card-side'>
                <input type='text' defaultValue={card.back} className='main-color-light'/>
            </div>
        </FlipCard>
    );

    setCardIndex = i => this.setState({
        cardIndex: i,
        flipped: this.deck.cards.map(_ => false)
    });

    flip = () => this.setState({
        flipped: this.state.flipped.map((f, i) => i === this.state.cardIndex ? !f : f)
    });
}