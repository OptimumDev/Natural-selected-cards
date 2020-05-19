import React from "react";
import ViewDeckPage from "../ViewDeckPage/ViewDeckPage";
import * as server from "../../../Utils/server"

export default class CreatePage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            deckId: ''
        }
    }

    async componentDidMount() {
        const response = await server.createDeck();
        if (response.ok) {
            const deckId = await response.json();
            this.setState({deckId});
        }
    }

    render() {
        let {onBack} = this.props;
        return (
            <ViewDeckPage
                deckId={this.state.deckId}
                isEditable={true}
                onBack={onBack}
                deckName=''
            />
        );
    }
}
