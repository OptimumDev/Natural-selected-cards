import React from "react";
import './Input.css';

export default class Input extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.ref = React.createRef();
    }

    render() {
        const {onBlur, className, children} = this.props;

        return (
            <input
                type='text'
                className={className}
                defaultValue={children}
                onBlur={e => onBlur(e.target.value)}
                ref={this.ref}
                onKeyPress={this.enterHandler}
            />
        );
    }

    enterHandler = e => {
        if (e.key === "Enter")
            this.ref.current.blur();
    };
}
