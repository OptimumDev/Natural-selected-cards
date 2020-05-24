import React from "react";
import './DeckPage.css'

import Deck from "../../Decks/Deck/Deck";
import ChooseDialog from "../../Helpers/Dialogs/ChooseDialog/ChooseDialog";
import Loading from "../../Helpers/Loading/Loading";

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
        const decks = await getFunc();

        this.setState({
            decks,
            isLoading: false
        });
    }

    render() {
        const {isUsers} = this.props;
        const {isLoading, decks, showBlackout} = this.state;
        return isLoading
            ? <Loading/>
            : (
                <div className='page'>
                    <div className='page-name'>
                        {isUsers ? 'Мои колоды' : 'Стандартные колоды'}
                    </div>
                    <div className='page-content decks'>
                        {decks.map(this.getDeck)}
                        {isUsers && <div className='create-button' onClick={this.toggleChooseDialog}>+</div>}
                    </div>
                    <ChooseDialog isShown={showBlackout} onCancel={this.toggleChooseDialog}>
                        <div className='main-color shadow deck-like' onClick={this.createDeck}>
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

    getDeck = deck => {
        const {isUsers, onView, onPlay} = this.props;

        const playDeck = () => onPlay(deck.id, deck.name);
        const viewDeck = () => onView(deck.id, deck.name);
        const addDeck = () => this.addDeck(deck.id);
        const deleteDeck = () => this.deleteDeck(deck.id);

        const sameProps = {
            deck,
            isUsers,
            onView: viewDeck,
            key: deck.id
        };

        return isUsers
            ? <Deck {...sameProps} onPlay={playDeck} onDelete={deleteDeck}/>
            : <Deck {...sameProps} onAdd={addDeck}/>
    };

    deleteDeck = async deckId => {
        this.setState({decks: this.state.decks.filter(d => d.id !== deckId)});
        await server.deleteDeck(deckId);
    };

    createDeck = () => {
        this.toggleChooseDialog();
        this.props.onCreate();
    };

    addDeck = async deckId => {
        this.setState({isLoading: true})
        await server.copyDeck(deckId);
        this.props.onAdd();
    }

    chooseStandard = () => {
        this.toggleChooseDialog();
        this.props.onChooseStandard();
    };
}