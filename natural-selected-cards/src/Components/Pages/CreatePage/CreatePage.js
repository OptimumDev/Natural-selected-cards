import React from "react";

import ViewDeckPage from "../ViewDeckPage/ViewDeckPage";
import Loading from "../../Loading/Loading";

import * as server from "../../../Utils/server"

export default class CreatePage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoading: true
        }
    }

    async componentDidMount() {
        const deckId = await server.createDeck();
        this.setState({
            deckId,
            isLoading: false
        });
    }

    render() {
        let {onBack} = this.props;
        return this.state.isLoading
            ? <Loading/>
            : (
                <ViewDeckPage
                    deckId={this.state.deckId}
                    isEditable={true}
                    onBack={onBack}
                    deckName=''
                />
            );
    }
}
