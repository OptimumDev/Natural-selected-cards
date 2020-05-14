import React from 'react';
import './App.css';

import AppHeader from "../AppHeader/AppHeader";
import Page from "../Pages/Page/Page";

import {setStandardHandler} from "../../Utils/fetchHelper";
import * as localStorageHelper from "../../Utils/localStorageHelper";
import * as PageNames from "../../Constants/PageNames";
import * as LocalStorageKeys from "../../Constants/LocalStorageKeys";

export default class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            pageName: PageNames.MY_DECKS,
            isAuthorized: true,
            isDarkTheme: localStorageHelper.getOrDefault(LocalStorageKeys.IS_DARK_THEME_KEY, false)
        };
    }

    componentDidMount() {
        setStandardHandler(401, this.logOut);
    }

    render() {
        const {pageName, isDarkTheme, isAuthorized} = this.state;
        return (
            <div className={`app ${isDarkTheme ? 'dark' : 'light'}`}>
                <AppHeader
                    isDarkTheme={isDarkTheme}
                    isAuthorized={isAuthorized}
                    onLogout={this.logOut}
                    setPageName={this.setPageName}
                    toggleDarkTheme={this.toggleDarkTheme}
                />
                <Page
                    pageName={isAuthorized ? pageName : PageNames.MAIN}
                    setPageName={this.setPageName}
                    authorize={this.authorize}
                    isDarkTheme={isDarkTheme}
                />
            </div>
        );
    }

    setPageName = pageName => this.setState({pageName});

    toggleDarkTheme = () => {
        const isDarkTheme = !this.state.isDarkTheme;

        this.setState({isDarkTheme});
        localStorageHelper.setValue(LocalStorageKeys.IS_DARK_THEME_KEY, JSON.stringify(isDarkTheme));
    };

    logOut = () => this.setState({isAuthorized: false});

    authorize = () => this.setState({isAuthorized: true});
}