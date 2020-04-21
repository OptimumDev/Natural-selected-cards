import React from 'react';
import './App.css';
import * as PageNames from "../Pages/PageNames";
import AppName from "../AppName/AppName";
import User from "../User/User";
import MainPage from "../Pages/MainPage/MainPage";
import DecksPage from "../Pages/DecksPage/DecksPage";
import GamePage from "../Pages/GamePage/GamePage";
import CreatePage from "../Pages/CreatePage/CreatePage";
import EditPage from "../Pages/EditPage/EditPage";

const user = {id: 123, name: 'Артемий', surname: 'Изаков'};

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
                <header className='shadow main-color'>
                    <AppName onClick={() => this.setPageName(PageNames.MAIN)}/>
                    <User user={user}/>
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

    getPage = () => {
        switch (this.state.pageName) {
            case PageNames.MAIN:
                return <MainPage
                    onMyDecks={() => this.setPageName(PageNames.MY_DECKS)}
                    onStandardDecks={() => this.setPageName(PageNames.STANDARD_DECKS)}
                />;
            case PageNames.MY_DECKS:
                return <DecksPage isMine={true} onPlay={this.play} onEdit={this.edit} onCreate={this.create} />;
            case PageNames.STANDARD_DECKS:
                return <DecksPage isMine={false} onPlay={this.play} onEdit={this.edit} />;
            case PageNames.GAME:
                return <GamePage deckId={this.state.deckId} onEnd={() => this.setPageName(PageNames.MAIN)}/>;
            case PageNames.CREATE:
                return <CreatePage />;
            case PageNames.EDIT:
                return <EditPage deckId={this.state.deckId} />
            default:
                console.log(`Can't load page with name "${this.state.pageName}"`)
        }
    }
}