import React from 'react';
import './App.css';
import * as PageNames from "../Pages/PageNames";
import AppName from "../AppName/AppName";
import User from "../User/User";
import MainPage from "../Pages/MainPage/MainPage";
import DecksPage from "../Pages/DecksPage/DecksPage";
import GamePage from "../Pages/GamePage/GamePage";
import CreatePage from "../Pages/CreatePage/CreatePage";
import ViewDeckPage from "../Pages/ViewDeckPage/ViewDeckPage";
import {myDecks, standardDecks} from "../../deckExamples";

const user = {id: 123, name: 'Артемий', surname: 'Изаков'};

export default class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            pageName: this.getMainPage(),
            isDarkTheme: false
        };
    }

    render() {
        return (
            <div className={`app ${this.state.isDarkTheme ? 'dark' : 'light'}`}>
                <header className='shadow main-color'>
                    <AppName onClick={this.goToMain}/>
                    <User user={this.state.user}/>
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

    create = () => {
        this.setPageName(PageNames.CREATE);
    };

    edit = deckId => {
        this.setDeckId(deckId);
        this.setPageName(PageNames.EDIT);
    };

    view = deckId => {
        this.setDeckId(deckId);
        this.setPageName(PageNames.VIEW);
    };

    add = deckId => {
        myDecks.push(standardDecks.find(deck => deck.id === deckId));
        this.setPageName(PageNames.MY_DECKS);
    };

    goToMain = () => this.setPageName(this.getMainPage());

    getMainPage = () => this.state && this.state.user ? PageNames.MY_DECKS : PageNames.MAIN;

    logIn = () => this.setState({
        pageName: PageNames.MY_DECKS,
        user: user
    });

    getPage = () => {
        switch (this.state.pageName) {
            case PageNames.MAIN:
                return <MainPage onLogin={this.logIn} />;
            case PageNames.MY_DECKS:
                return <DecksPage
                    isUsers={true}
                    onPlay={this.play}
                    onView={this.edit}
                    onCreate={this.create}
                    onChooseStandard={() => this.setPageName(PageNames.STANDARD_DECKS)}
                    key={PageNames.MY_DECKS}/>;
            case PageNames.STANDARD_DECKS:
                return <DecksPage
                    isUsers={false}
                    onView={this.view}
                    onAdd={this.add}
                    key={PageNames.STANDARD_DECKS}
                />;
            case PageNames.GAME:
                return <GamePage deckId={this.state.deckId} onEnd={this.goToMain}/>;
            case PageNames.CREATE:
                return <CreatePage onBack={this.goToMain}/>;
            case PageNames.EDIT:
                return <ViewDeckPage
                    deckId={this.state.deckId}
                    isEditable={true}
                    onBack={this.goToMain}
                />;
            case PageNames.VIEW:
                return <ViewDeckPage
                    deckId={this.state.deckId}
                    isEditable={false}
                    onBack={() => this.setPageName(PageNames.STANDARD_DECKS)}
                />;
            default:
                console.log(`Can't load page with name "${this.state.pageName}"`)
        }
    }
}