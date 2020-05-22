import React from "react";
import './ViewDeckPage.css'

import DeckSubview from "../../DeckSubview/DeckSubview";
import CardCarousel from "../../CardCarousel/CardsCorusel";
import Card from "../../Card/Card";
import Loading from "../../Loading/Loading";
import ConfirmDialog from "../../ConfirmDialog/ConfirmDialog";

import * as server from "../../../Utils/server"


export default class ViewDeckPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            cardIndex: 0,
            deckName: this.props.deckName,
            isLoading: true,
            isDeleteDialogShown: false
        };
    }

    async componentDidMount() {
        const cards = await server.getDeck(this.props.deckId);

        this.setState({
            cards,
            flipped: this.createFlipped(cards),
            isLoading: false
        });
    }

    render() {
        const {cardIndex, cards, isLoading, isDeleteDialogShown} = this.state;
        return isLoading
            ? <Loading/>
            : (
                <div className='page view-page'>
                    <div className='page-name'>
                        {this.getHeading()}
                    </div>
                    <div className='page-content'>
                        <div className='middle'>
                            <CardCarousel cardIndex={cardIndex} buttons={this.getButtons()}>
                                {cards.map(this.renderCard)}
                            </CardCarousel>
                            <button className='main-color shadow return-button' onClick={this.props.onBack}>
                                &lt; Вернуться
                            </button>
                        </div>
                        <DeckSubview
                            cards={cards}
                            chosenIndex={cardIndex}
                            onCardChoice={this.setCardIndex}
                        />
                    </div>
                    {
                        isDeleteDialogShown &&
                        <ConfirmDialog
                            onCancel={this.toggleDeleteDialog}
                            onAccept={this.deleteCard}
                        >
                            Удалить карточку "{cards[cardIndex].question}"?
                        </ConfirmDialog>
                    }
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

    renderCard = (card, i) => {
        const {flipped, cards} = this.state;
        const isOnly = cards.length === 1;

        return (
            <Card
                key={card.id}
                card={card}
                isFlipped={flipped[i]}
                isEditable={this.props.isEditable}
                isOnly={isOnly}
                onEdit={this.editCard}
                onDelete={this.toggleDeleteDialog}
            />
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

    create = async () => {
        const {cards, flipped} = this.state;

        const id = await server.createCard(this.props.deckId);

        this.setState({
            cards: cards.concat({id, question: '', answer: ''}),
            cardIndex: cards.length,
            flipped: flipped.concat(false)
        });
    };

    deleteCard = async () => {
        const {cards, cardIndex} = this.state;
        this.setState({
            cards: cards.filter((c, i) => i !== cardIndex),
            cardIndex: cardIndex === cards.length - 1 ? cardIndex - 1 : cardIndex,
            isDeleteDialogShown: false
        });
        await server.deleteCard(cards[cardIndex].id);
    };

    editDeckHeading = async e => {
        const deckName = e.target.value;
        this.setState({deckName});
        await server.updateDeckTitle(this.props.deckId, deckName)
    };

    editCard = async card => {
        const {cards, cardIndex} = this.state;
        this.setState({
            cards: cards.map((c, i) => i === cardIndex ? card : c)
        });
        await server.updateCard(card.id, card.question, card.answer)
    };

    createFlipped = cards => cards.map(_ => false);

    enterHandler = ref => e => {
        if (e.key === "Enter")
            ref.current.blur();
    };

    toggleDeleteDialog = () => this.setState({
        isDeleteDialogShown: !this.state.isDeleteDialogShown
    });
}
