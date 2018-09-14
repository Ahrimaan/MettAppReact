import React from 'react';
import { Modal, Button, Icon, Form, Dropdown } from 'semantic-ui-react';
import moment from 'moment';
moment.locale('de');

class AppointmentDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
        this.resetState = this.resetState.bind(this);
    }

    options = [
        { key: 1, text: '1', value: 1 },
        { key: 2, text: '2', value: 2 },
        { key: 3, text: '3', value: 3 },
        { key: 4, text: '4', value: 4 },
        { key: 5, text: '5', value: 5 },
    ]

    resetState() {
        this.setState({ data: {} });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.show) {
            this.setState({data:{}});
        }
    }

    render() {
        const { id, date, paypalLink, show, onSaveClick, onCancel,hasPaypal } = this.props;
        if (show) {
            return (
                <Modal
                    closeOnDimmerClick={false}
                    closeOnDocumentClick={false}
                    size='mini'
                    open={show}>
                    <Modal.Header>
                        Subscribe to Event at {date}
                    </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Value</label>
                                <Dropdown placeholder='Value'
                                    selection options={this.options}
                                    onChange={(event,value) =>  
                                        this.setState(
                                        { data: { value: value.value} }) } />
                            </Form.Field>
                            <Form.Field>
                                {(this.state.data.value && hasPaypal) &&
                                    <Button onClick={
                                            () => window.open(paypalLink + '/' + this.state.data.value , '_blank')}>
                                        <Icon name='euro' />
                                        PayPal
                                    </Button>
                                }
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button.Group>
                            <Button positive icon onClick={() => {
                                onSaveClick(id,this.state.data);
                            }}>
                                <Icon name='checkmark' />
                            </Button>
                            <Button.Or />
                            <Button negative icon onClick={() => onCancel()}>
                                <Icon name='cancel' />
                            </Button>
                        </Button.Group>
                    </Modal.Actions>
                </Modal>
            );
        }
        if (!show) {
            return null;
        }
    }
}

export default AppointmentDetail;