import React from "react";
import './DeckPage.css'

import Deck from "../../Deck/Deck";
import ChooseDialog from "../../ChooseDialog/ChooseDialog";

import * as server from "../../../Utils/server";


export default class Decks extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            decks: [],
            showBlackout: false
        }
    }

    async componentDidMount() {
        const getFunc = this.props.isUsers ? server.getUserDecks : server.getStandardDecks;
        const response = await getFunc();

        if (response.ok) {
            const decks = (await response.json())
                .map(deck => ({
                    id: deck.id,
                    name: deck.title,
                    cardsCount: deck.cardsCount,
                    gamesCount: deck.playedCount,
                    userRating: deck.rating,
                    lastRepeatTime: new Date(deck.lastRepetition)
                }));
            this.setState({decks});
        }
    }

    render() {
        const {isUsers} = this.props;
        return (
            <>
                <div className='page'>
                    <div className='page-name'>
                        {isUsers ? 'Мои колоды' : 'Стандартные колоды'}
                    </div>
                    <div className='page-content decks'>
                        {this.state.decks.map(this.createDeck)}
                        {isUsers && <div className='create-button' onClick={this.toggleChooseDialog}>+</div>}
                    </div>
                </div>
                <ChooseDialog isShown={this.state.showBlackout} onCancel={this.toggleChooseDialog}>
                    <div className='main-color shadow deck-like' onClick={this.create}>
                        Создать новую колоду
                    </div>
                    <div className='main-color shadow deck-like' onClick={this.chooseStandard}>
                        Выбрать из стандартных
                    </div>
                </ChooseDialog>
            </>
        );
    }

    toggleChooseDialog = () => this.setState({showBlackout: !this.state.showBlackout});

    createDeck = deck => (
        this.props.isUsers
            ? <Deck
                deck={deck}
                isUsers={true}
                onPlay={() => this.props.onPlay(deck.id)}
                onView={() => this.props.onView(deck.id)}
                onDelete={() => this.delete(deck.id)}
                key={deck.id}
            />
            : <Deck
                deck={deck}
                isUsers={false}
                onView={() => this.props.onView(deck.id)}
                onAdd={() => this.props.onAdd(deck.id)}
                key={deck.id}
            />
    );

    delete = deckId => this.setState({decks: this.state.decks.filter(d => d.id !== deckId)});

    create = () => {
        this.toggleChooseDialog();
        this.props.onCreate();
    };

    chooseStandard = () => {
        this.toggleChooseDialog();
        this.props.onChooseStandard();
    };
}