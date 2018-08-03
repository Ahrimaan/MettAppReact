import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addApointment } from '../actions';
import { Button } from 'semantic-ui-react';
import CreateAppointmentComponent from '../appointment-create/component';

class AppointmentList extends Component {
    constructor(props) {
        super(props);
        this.state = { showCreateDialog: false, createEventLoading: false };
        this.handleAddButtonClick = this
            .handleAddButtonClick
            .bind(this);
        //TODO: Get all Evens here
    }

    render() {
        if (this.props.app.user) {
            return (
                <div>
                    {this.props.app.user.isAdmin && (
                        <Button primary circular
                            icon='add' floated='left'
                            onClick={this.handleAddButtonClick}></Button>
                    )}
                    <CreateAppointmentComponent
                        show={this.state.showCreateDialog}
                        onItemCreate={this.onEventCreate}
                        loading={this.state.createEventLoading} />
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
        this.props.addApointment(model).then(result => {
            this.setState({ createEventLoading: false });
        }).catch(err => {
            console.log(err);
        });
    }
}

function mapStateToProps(props) {
    return { app: props.app };
}

export default connect(mapStateToProps, { addApointment })(AppointmentList);