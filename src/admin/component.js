import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Modal, Dropdown, Input, Label} from 'semantic-ui-react'
import { updatePaypalLink} from './action';
import _ from 'lodash';

class AdminComponent extends Component {
    state = {
        show: true,
        link: '',
        linkPrefix:'https://paypal.me/'
    };

    componentWillReceiveProps(nextProps){
        this.setState({link: nextProps.app.user.paypalLink})
    }

    handleChange(event, {value}) {
        this.setState({link: value});
    };

    render() {
        return this.renderModal();
    }

    handleSave() {
        this
            .props
            .updateLink(this.state.linkPrefix + this.state.link);
    }

    renderModal() {
        return (
            <Modal
                closeOnDimmerClick={false}
                closeOnDocumentClick={false}
                size='mini'
                open={this.state.show}>
                <Modal.Header>
                    Zuordnung wählen
                </Modal.Header>
                <Modal.Content>
                    <Input value={ this.state.link } label={ this.state.linkPrefix } 
                    onChange= { this.handleChange.bind(this) } type='text' placeholder='Your Link' />
                </Modal.Content>
                <Modal.Actions>
                    <Button loading={false} //change this to global loader if developed
                        disabled={!this.state.link} positive icon='checkmark' labelPosition='right' content='Save' onClick={this.handleSave = this
                        .handleSave
                        .bind(this)}/>
                </Modal.Actions>
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateLink: link => {
            dispatch(updatePaypalLink(link))
        }
    }
}

function mapStateToProps(props) {
    return {app: props.app, admin: props.admin }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminComponent);