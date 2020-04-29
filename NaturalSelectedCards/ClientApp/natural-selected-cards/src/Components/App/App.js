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

const user = {id: 123, name: 'Артемий', surname: 'Изаков'};

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pageName: PageNames.MAIN
        }
    }

    render() {
        //TODO: maybe add dark theme
        return (
            <div className="app light">
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

    view = deckId => {
        this.setDeckId(deckId);
        this.setPageName(PageNames.VIEW);
    };

    add = deckId => {
        this.setPageName(PageNames.MY_DECKS);
    };

    getPage = () => {
        switch (this.state.pageName) {
            case PageNames.MAIN:
                return <MainPage
                    onMyDecks={() => this.setPageName(PageNames.MY_DECKS)}
                    onStandardDecks={() => this.setPageName(PageNames.STANDARD_DECKS)}
                />;
            case PageNames.MY_DECKS:
                //TODO: Make main page
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
                return <GamePage deckId={this.state.deckId} onEnd={() => this.setPageName(PageNames.MAIN)}/>;
            case PageNames.CREATE:
                //TODO: Edit-like page, but only 1 card at the start (chosen)
                return <CreatePage/>;
            case PageNames.EDIT:
                return <ViewDeckPage deckId={this.state.deckId} isEditable={true}/>;
            case PageNames.VIEW:
                return <ViewDeckPage deckId={this.state.deckId} isEditable={false}/>;
            default:
                console.log(`Can't load page with name "${this.state.pageName}"`)
        }
    }
}