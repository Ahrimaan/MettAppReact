import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';

class ErrorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false };
    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.app) {
            if(nextprops.app.error) {
                this.setState({ error :  nextprops.app.error})
            }
            else {
                this.setState({ error :  null})
            }    
        }
    }

    render() {
        if(this.state.error) {
            return (
                <Message negative>
                    <Message.Header>Error</Message.Header>
                    <p>{this.state.error}</p>
                </Message>
            );
        } else {
            return null;
        }

    }

}

function mapStateToProps(props) {
    return {
        app: props.app
    }
}

export default connect(mapStateToProps)(ErrorComponent);