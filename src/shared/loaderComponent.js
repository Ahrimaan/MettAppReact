import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loader, Dimmer } from 'semantic-ui-react';

class LoaderComponent extends Component {
    render() {
        return (
            <Dimmer active={ this.props.app.loading }>
                <Loader active={this.props.app.loading} size={'huge'} />
            </Dimmer>
        );
    }

}

function mapStateToProps(props){
    return {
        app: props.app
    }
}

export default connect(mapStateToProps)(LoaderComponent);