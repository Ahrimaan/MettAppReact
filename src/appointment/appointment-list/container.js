import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addApointment, getAllEvents, deleteEvent, joinAppointment, leaveAppointment } from '../actions';
import { Button, Modal, Icon } from 'semantic-ui-react';
import CreateAppointmentComponent from '../appointment-create/component';
import EventItemList from './itemList';
import { isNullOrUndefined } from 'util';

class AppointmentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCreateDialog: false,
            createEventLoading: false,
            showDeleteDialog: false,
            showSubscribe: false,
            showUnscribe:false
        };
        this.handleAddButtonClick = this
            .handleAddButtonClick
            .bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onUnscribe = this.onUnscribe.bind(this);
        this.openSubscribeDialog = this.openSubscribeDialog.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tenant.selectedTenant) {
            if (!nextProps.appointment.loading && isNullOrUndefined(nextProps.appointment.events)) {
                this.props.getAllEvents(nextProps.tenant.selectedTenant);
            }
        }
    }

    render() {
        if (this.props.app.user) {
            return (
                <div>
                    {this.props.app.user.isAdmin && (
                        <Button primary circular
                            icon='add' floated='right'
                            onClick={this.handleAddButtonClick}></Button>
                    )}
                    <CreateAppointmentComponent
                        show={this.state.showCreateDialog}
                        onItemCreate={this.onEventCreate}
                        loading={this.state.createEventLoading} />
                    <EventItemList
                        items={this.props.appointment.events}
                        userid={this.props.app.user.id}
                        isAdmin={this.props.app.user.isAdmin}
                        onDelete={this.onDelete}
                        onUnscribe={this.onUnscribe}
                        onSubscribe={(id,data) => this.props.joinAppointment(id,data) }
                    />
                    {this.renderDeleteModal()}
                    {this.renderUnscribeModal()}
                </div>
            )

        } else {
            return null;
        }
    }

    onDelete(id) {
        this.setState({ showDeleteDialog: true, selectedEventId: id });
    }

    onUnscribe(id) {
        this.props.leaveAppointment(id);
    }

    openSubscribeDialog = (id) => {
        this.setState({ showSubscribe: true, selectedEventId: id});
    }

    renderDeleteModal() {
        return (
            <Modal
                closeOnDimmerClick={false}
                closeOnDocumentClick={false}
                size='mini'
                open={this.state.showDeleteDialog}>
                <Modal.Header>
                    Confirm Delete
                </Modal.Header>
                <Modal.Actions>
                    <Button.Group>
                        <Button positive icon onClick={() => {
                            this.props.deleteEvent(this.state.selectedEventId).then(res => {
                                this.setState({ showDeleteDialog: false, selectedEventId: null });
                            });
                        }}>
                            <Icon name='checkmark' />
                        </Button>
                        <Button.Or />
                        <Button negative icon onClick={() => { this.setState({ showDeleteDialog: false }) }}>
                            <Icon name='cancel' />
                        </Button>
                    </Button.Group>
                </Modal.Actions>
            </Modal>
        );
    }

    renderUnscribeModal() {
        return (
            <Modal
                closeOnDimmerClick={false}
                closeOnDocumentClick={false}
                size='mini'
                open={this.state.showUnscribe}>
                <Modal.Header>
                    Really want to unscribe ?
                </Modal.Header>
                <Modal.Actions>
                    <Button.Group>
                        <Button positive icon>
                            <Icon name='checkmark' />
                        </Button>
                        <Button.Or />
                        <Button negative icon onClick={() => { this.setState({ showDialog: false }) }}>
                            <Icon name='cancel' />
                        </Button>
                    </Button.Group>
                </Modal.Actions>
            </Modal>
        );
    }

    handleAddButtonClick() {
        this.setState({ showCreateDialog: true });
    }

    onEventCreate = (model) => {
        this.setState({ createEventLoading: true });
        this.props.addApointment(model, this.props.tenant.selectedTenant).then(result => {
            this.setState({ createEventLoading: false, showCreateDialog: false });
        }).catch(err => {
            console.log(err);
        });
    }
}

function mapStateToProps(props) {
    return { app: props.app, tenant: props.tenant, appointment: props.appointment };
}

export default connect(mapStateToProps, { addApointment, getAllEvents, deleteEvent,joinAppointment, leaveAppointment })(AppointmentList);