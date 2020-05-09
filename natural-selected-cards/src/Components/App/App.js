import React from 'react';
import './App.css';

import AppHeader from "../AppHeader/AppHeader";
import Page from "../Pages/Page/Page";

import * as LocalStorageHelper from "../../Utils/LocalStorageHelper"
import * as PageNames from "../../Constants/PageNames";
import * as LocalStorageKeys from "../../Constants/LocalStorageKeys"

export default class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            pageName: PageNames.MY_DECKS,
            isDarkTheme: LocalStorageHelper.getOrDefault(LocalStorageKeys.IS_DARK_THEME_KEY, false)
        };
    }

    render() {
        const {pageName, isDarkTheme, user} = this.state;
        return (
            <div className={`app ${isDarkTheme ? 'dark' : 'light'}`}>
                <AppHeader
                    isDarkTheme={isDarkTheme}
                    user={user}
                    onLogout={this.logOut}
                    setPageName={this.setPageName}
                    toggleDarkTheme={this.toggleDarkTheme}
                />
                <Page
                    pageName={user ? pageName : PageNames.MAIN}
                    setPageName={this.setPageName}
                    setUser={this.setUser}
                    isDarkTheme={isDarkTheme}
                />
            </div>
        );
    }

    setPageName = pageName => this.setState({pageName});

    setUser = user => this.setState({user});

    toggleDarkTheme = () => {
        const isDarkTheme = !this.state.isDarkTheme;

        this.setState({isDarkTheme});
        LocalStorageHelper.setValue(LocalStorageKeys.IS_DARK_THEME_KEY, JSON.stringify(isDarkTheme));
    };

    logOut = () => this.setUser(null);
}