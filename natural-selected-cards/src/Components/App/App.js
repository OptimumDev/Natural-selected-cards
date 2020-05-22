import React from 'react';
import './App.css';

import AppHeader from "../AppHeader/AppHeader";
import Page from "../Pages/Page/Page";

import {setErrorHandler, setStandardHandler} from "../../Utils/fetchHelper";
import * as localStorageHelper from "../../Utils/localStorageHelper";
import * as PageNames from "../../Constants/PageNames";
import * as LocalStorageKeys from "../../Constants/LocalStorageKeys";

export default class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            pageName: PageNames.MY_DECKS,
            isAuthorized: true,
            isDarkTheme: localStorageHelper.getOrDefault(LocalStorageKeys.IS_DARK_THEME_KEY, false),
            isError: false
        };
    }

    componentDidMount() {
        setStandardHandler(401, this.logOut);
        setErrorHandler(this.handleError)
    }

    render() {
        const {isDarkTheme, isAuthorized} = this.state;
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
                    pageName={this.getPageName()}
                    setPageName={this.setPageName}
                    authorize={this.authorize}
                    isDarkTheme={isDarkTheme}
                />
            </div>
        );
    }

    getPageName = () => {
        const {pageName, isAuthorized, isError} = this.state;
        if (isError)
            return PageNames.ERROR;
        if (!isAuthorized)
            return PageNames.MAIN;
        return pageName;
    };

    setPageName = pageName => this.setState({
        pageName,
        isError: false
    });

    toggleDarkTheme = () => {
        const isDarkTheme = !this.state.isDarkTheme;

        this.setState({isDarkTheme});
        localStorageHelper.setValue(LocalStorageKeys.IS_DARK_THEME_KEY, isDarkTheme);
    };

    logOut = () => this.setState({isAuthorized: false});

    authorize = () => this.setState({isAuthorized: true});

    handleError = () => this.setState({isError: true});
}
