import React from "react";
import './ViewDeckPage.css'

import DeckSubview from "../../Decks/DeckSubview/DeckSubview";
import CardCarousel from "../../Cards/CardCarousel/CardsCorusel";
import Card from "../../Cards/Card/Card";
import Loading from "../../Helpers/Loading/Loading";
import ConfirmDialog from "../../Helpers/Dialogs/ConfirmDialog/ConfirmDialog";
import Button from "../../Helpers/Buttons/Button/Button";
import Input from "../../Helpers/Input/Input";

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
        const {isEditable} = this.props;

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
                            <Button className='main-color return-button' onClick={this.goBack}>
                                {isEditable ? 'Сохранить' : '< Вернуться'}
                            </Button>
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
        const {isEditable} = this.props;
        const {deckName} = this.state;

        return isEditable
            ? <Input className='deck-heading' onBlur={this.editDeckHeading}>{deckName}</Input>
            : deckName
    };

    getButtons = () => {
        const buttons = [
            <Button key={1} className='main-color' onClick={this.flip}>Перевернуть</Button>
        ];
        if (this.props.isEditable)
            buttons.push(
                <Button key={2} className='main-color' onClick={this.create}>Добавить новую карту</Button>
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

    editDeckHeading = async deckName => {
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

    toggleDeleteDialog = () => this.setState({
        isDeleteDialogShown: !this.state.isDeleteDialogShown
    });

    goBack = async () => {
        const {isEditable, onBack} = this.props;

        if (isEditable) {
            this.setState({isLoading: true})
            await this.editDeckHeading(this.state.deckName);
        }

        onBack();
    }
}
