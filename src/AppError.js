import React, {Component} from 'react';

class AppError extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <h2>The app has encountered an Error. Please restart.</h2>
            );
        }
        return this.props.children;
    }
}

export default AppError;