import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addApointment, getAllEvents, deleteEvent } from '../actions';
import { Button, Modal, Icon } from 'semantic-ui-react';
import CreateAppointmentComponent from '../appointment-create/component';
import EventItemList from './itemList';
import { isNullOrUndefined } from 'util';

class AppointmentList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showCreateDialog: false,
            createEventLoading: false};
        this.handleAddButtonClick = this
            .handleAddButtonClick
            .bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onSubscribe = this.onSubscribe.bind(this);
        this.onUnscribe = this.onUnscribe.bind(this);
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
                        onDelete={ this.onDelete }
                        onSubscribe= { this.onSubscribe }
                        onUnscribe= { this.onUnscribe }
                    />
                    { this.renderDeleteModal() }
                </div>
            )

        } else {
            return null;
        }
    }

    onDelete(id) {
        this.setState({ showDialog:true });
        console.log('Delete',id);
    }

    onSubscribe(id) {
        console.log('Subscribe',id);
    }

    onUnscribe(id) {
        console.log('Unscribe', id);
    }

    renderDeleteModal() {
        return (
            <Modal
                closeOnDimmerClick={false}
                closeOnDocumentClick={false}
                size='mini'
                open={this.state.showDialog}>
                <Modal.Header>
                    Confirm Delete
                </Modal.Header>
                <Modal.Actions>
                    <Button positive icon>
                        <Icon name='checkmark'/>
                    </Button>
                    <Button negative icon onClick={ () => { this.setState({ showDialog:false })}}>
                        <Icon name='cancel'/>
                    </Button>
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

export default connect(mapStateToProps, { addApointment, getAllEvents, deleteEvent })(AppointmentList);