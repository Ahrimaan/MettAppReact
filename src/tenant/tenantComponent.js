import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getTentants } from './tenantService';
import { Button, Modal } from 'semantic-ui-react'
import _ from 'lodash';

class TenantComponent extends Component {
    state = { open: false }

    componentWillMount() {
        if(this.props.appState.showDialog){
            getTentants().then(result => {
                let tentants = result.data;
                this.setState({
                    tenants: tentants,
                    open: false,
                    item: _.first(tentants)
                })
            })
        }     

    }

    handleChange(event) {
        this.setState({item: event.target.value});
    };

    handleClose(event) {
        // Save the Tenant Change the Route
    }

    handleOpen() {
        this.setState({open: true})
    }

    render() {
        return this.renderModal();

    }

    renderModal() {
        const { showDialog } = this.props.appState;

        return (
            <Modal size='mini' open={showDialog} onClose={this.handleClose}>
                <Modal.Header>
                    Delete Your Account
                </Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to delete your account</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative>
                        No
                    </Button>
                    <Button positive icon='checkmark' labelPosition='right' content='Yes'/>
                </Modal.Actions>
            </Modal>
        );
    }
}

function mapStateToProps(props){
    return {
        appState: props.appState
    }
}

export default connect(mapStateToProps)(TenantComponent);