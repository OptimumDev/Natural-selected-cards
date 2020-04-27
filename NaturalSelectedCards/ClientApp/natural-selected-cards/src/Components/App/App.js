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
                    isMine={true}
                    onPlay={this.play}
                    onEdit={this.edit}
                    onCreate={this.create}
                    onChooseStandard={() => this.setPageName(PageNames.STANDARD_DECKS)} />;
            case PageNames.STANDARD_DECKS:
                return <DecksPage isMine={false} onPlay={this.play} onEdit={this.edit} />;
            case PageNames.GAME:
                return <GamePage deckId={this.state.deckId} onEnd={() => this.setPageName(PageNames.MAIN)}/>;
            case PageNames.CREATE:
                //TODO: Edit-like page, but only 1 card at the start (chosen)
                return <CreatePage />;
            case PageNames.EDIT:
                //TODO: all cards miniatures at the top with scrolling and possibility to choose, chosen as in game
                return <EditPage deckId={this.state.deckId} />;
            default:
                console.log(`Can't load page with name "${this.state.pageName}"`)
        }
    }
}