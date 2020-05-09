import React from 'react';
import './Page.css'
import * as PageNames from "../../../Constants/PageNames";
import MainPage from "../MainPage/MainPage";
import DecksPage from "../DecksPage/DecksPage";
import GamePage from "../GamePage/GamePage";
import CreatePage from "../CreatePage/CreatePage";
import ViewDeckPage from "../ViewDeckPage/ViewDeckPage";
import {myDecks, standardDecks} from "../../../deckExamples";

export default class Page extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.pageGettersByName = {
            [PageNames.MAIN]: this.getMainPage,
            [PageNames.MY_DECKS]: this.getMyDecksPage,
            [PageNames.STANDARD_DECKS]: this.getStandardDecksPage,
            [PageNames.GAME]: this.getGamePage,
            [PageNames.CREATE]: this.getCreatePage,
            [PageNames.EDIT]: this.getEditPage,
            [PageNames.VIEW]: this.getViewPage,
        }
    }

    render() {
        const {pageName} = this.props;

        return this.pageGettersByName[pageName]() || <h1>Can't find page with name {pageName}</h1>
    }

    getMainPage = () => {
        const {setUser, isDarkTheme} = this.props;
        return (
            <MainPage onLogin={setUser} isDarkTheme={isDarkTheme}/>
        );
    };

    getMyDecksPage = () => {
        return (
            <DecksPage
                isUsers={true}
                onPlay={this.play}
                onView={this.edit}
                onCreate={this.create}
                onChooseStandard={this.showStandardDecks}
                key={PageNames.MY_DECKS}
            />
        );
    };

    getStandardDecksPage = () => {
        return (
            <DecksPage
                isUsers={false}
                onView={this.view}
                onAdd={this.add}
                key={PageNames.STANDARD_DECKS}
            />
        );
    };

    getGamePage = () => {
        return (
            <GamePage deckId={this.deckId} onEnd={this.showMyDecks}/>
        );
    };

    getCreatePage = () => {
        return (
            <CreatePage onBack={this.showMyDecks}/>
        );
    };

    getEditPage = () => {
        return (
            <ViewDeckPage
                deckId={this.deckId}
                isEditable={true}
                onBack={this.showMyDecks}
            />
        );
    };

    getViewPage = () => {
        return (
            <ViewDeckPage
                deckId={this.deckId}
                isEditable={false}
                onBack={this.showStandardDecks}
            />
        );
    };

    play = deckId => {
        this.deckId = deckId;
        this.props.setPageName(PageNames.GAME);
    };

    edit = deckId => {
        this.deckId = deckId;
        this.props.setPageName(PageNames.EDIT);
    };

    create = () => {
        this.props.setPageName(PageNames.CREATE);
    };

    showStandardDecks = () => {
        this.props.setPageName(PageNames.STANDARD_DECKS);
    };

    view = deckId => {
        this.deckId = deckId;
        this.props.setPageName(PageNames.VIEW);
    };

    add = deckId => {
        myDecks.push(standardDecks.find(deck => deck.id === deckId)); // TEMP
        this.props.setPageName(PageNames.MY_DECKS);
    };

    showMyDecks = () => {
        this.props.setPageName(PageNames.MY_DECKS);
    }
}