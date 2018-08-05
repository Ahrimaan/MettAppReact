import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addApointment , getAllEvents} from '../actions';
import { Button } from 'semantic-ui-react';
import CreateAppointmentComponent from '../appointment-create/component';
import EventItemList from './itemList';
import { isNullOrUndefined } from 'util';

class AppointmentList extends Component {
    constructor(props) {
        super(props);
        this.state = { showCreateDialog: false, createEventLoading: false };
        this.handleAddButtonClick = this
            .handleAddButtonClick
            .bind(this);
        //TODO: Get all Evens here
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.tenant.selectedTenant) {
            if(!nextProps.appointment.loading && isNullOrUndefined(nextProps.appointment.events)) {
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
                    <EventItemList items={ this.props.appointment.events } />
                    
                </div>
            )

        } else {
            return null;
        }
    }

    handleAddButtonClick() {
        this.setState({ showCreateDialog: true });
    }

    onEventCreate = (model) => {
        this.setState({ createEventLoading: true });
        this.props.addApointment(model,this.props.tenant.selectedTenant).then(result => {
            this.setState({ createEventLoading: false, showCreateDialog:false });

        }).catch(err => {
            console.log(err);
        });
    }
}

function mapStateToProps(props) {
    return { app: props.app, tenant: props.tenant, appointment: props.appointment };
}

export default connect(mapStateToProps, { addApointment, getAllEvents })(AppointmentList);