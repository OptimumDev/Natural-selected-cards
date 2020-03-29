import React, {createContext, useState} from 'react';
import './App.css';
import * as PageNames from "../Pages/PageNames";
import AppName from "../AppName/AppName";
import User from "../User/User";
import MainPage from "../Pages/MainPage/MainPage";
import DecksPage from "../Pages/DecksPage/DecksPage";
import GamePage from "../Pages/GamePage/GamePage";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pageName: PageNames.MAIN
        }
    }

    render() {
        return (
            <div className="app">
                <header>
                    <AppName onClick={() => this.setPageName(PageNames.MAIN)}/>
                    <User userId={123}/>
                </header>
                {this.getPage()}
            </div>
        );
    }

    setPageName = name => this.setState({pageName: name});
    setDeckId = id => this.setState({deckId: id});

    play = deckId => {
        this.setDeckId(deckId);
        this.setPageName(PageNames.GAME);
    };

    getPage = () => {
        switch (this.state.pageName) {
            case PageNames.MAIN:
                return <MainPage
                    onMyDecks={() => this.setPageName(PageNames.MY_DECKS)}
                    onStandardDecks={() => this.setPageName(PageNames.STANDARD_DECKS)}
                />;
            case PageNames.MY_DECKS:
                return <DecksPage isMine={true} onPlay={this.play} />;
            case PageNames.STANDARD_DECKS:
                return <DecksPage isMine={false} onPlay={this.play} />;
            case PageNames.GAME:
                return <GamePage deckId={this.state.deckId}/>;
            default:
                console.log(`Can't load page with name "${this.state.pageName}"`)
        }
    }
}