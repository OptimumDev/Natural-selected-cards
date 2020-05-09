import React from "react";
import './User.css'

import IconButton from "../IconButton/IconButton";

import * as server from "../../Utils/server";

import userIcon from '../../images/account_circle-white-48dp.svg'
import exitIcon from '../../images/exit_to_app-white-48dp.svg'
import exitIconDark from '../../images/exit_to_app-black-48dp.svg'

export default class User extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    async componentDidMount() {
        const response = await server.getUserInfo();

        if (response.ok) {
            const user = await response.json();
            this.setState({user});
        } else if (response.status === 401) {
            this.props.onLogout();
        } else {
            console.log(`${response.status} ${response.statusText}`);
        }
    }

    render() {
        const {isDarkTheme} = this.props;
        const {user} = this.state;

        return user
            ? (
                <div className='user'>
                    <img
                        src={user.photoUrl || userIcon}
                        alt='👤'
                        className='user-image main-color-dark'
                        draggable={false}
                    />
                    <span className='user-name'>{user.firstName} {user.lastName}</span>
                    <IconButton
                        className='exit-button'
                        onClick={this.logout}
                        icon={isDarkTheme ? exitIcon : exitIconDark}
                        alt='🚪'
                        size='3.5vw'
                    />
                </div>
            )
            : null;
    }

    logout = async () => {
        const response = await server.logoutUser();
        if (response.ok || response.status === 401) {
            this.props.onLogout();
        } else {
            console.log(`${response.status} ${response.statusText}`);
        }
    }
}