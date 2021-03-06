import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loader, Dimmer } from 'semantic-ui-react';

class LoaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {loading:false};
    }
    
    componentWillReceiveProps(nextprops) {
        if(nextprops.app){
            this.setState({loading: nextprops.app.loading})
        }       
        else {
            tnis.setState({loading:false});
        } 
    }

    render() {
        return (
            <Dimmer active={ this.state.loading }>
                <Loader active={this.state.loading} size={'huge'} />
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