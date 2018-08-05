import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Modal, Input, Label} from 'semantic-ui-react'
import {updatePaypalLinkAndUserdata} from './action';
import { withRouter  } from 'react-router-dom'
import _ from 'lodash'

class AdminComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: true,
            loading:false,
            link: '',
            linkPrefix: 'https://paypal.me/'
        };
    }

    componentDidMount() {
        if(this.props.app.user) {
            this.setState({link: this.getPaypalLink(this.props.app.user.paypalLink)})
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.app.user.paypalLink && !nextProps.admin.loading) {
            this.setState({link: this.getPaypalLink(nextProps.app.user.paypalLink)})
        }
        this.setState({loading: nextProps.admin.loading})
    }

    getPaypalLink(propLink) {
        if(propLink) {
            return _.last(_.split(propLink,'/'));
        }
        return null;
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
            .updatePaypalLinkAndUserdata(this.state.linkPrefix + this.state.link);
    }

    closeDialog = () => {
        this.setState({ show:false})
        this.props.history.push('/home');
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
                    <Input value={this.state.link} label={this.state.linkPrefix}
                           onChange={this.handleChange.bind(this)} type='text' placeholder='Your Link'/>
                </Modal.Content>
                <Modal.Actions>
                    <Button loading={this.state.loading} 
                            onClick={this.closeDialog = this.closeDialog.bind(this)}
                            negative icon='cancel'
                            labelPosition='left'
                            content='Cancel' />
                    <Button loading={this.state.loading} //change this to global loader if developed
                            disabled={!this.state.link} positive icon='checkmark' labelPosition='right' content='Save'
                            onClick={this.handleSave = this
                                .handleSave
                                .bind(this)}/>
                </Modal.Actions>
            </Modal>
        );
    }
}

function mapStateToProps(props) {
    return {app: props.app, admin: props.admin}
}

export default withRouter(connect(mapStateToProps, {updatePaypalLinkAndUserdata})(AdminComponent));