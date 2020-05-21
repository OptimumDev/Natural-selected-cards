import React from "react";
import './DeckPage.css'

import Deck from "../../Deck/Deck";
import ChooseDialog from "../../ChooseDialog/ChooseDialog";
import Loading from "../../Loading/Loading";

import * as server from "../../../Utils/server";


export default class Decks extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            showBlackout: false,
            isLoading: true
        }
    }

    async componentDidMount() {
        const getFunc = this.props.isUsers ? server.getUserDecks : server.getStandardDecks;
        const response = await getFunc();

        const decks = response?.map(deck => ({
            id: deck.id,
            name: deck.title,
            cardsCount: deck.cardsCount,
            gamesCount: deck.playedCount,
            userRating: deck.rating,
            lastRepeatTime: new Date(deck.lastRepetition)
        }));

        this.setState({
            decks,
            isLoading: false
        });
    }

    render() {
        const {isUsers} = this.props;
        return this.state.isLoading
            ? <Loading/>
            : (
                <div className='page'>
                    <div className='page-name'>
                        {isUsers ? 'Мои колоды' : 'Стандартные колоды'}
                    </div>
                    <div className='page-content decks'>
                        {this.state.decks.map(this.createDeck)}
                        {isUsers && <div className='create-button' onClick={this.toggleChooseDialog}>+</div>}
                    </div>
                    <ChooseDialog isShown={this.state.showBlackout} onCancel={this.toggleChooseDialog}>
                        <div className='main-color shadow deck-like' onClick={this.create}>
                            Создать новую колоду
                        </div>
                        <div className='main-color shadow deck-like' onClick={this.chooseStandard}>
                            Выбрать из стандартных
                        </div>
                    </ChooseDialog>
                </div>
            );
    }

    toggleChooseDialog = () => this.setState({showBlackout: !this.state.showBlackout});

    createDeck = deck => (
        this.props.isUsers
            ? <Deck
                deck={deck}
                isUsers={true}
                onPlay={() => this.props.onPlay(deck.id, deck.name)}
                onView={() => this.props.onView(deck.id, deck.name)}
                onDelete={() => this.delete(deck.id)}
                key={deck.id}
            />
            : <Deck
                deck={deck}
                isUsers={false}
                onView={() => this.props.onView(deck.id, deck.name)}
                onAdd={() => this.props.onAdd(deck.id)}
                key={deck.id}
            />
    );

    delete = async deckId => {
        this.setState({decks: this.state.decks.filter(d => d.id !== deckId)});
        await server.deleteDeck(deckId);
    };

    create = () => {
        this.toggleChooseDialog();
        this.props.onCreate();
    };

    chooseStandard = () => {
        this.toggleChooseDialog();
        this.props.onChooseStandard();
    };
}