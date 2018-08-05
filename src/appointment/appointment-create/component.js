import React, { Component } from 'react';
import { Button, Modal, Form, Checkbox,Da } from 'semantic-ui-react'
import moment from 'moment';
import DatetimePicker from 'react-semantic-datetime';
moment.locale('de');

export default class AppointmentCreateComponent extends Component {
    constructor(props) {
        super();
        this.createItem = this.createItem.bind(this);
        this.cancel = this.cancel.bind(this);
        this.toggleChecked = this.toggleChecked.bind(this);
        this.state = { 
            show:  props.show,
            date: moment.now(),
            allowPaypal: false
        };
    }

    componentWillReceiveProps(nextprops) {
        this.setState({show : nextprops.show})
    }

    render() {
        return (
            <Modal
                closeOnDimmerClick={false}
                closeOnDocumentClick={false}
                size='mini'
                open={this.state.show}>
                <Modal.Header>
                    Create Event
                </Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <DatetimePicker
                                color="teal" // optional (default:teal)
                                onChange={(value)=>{this.setState({date:value})}} // Mandatory
                                value={moment(this.state.date)} // Mandatory
                                time={false}// optional to show time selection, just a date picket if false (default:true)
                                disabled={this.props.loading}
                                />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox label='Allow Paypal ?' onChange={this.toggleChecked} checked={this.state.allowPaypal} />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        loading={this.props.loading} //change this to global loader if developed
                        negative
                        icon='cancel'
                        labelPosition='left'
                        content='Cancel'
                        onClick={this.cancel}
                    />
                    <Button
                        loading={this.props.loading} //change this to global loader if developed
                        positive
                        icon='checkmark'
                        labelPosition='right'
                        content='Save'
                        onClick={this.createItem}
                    />
                </Modal.Actions>
            </Modal>
        );
    }

    toggleChecked() {
        this.setState({ allowPaypal : !this.state.allowPaypal });
    }

    cancel() {
        this.setState({ show: false });
    }

    createItem() {
        this.props.onItemCreate({date: new Date(this.state.date), allowPaypal: this.state.allowPaypal});
    }
}